import { cloneDeep, sortBy, endsWith } from "lodash";
import fecha from 'fecha';
export default class Helper {
  static eventHandles = {};
  static addEventListener(eName, fn) {
    Helper.eventHandles[eName] = Helper.eventHandles[eName] || [];
    Helper.eventHandles[eName].push(fn);
  }
  static removeEventListener(eName, handler = null) {
    if (handler === null) {
      delete Helper.eventHandles[eName];
      return;
    }
    let currentEvent = Helper.eventHandles[eName];
    let len = 0;
    if (currentEvent) {
      len = currentEvent.length;
      for (let i = len - 1; i >= 0; i--) {
        if (currentEvent[i] === handler) {
          currentEvent.splice(i, 1);
        }
      }
    }
  }
  static dispatchEvent(eName, data = {}) {
    if (Helper.eventHandles[eName]) {
      for (var i = 0; i < Helper.eventHandles[eName].length; i++) {
        Helper.eventHandles[eName][i](data);
      }
    }
  }
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  static parseFormData(data, temp = {}) {
    let re = cloneDeep(data);
    for (const key in re) {
      if (re.hasOwnProperty(key)) {
        if (Array.isArray(re[key])) {
          re[key] = re[key].join(",");
        } else if (temp.IS_TIME && temp.IS_TIME.includes(key)) {
          re[key] = re[key] ? (Number(re[key]) / 1000) : '';
        } else if (re[key] === null) {
          re[key] = "";
        }
      }
    }
    re.IS_TIME && delete re.IS_TIME;
    re.FROM_DIC && delete re.FROM_DIC;
    return re;
  }
  static parseFetchData(data, temp = {}) {
    let re = cloneDeep(data);
    for (const key in re) {
      if (re.hasOwnProperty(key)) {
        if (typeof temp[key] === "string") {
          re[key] = re[key] ? String(re[key]) : '';
        }
        // 所有字段转为string
        if (typeof re[key] === "number") {
          re[key] = String(re[key]);
        }
        if (typeof re[key] === "string" && Array.isArray(temp[key])) {
          re[key] = re[key].split(",");
        }
        if (re[key] === null && Array.isArray(temp[key])) {
          re[key] = [];
        }
        if (re[key] && temp.IS_TIME && temp.IS_TIME.includes(key)) {
          re[key] = Number(re[key]) * 1000;
        }
      }
    }
    console.log('parseFetchData', re)
    return re;
  }

  static parseDicData(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        object[key].forEach(item => {
          item.key = String(item.key);
          item.value = String(item.value);
        });
      }
    }
    return object;
  }

  static parseSearchParams(data){
    let re = data
    if(data && data.daterange){
      re = {
        ...re,
        startTime: data.daterange[0].getTime() / 1000,
        endTime: data.daterange[1].getTime() / 1000,
      }
    }
    if(data && data.daterange2){
      re = {
        ...re,
        startTime2: data.daterange2[0].getTime() / 1000,
        endTime2: data.daterange2[1].getTime() / 1000,
      }
    }
    delete re.daterange
    delete re.daterange2
    return re
  }

  static formatterFromDic(cellValue, dicKey, dic) {
    cellValue = String(cellValue);
    if (cellValue) {
      let arr = cellValue.split(",");
      let re = arr.map(item => {
        let dicItem = dic[dicKey]
          ? dic[dicKey].find(({ key }) => String(key) === item)
          : "";
          return (dicItem ? dicItem.value : item) || '';
        });
      return re.filter(item=>!['undefined', 'null'].includes(item)).join("、");
    }
    return "";
  }

  static getDic(promises) {
    return Promise.all(promises.map(func => func())).then(d => {
      let final = {};
      d.forEach(re => {
        if (re !== "fail") {
          for (const key in re) {
            if (re.hasOwnProperty(key)) {
              re[key] = _.sortBy(re[key], ({ key }) => -key);
            }
          }
          final = Helper.parseDicData({
            ...final,
            ...re,
          });
        }
      });
      final.systemYesOrNo = [
        { value: "是", key: "1" },
        { value: "否", key: "0" },
      ];
      final.systemHaveOrNo = [
        { value: "有", key: "1" },
        { value: "无", key: "0" },
      ];
      if(!final.AgreeEnum){
        final.AgreeEnum = [
          {
            "key": "1",
            "value": "同意"
          },
          {
            "key": "2",
            "value": "拒绝"
          }
        ]
      }
      return final;
    });
  }

  static sort(data) {
    data = data.map(item => {
      if (item.children && item.children.length > 0) {
        item.children = Helper.sort(item.children);
      }
      return item;
    });
    return sortBy(data, item => item.sort);
  }

  static filterRecursion(data, func) {
    data = data.map(item=>{
      if (item.children && item.children.length > 0) {
        item.children = Helper.filterRecursion(item.children, func);
        console.log(item.children)
      }
      return item;
    })
    let re = data.filter(func)
    return re.length === 0 ? null : re;
  }

  static formatterDate(v, format="YYYY-MM-DD"){
    if(!v) return ''
    if(String(v).length === 10) v = Number(v) * 1000
    return fecha.format(v, format)
  }
}
