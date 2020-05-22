import Vue from "vue";
import URLSearchParams from "url-search-params";
import Cookie from "js-cookie";
import Helper from "../libs/Helper";

const showErrMessage = msg => {
  Vue.prototype.$notify.error({
    title: "异常错误",
    message: msg,
  });
};

export function request(api, options = {}) {
  const method = options.method ? options.method.toLowerCase() : "get";
  let needToken = options.token !== undefined ? options.token : true;
  const formData = options.formData !== undefined ? options.formData : false;
  const isJson = !!options.data.IS_JSON;
  const iAmData = options.data.I_AM_DATA;
  options.data = options.data || {};
  let searchParams = isJson
    ? iAmData || options.data
    : makeURLSearchParams(options.data);
  if (options.data.isOnlyId) {
    api += "/" + options.data.id;
  } else {
    if (method === "get") {
      api += "?" + searchParams;
    }
  }
  if (options.data.noToken) {
    needToken = false;
  }
  let accessToken = Cookie.get("token");
  const headers = Object.assign(
    formData
      ? {
          Accept: "application/json",
          // "Content-Type": "multipart/form-data"
        }
      : {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    needToken ? { token: accessToken } : {},
    options.headers ? options.headers : {},
    isJson
      ? {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      : {}
  );
  if (isJson) {
    searchParams = JSON.stringify(searchParams);
  }
  return fetch(api, {
    method,
    body:
      method === "post" ? (formData ? options.data : searchParams) : undefined,
    headers,
  })
    .then(res => {
      return res;
    })
    .then(res => res.json())
    .then(json => {
      // console.log(json)
      // return json
      const { code, data, msg } = json;
      if (Number(code) === 0) {
        return data;
      } else {
        throw {
          code,
          msg: msg || "系统繁忙",
        };
      }
    })
    .catch(err => {
      let code = Number(err.code);
      if (code === 401) {
        Cookie.set("token", "");
        window.location.href = "/#/login";
      } else {
        /** ***********code 添加错误处理（用户可看）****************/
        throw err.msg ? err : { msg: "系统繁忙" };
      }
    });
}

export function fetchCreate(
  api,
  {
    method = "get",
    delay = 0,
    requireSign = false,
    extData = {},
    headers = {},
    onError = null,
    formData = false,
    onSuccess = null,
    preprocess = true,
    IS_FAKE = false,
  }
) {
  return async (data = {}) => {
    await Helper.sleep(delay);
    if(IS_FAKE){
      return Helper.sleep(0);
    }
    return request(api, {
      method,
      data: formData ? data : Object.assign(data, extData),
      headers,
      formData,
      requireSign,
      preprocess,
    })
      .then(d => {
        if (onSuccess) {
          onSuccess(d);
        }
        return d;
      })
      .catch(error => {
        if (onError) {
          onError(error);
        } else {
          if (error.noToast) {
            return "fail";
          }
          showErrMessage(error.msg);
        }
        return "fail";
      });
  };
}

function makeURLSearchParams(obj) {
  let p = new URLSearchParams();
  for (let i in obj) {
    if (obj[i] instanceof Array) {
      obj[i] = JSON.stringify(obj[i]);
    }
    p.append(i, obj[i]);
  }
  return p.toString();
}
