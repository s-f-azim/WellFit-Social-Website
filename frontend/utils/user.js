import API from "../config";
import axios from "axios";
import { getCookie } from "./auth.js";
axios.defaults.withCredentials = true;

const updateUser = (email, password, gender, location, age, nickname, bio) =>
  axios.patch(
    `${API}/users/editProfile`,
    {
      email: email,
      password: password,
      gender: gender,
      location: location,
      age: age,
      nickname: nickname,
      bio: bio,
    },
    { headers: { Authorization: `Bearer ${getCookie("token")}` } }
  );

export { updateUser };
