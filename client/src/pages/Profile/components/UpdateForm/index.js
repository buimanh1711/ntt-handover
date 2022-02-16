import { Button, Form, Input } from "antd";
const buttonItemLayout = {
  wrapperCol: { span: 8, offset: 18 },
};

const UpdateForm = ({ icon, name, placeholder, rules, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSubmit} scrollToFirstError name={name}>
      <Form.Item colon={false} rules={rules} name={name}>
        <Input prefix={icon} placeholder={placeholder} />
      </Form.Item>
      <Form.Item style={{ marginLeft: "auto" }} {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
