import keyTokenSchema from "../models/keyToken.model.js";

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        user: userId,
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keyTokenSchema.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
