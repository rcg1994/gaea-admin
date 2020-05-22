const PREFIX = "http://127.0.0.1:8080";
// const PREFIX = "";
console.log("API ON:", PREFIX);
export default class API {
  static PREFIX = PREFIX;
  /* replace api */
  static API_FAKE = PREFIX + "/api/fake";
  /* end replace */
}
