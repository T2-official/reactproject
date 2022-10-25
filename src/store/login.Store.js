import { makeAutoObservable } from "mobx"
import { http, getToken, setToken, removeToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    // 响应式
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    // 调接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    // 存token
    this.token = res.data.token;
    console.log(this.token);
    // 存ls
    setToken(this.token)
  }
  // 退出
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore