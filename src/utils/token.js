const TOKEN_KEY = 'geek_pc'

const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}
const setToken = (token) => {
  return window.localStorage.setItem(TOKEN_KEY, token)
}
const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}// 注意返回值，不要undefiend

export { getToken, setToken, removeToken }