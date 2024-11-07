import jwt from "jsonwebtoken";

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // access token
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
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

export { createTokenPair };
