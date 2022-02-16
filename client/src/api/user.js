import axiosClient from "./instances/axiosClient";

const updateUser = (userId, data) => {
  return axiosClient({
    method: "PUT",
    url: `/users/${userId}`,
    data,
  });
};

const getUserInfo = (userId) => {
  return axiosClient({
    method: "GET",
    url: `/users/${userId}`,
  });
};

const USER_API = {
  updateUser,
  getUserInfo,
};

export default USER_API;
