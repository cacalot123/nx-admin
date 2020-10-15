export const TokenKey = 'rights-coupon'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  console.log('removeToken')
  return localStorage.removeItem(TokenKey)
}
