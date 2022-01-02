import expreesJwt from "express-jwt";

export const requireSignin = expreesJwt({ //The default behavior of the module is to extract the JWT from the Authorization header as an OAuth2 Bearer token.
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  // if the token isn't verfied it return err, otherwise it return user _id wich used to genrate the token.
  //the decoded JWT payload (_id, iat, expired_date as exp) is available on the request via the user property. thats means the next callback function can access to this object using req.user
});
