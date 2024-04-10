const { expressjwt: jwt } = require("express-jwt")
import jwksRsa from "jwks-rsa"
import 'dotenv/config'

export const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.OAUTH_PROVIDER_DOMAIN}/.well-known/jwks.json`
    }),
    audience: `https://${process.env.OAUTH_PROVIDER_DOMAIN}/api/v2/`,
    issuer: `https://${process.env.OAUTH_PROVIDER_DOMAIN}/`,
    algorithms: ['RS256']
  });