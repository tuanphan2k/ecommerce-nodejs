import { CREATED, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success",
      metadata: await AccessService.logIn(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "User created",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

export default new AccessController();
