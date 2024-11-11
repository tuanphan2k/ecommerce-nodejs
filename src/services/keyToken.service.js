import keyTokenSchema from "../models/keyToken.model.js";

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenSchema.create({
        user: userId.toString(),
        publicKey,
        privateKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
