import API from "../config";
import axios from "axios";
import { getCookie } from "./auth.js";

const updateUser = (gender, location) =>
  axios.patch(
    `${API}/users/editProfile`,
    { gender: gender, location: location },
    { headers: { Authorization: `Bearer ${getCookie("token")}` } }
  );

export { updateUser };
