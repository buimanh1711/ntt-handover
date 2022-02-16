import { useMemo } from "react";
import { DONE, PENDING } from "../../../../constants/bill";
import { formatNumber } from "../../../../utils";
import OrderItem from "../OrderItem";
import "./style.scss";

const BillItem = ({ data }) => {
  const totalAmount = useMemo(() => {
    const { order_items } = data;

    const total = order_items?.reduce((prev, cur) => {
      return prev + cur.quantity * cur.item_price;
    }, 0);

    return total;
  }, [data]);

  return (
    <div className="bill-item">
      <div className="bill-item__status">
        {data.status === DONE
          ? "Đã giao"
          : data.status === PENDING
          ? "Đang xử lý"
          : "Chờ thanh toán"}
      </div>
      <div className="bill-item__order-list">
        {data.order_items?.map((item) => (
          <OrderItem key={item._id} data={item} />
        ))}
      </div>
      <div className="bill-item__footer">
        <div className="footer__total-price">
          Tổng tiền:{" "}
          <span className="total-price">{formatNumber(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillItem;
