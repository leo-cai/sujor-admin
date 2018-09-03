/**
 * Cookie
 */

function updateCookie (name, value, days) {
  let exp = new Date()
  exp.setDate(exp.getDate() + days)
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString()
}

function setCookie (key, value) {
  document.cookie = key + '=' + value
}

function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return (decodeURI(arr[2]))
  } else {
    return null
  }
}

function deleteCookie (name) {
  updateCookie(name, '', '-1')
}

function signInCookie () {
  let token = getCookie('session_token')
  if (token === '-1' || !token || token === 'undefined' || token === 'null' || token === null) {
    return false
  } else {
    return true
  }
}

export {
  updateCookie,
  setCookie,
  getCookie,
  deleteCookie,
  signInCookie
}
