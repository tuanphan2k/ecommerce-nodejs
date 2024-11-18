import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import shopModel from "../models/shop.model.js";
import { getInfoData } from "../utils/index.js";
import { AuthFailureError, BadRequestError } from "../core/error.response.js";
import { findByEmail } from "./shop.service.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };
  /*
    1. Check email exist
    2. Compare password
    3. Create AT, RT and save RT to db
    4. Generate tokens
    5. Return tokens and user info
  */
  static logIn = async ({ email, password, refreshToken = null }) => {
    // 1
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not found!");

    // 2
    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Password or email is incorrect!");

    // 3
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // 4
    const tokens = await createTokenPair(
      {
        userId: foundShop._id,
        email,
      },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    // 5
    return {
      shop: getInfoData({
        object: foundShop,
        fields: ["_id", "name", "email"],
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    // check email exist
    const holderShop = await shopModel.findOne({ email }).lean();

    if (holderShop) {
      throw new BadRequestError("Error: Shop already registered!");
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
        throw new BadRequestError("Error: Create keyStore");
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
  };
}

export default AccessService;
