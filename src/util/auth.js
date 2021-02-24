import Cookies from 'js-cookie'
const TokenKey = 'saber-access-token'
const nameKey = 'hahahha'
// const RefreshTokenKey = 'saber-refresh-token'
export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function getUsername() {
    return Cookies.get(nameKey);
}

export function setUsername(name) {
    return Cookies.set(nameKey, name)
}
export function clearAllCookies() {
    Cookies.remove(TokenKey)
    Cookies.remove(nameKey)
  }
// export function getRefreshToken() {
//   return Cookies.get(RefreshTokenKey)
// }

// export function setRefreshToken(token) {
//   return Cookies.set(RefreshTokenKey, token)
// }

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// export function removeRefreshToken() {
//   return Cookies.remove(RefreshTokenKey)
// }

