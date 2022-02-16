import axiosClient from "./instances/axiosClient";

const queryCategories = () => {
  return axiosClient({
    method: "GET",
    url: `/categories`,
  });
};

const CATEGORY_API = {
  queryCategories,
};

export default CATEGORY_API;
