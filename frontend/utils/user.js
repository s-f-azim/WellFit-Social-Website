import API from "../config";
import axios from "axios";
import { getCookie } from "./auth.js";
axios.defaults.withCredentials = true;

const updateUser = (gender, location) =>
  axios.patch(
    `${API}/users/editProfile`,
    { gender: gender, location: location, age: age, nickname: nickname, bio: bio },
    { headers: { Authorization: `Bearer ${getCookie("token")}` } }
  );

export { updateUser };
