import { EnvironmentOutlined } from "@ant-design/icons";
import UpdateForm from "../UpdateForm";

const AddressUpdate = ({ onSubmit }) => {
  return (
    <div className="update-container">
      <UpdateForm
        onSubmit={onSubmit}
        placeholder="Nhập địa chỉ"
        icon={<EnvironmentOutlined />}
        name="address"
      />
    </div>
  );
};

export default AddressUpdate;
