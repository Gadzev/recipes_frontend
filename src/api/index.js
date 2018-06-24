import axios from 'axios'
import { getCookie, removeCookie } from 'tiny-cookie'
import Err from '../modules/error.js'

export default function (method, path, data, success, failed) {

  const url = 'http://homestead.recipesapi/v1'

  axios({
    method: method,
    baseURL: url,
    timeout: 10000,
    headers: {
      Authorization: getCookie('RECIPES_AUTH') !== null ? `Bearer ${getCookie('RECIPES_AUTH')}` : null
    },
    url: path,
    data: data.data
  }).then(response => {

    // Main api callback
    if (typeof success === 'function') {
      success(response)
    }

    // Sub-wrapper callback
    if (typeof data.success === 'function') {
      data.success(response)
    }

    return { error: false, data: response }
  }).catch(error => {

    error = error.response

    // Remove authorization cookie if 401 returned by any API call
    if (error.status === 401 && getCookie('RECIPES_AUTH') !== null) {
      removeCookie('RECIPES_AUTH')
    }

    let err = new Err(error.data)

    if (typeof failed === 'function') { // Main api callback
      failed(err)
    }
    if (typeof data.fail === 'function') { // Sub-wrapper callback
      data.fail(err)
    }

    return { error: true, data: err }
  })
}