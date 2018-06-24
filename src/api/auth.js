import api from './index.js'
import { setCookie, getCookie, removeCookie } from 'tiny-cookie'
import jwtDecode from 'jwt-decode'

/**
 * Returns parsed JWT from RECIPES_AUTH cookie.
 * 
 * On error, returns Object with error key and deletes cookie (if any).
 * 
 * @param {String} jwt JWT token to validate (uses auth cookie if null)
 */
const parseJWT = function (jwt) {
  try {
    const token = jwt || getCookie('RECIPES_AUTH')
    const decode = jwtDecode(token)

    return {
      token: token,
      exp: decode.exp,
      data: decode,
      error: null
    }
  } catch (err) {
    removeCookie('RECIPES_AUTH')
    return { error: err }
  }
}

/**
 * Verifies current JWT token in cookies and user object in vuex store.
 */
const checkLogin = function () {
  const jwt = parseJWT()
  return jwt.error !== null ? false : jwt
}

/**
 * Authenticates user with credentials.
 * 
 * @param {String} username  Username or email for user to authenticate.
 * @param {String} password Password for user to authenticate.
 */
const login = function (options) {
  return api('POST', `/auth`, options, function (response) {
    const data = response.data
    const tokenExpirty = new Date;

    // Login successful, JWT token issued
    if (data.message === 'OAUTH_TOKEN_ISSUED') {
      let jwt = parseJWT(data.data.accessToken)
      tokenExpirty.setDate(tokenExpirty.getDate() + 1)
      setCookie('RECIPES_AUTH', data.data.accessToken, { expires:  tokenExpirty})
      return options.loginSuccess(jwt)
    }

    // 200 status code recieved, but JWT token wasn't issued
    return options.loginFailed(`Unknown error occurred.`)
  },
  function (error) {
    if (error === undefined) {
      return options.loginFailed(`Unknown error occurred.`)
    }
    return options.loginFailed(error)
  })
}

export default {
  parseJWT,
  checkLogin,
  login
}
