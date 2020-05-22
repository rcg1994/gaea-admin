import API from "./api";
import { fetchCreate } from "./fetch";

const postParams = {
  method: "post",
};

/* replace services */
// fake api
export const fetchApiFake = fetchCreate(API.API_FAKE, {
  IS_FAKE: true,
});
/* end replace */
