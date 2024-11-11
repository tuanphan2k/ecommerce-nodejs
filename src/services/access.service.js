import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import shopModel from "../models/shop.model.js";
import { getInfoData } from "../utils/index.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // check email exist
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: "xxxx",
          message: "Email already exist",
          status: "error",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxxx",
            message: "Error create keyStore",
            status: "error",
          };
        }

        // create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email,
          },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              object: newShop,
              fields: ["_id", "name", "email", "roles"],
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.log(`Error::::`, error);
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default AccessService;
