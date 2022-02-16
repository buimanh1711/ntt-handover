import "./style.scss";
import { ShopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const OrderItem = ({ data }) => {
  return (
    <div className="order-item">
      <div className="order-item__thumbnail">
        <div className="thumbnail__img">
          <img src={data.product?.thumbnail_url} alt={data.product?.name} />
        </div>
        <span className="thumbnail__quantity">x{data.quantity}</span>
      </div>
      <div className="order-item__content">
        <div className="content__product-name">
          <Link to={`/products/${data.product?.slug}`} className="name">
            {data.product?.name}
          </Link>
        </div>
        <div className="content__product-brand">
          <ShopOutlined />
          <p className="brand">{data.product?.brand?.name}</p>
        </div>
      </div>
      <div className="order-item__price">
        <p className="price">{data.item_price}</p>
      </div>
    </div>
  );
};

export default OrderItem;
