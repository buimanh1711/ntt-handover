const { SUCCESS, OK } = require("../../configs/constants");
const generateToken = require("../../helpers/generate_token");
const UserModel = require("../../models/user.model");

class SignHandlers {
  async login(data) {
    const { email, password } = data;

    const result = await UserModel.findOne({
      email,
      password,
    });

    if (!result || result === "null" || result === "undefined")
      return {
        status: ERROR,
        response: new HttpException(400, "Sai email hoặc mật khẩu!"),
      };

    const { _id, role } = result;
    const token = generateToken({ _id, role });

    return {
      status: SUCCESS,
      response: {
        status: OK,
        message: "Đăng nhập thành công!",
        data: {
          _id,
          role,
          token,
        },
      },
    };
  }
}

module.exports = new SignHandlers();
