import { CREATED } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "User created",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

export default new AccessController();
