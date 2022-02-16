import { Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ORDER_API from "../../../../api/order";
import { STATUS_FAIL } from "../../../../constants/api";
import { CONFIRMED, DONE, PENDING } from "../../../../constants/bill";
import BillItem from "../BillItem";
import "./style.scss";

const { TabPane } = Tabs;

const Bill = () => {
  const { userInfo } = useSelector((state) => state.common);
  const [bills, setBills] = useState([]);

  useEffect(async () => {
    try {
      if (!userInfo._id || userInfo._id === "") return;

      const response = await ORDER_API.queryUserOrdersList(userInfo._id);
      if (response.status === STATUS_FAIL) return console.log(response.message);

      setBills(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [userInfo._id]);

  const pending = useMemo(
    () => bills.filter((item) => item.order_status === PENDING),
    [bills]
  );

  const confirmed = useMemo(
    () => bills.filter((item) => item.order_status === CONFIRMED),
    [bills]
  );

  const done = useMemo(
    () => bills.filter((item) => item.order_status === DONE),
    [bills]
  );

  return (
    <div className="bill">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả đơn" key="ALL">
          {bills.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Đang xử lý" key={PENDING}>
          {pending.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Chờ thanh toán" key={CONFIRMED}>
          {confirmed.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
        <TabPane tab="Đã giao" key={DONE}>
          {done.map((item) => (
            <BillItem key={item._id} data={item} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Bill;
