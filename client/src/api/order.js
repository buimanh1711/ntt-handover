import axiosClient from "./instances/axiosClient";

const createOrder = (data) => {
  return axiosClient({
    method: "POST",
    data,
    url: "/orders",
  });
};

const createOrderItems = (data) => {
  return axiosClient({
    method: "POST",
    data,
    url: "/order-items",
  });
};

const queryUserOrdersList = (userId) => {
  return axiosClient({
    method: "GET",
    url: `/orders/user?user=${userId}`,
  });
};

const ORDER_API = {
  createOrder,
  createOrderItems,
  queryUserOrdersList,
};

export default ORDER_API;
