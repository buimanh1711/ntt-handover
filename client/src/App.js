import { notification } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import AUTH_API from "./api/auth";
import CART_API from "./api/cart";
import { STATUS_FAIL } from "./constants/api";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import Result from "./layouts/Result";
import SignLayout from "./layouts/SignLayout";
import { cartActions } from "./store/cart";
import { commonActions } from "./store/common";
import createSocketClient from "./utils/ws";

function App() {
  const dispatch = useDispatch();
  const { userInfo, notifications } = useSelector((state) => state.common);
  const notificationSound = new Audio("/sound/notification_sound.wav");
  const { pathname } = useLocation();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(async () => {
    if (!userInfo._id || userInfo._id === "") return;

    const notificationSocket = await createSocketClient(
      `/notification/${userInfo._id}`
    );

    notificationSocket.addEventListener("message", ({ data }) => {
      notificationSound.play();

      notification.info({
        placement: "topRight",
        message: "Notification",
        description: data,
        duration: 3,
      });

      dispatch(commonActions.setNotifications(notifications + 1));
    });
  }, [userInfo]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    AUTH_API.verify(token)
      .then((response) => {
        if (response.status === STATUS_FAIL) return console.log("Not logged!");

        dispatch(commonActions.setUserInfo(response.data));
        dispatch(commonActions.toggleLogged(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!userInfo._id || userInfo._id === "") return;

    CART_API.queryCart(userInfo._id)
      .then((response) => {
        if (response.status === STATUS_FAIL)
          return console.log(response.message);

        dispatch(cartActions.loadCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo]);

  useEffect(() => {
    scrollTop();
  }, [pathname]);
  
  return (
    <div className="App">
      <Switch>
        <Route path="/success">
          <Result
            status="success"
            title="?????t h??ng th??nh c??ng"
            subTitle="????n h??ng c???a b???n ??ang ???????c x??c nh???n. C???m ??n b???n ???? tin t?????ng Tiki."
          />
        </Route>
        <Route path="/auth">
          <SignLayout />
        </Route>
        <Route path="/">
          <MainLayout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
