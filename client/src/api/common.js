import axiosClient from "./instances/axiosClient";

const getProducts = () => {
  return axiosClient({
    method: "GET",
    url: `/products?page=1`,
  });
};

const getCategories = () => {
  return axiosClient({
    method: "GET",
    url: `/categories?page=1`,
  });
};

const getBrands = () => {
  return axiosClient({
    method: "GET",
    url: `/brands?page=1`,
  });
};

const COMMON_API = {
  getProducts,
  getCategories,
  getBrands,
};

export default COMMON_API;
