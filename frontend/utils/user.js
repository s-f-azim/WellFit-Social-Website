import API from "../config";
import axios from "axios";
import { getCookie } from "./auth.js";
axios.defaults.withCredentials = true;

const updateUser = (values) =>
  axios.patch(
    `${API}/users/editProfile`,
    {
      ...values,
    },
    { headers: { Authorization: `Bearer ${getCookie("token")}` } }
  );

export { updateUser };
