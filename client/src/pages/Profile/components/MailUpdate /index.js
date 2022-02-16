import { MailOutlined } from "@ant-design/icons";
import UpdateForm from "../UpdateForm";

const MailUpdate = ({ onSubmit }) => {
  return (
    <div className="update-container">
      <UpdateForm
        placeholder="Nhập email"
        icon={<MailOutlined />}
        onSubmit={onSubmit}
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please enter your E-mail!",
          },
        ]}
      />
    </div>
  );
};

export default MailUpdate;
