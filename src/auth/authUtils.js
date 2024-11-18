import jwt from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler.js";
import KeyTokenService from "../services/keyToken.service.js";
import { AuthFailureError, NotFundError } from "../core/error.response.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // access token
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log(`Error verify::`, error);
      } else {
        console.log(`Decode verify::`, decode);
      }
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  // get accessToken
  //verify accessToken
  //check user in database
  //check keyStore with this userId
  // OK => next()

  //1
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");

  //2
  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw NotFundError("Not found keyStore");

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  //4
  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid Request");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

export { createTokenPair, authentication };
