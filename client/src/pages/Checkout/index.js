import { Col, notification, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CART_API from "../../api/cart";
import ORDER_API from "../../api/order";
import { COD, STATUS_FAIL } from "../../constants/api";
import { cartActions } from "../../store/cart";
import { formatNumber, getSalePrice } from "../../utils";
import OrderItem from "./components/OrderItem";
import "./style.scss";

const CheckoutPage = () => {
  const tempOrderItems = localStorage.getItem("temp_order");
  const { userInfo } = useSelector((state) => state.common);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const [orderItems, setOrderItems] = useState([]);
  const [paymentType, setPaymentType] = useState(COD);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(tempOrderItems);
      setOrderItems(parsedData);
    } catch (error) {
      console.log(error);
    }
  }, [tempOrderItems]);

  const totalAmount = useMemo(() => {
    try {
      const total = orderItems.reduce((prev, cur) => {
        return (
          prev +
          cur.quantity *
            getSalePrice(cur.product.price, cur.product.sale_percent)
        );
      }, 0);

      return total;
    } catch (error) {
      return 0;
    }
  }, [orderItems]);

  const handleSubmit = async () => {
    try {
      const data = {
        payment_type: paymentType,
        user: userInfo._id,
      };
      const response = await ORDER_API.createOrder(data);

      if (response.status === STATUS_FAIL)
        return notification.error({
          placement: "topRight",
          message: "Error!",
          description: response.message,
          duration: 3,
        });

      const orderItemsPayload = orderItems.map((item) => ({
        order_id: response.data._id,
        product: item.product._id,
        item_price: getSalePrice(item.product.price, item.product.sale_percent),
        quantity: item.quantity,
      }));

      const revovedCartItemIds = orderItems.map((item) => item._id);

      const orderItemsResponse = await ORDER_API.createOrderItems({
        order_items: orderItemsPayload,
      });

      const cartRemoveResponse = await CART_API.removeCartItems({
        _ids: revovedCartItemIds,
      });

      if (
        orderItemsResponse.status === STATUS_FAIL ||
        cartRemoveResponse.status === STATUS_FAIL
      )
        console.log(response.message);

      localStorage.removeItem("temp_order");
      const newCartItems = cartItems.filter((item) => {
        let index = revovedCartItemIds.findIndex((id) => id === item._id);
        return index === -1;
      });

      dispatch(cartActions.loadCart(newCartItems));
      notification.success({
        placement: "topRight",
        message: "Successfully",
        description: response.message,
        duration: 3,
      });

      history.push("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="checkout">
      <div className="container">
        <div className="checkout__wrap">
          <div className="checkout__header">
            <div className="checkout__header__wrap">
              <Link to="/" className="checkout__header__navigation">
                <img src="/svg/arrow-prev-cart.svg" alt="navigation" />
              </Link>
              <div className="checkout__header__title">
                Checkout <span>(10)</span>
              </div>
            </div>
          </div>
          <h4 className="checkout__title">CHECKOUT</h4>
          <div className="checkout__body checkout__body__response">
            <Row
              gutter={[
                { xl: 16, lg: 16, md: 16, sm: 16, xs: 16 },
                { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              ]}
              className="body_response__row"
            >
              <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                <div className="order__items-container">
                  <ul className="order__items-list">
                    {orderItems.map((item) => (
                      <li key={item._id} className="order__items-item">
                        <OrderItem data={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="cart_total__prices">
                  <div
                    className="cart_total__prices__wrap"
                    style={{
                      border: "1px solid var(--my-border-color)",
                      padding: 8,
                    }}
                  >
                    <Row
                      gutter={[0, { xl: 16, lg: 16, md: 16, sm: 16, xs: 16 }]}
                    >
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className="ship_address">
                          <div className="ship_address__wrap">
                            <div className="heading">
                              <div className="text">Giao tới</div>
                              <Link className="change_address" to="#">
                                Thay đổi
                              </Link>
                            </div>
                            <div className="title">
                              <div className="icon">
                                <img
                                  src="/svg/address-cart.svg"
                                  alt="address"
                                />
                              </div>
                              <div className="name">{`${userInfo.last_name} ${userInfo.first_name}`}</div>
                              <div className="phone">{userInfo.phone}</div>
                            </div>
                            <div className="address">{userInfo.address}</div>
                          </div>
                          <Link to="#" className="ship_address__navigation">
                            <img
                              src="/svg/arrow-next-cart.svg"
                              alt="navigation"
                            />
                          </Link>
                        </div>
                      </Col>
                      <Col xl={24} lg={0} md={0} sm={0} xs={0}></Col>
                      <Col xl={24} lg={0} md={0} sm={0} xs={0}>
                        <div className="cart_prices">
                          <div className="cart_prices__wrap">
                            <ul className="price_list">
                              <li className="price_item">
                                <span className="price_item__text">
                                  Tạm tính
                                </span>
                                <span className="price_item__value">
                                  {formatNumber(1000000)}₫
                                </span>
                              </li>
                              <li className="price_item">
                                <span className="price_item__text">
                                  Giảm giá
                                </span>
                                <span className="price_item__value">0đ</span>
                              </li>
                            </ul>
                            <div className="prices_total">
                              <div className="prices_total__text">
                                Tổng cộng
                              </div>
                              <div className="prices_total__content">
                                <div className="final">
                                  {formatNumber(totalAmount)}₫
                                </div>
                                <div className="note">
                                  (Đã bao gồm VAT nếu có)
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl={24} lg={0} md={0} sm={0} xs={0}>
                        <div className="cart_submit">
                          <button
                            onClick={handleSubmit}
                            className="cart_submit__btn"
                          >
                            Đặt Hàng ({orderItems.length})
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="checkout__footer">
            <div className="checkout__footer__wrap">
              <div className="footer_prices">
                <div className="footer_prices__wrap ">
                  <div className="footer_prices__left">
                    <div className="left_title">Tổng cộng</div>
                    <div className="left_text">Vui lòng chọn sản phẩm</div>
                  </div>
                  <div className="footer_prices__right">
                    <div onClick={handleSubmit} className="right_button">
                      Đặt hàng ({orderItems.length})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
