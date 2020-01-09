class Auth {
  static setToken(token) {
    localStorage.removeItem('token')
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static isAuthorized() {
    return this.getToken()
  }

  static getUserId() {
    const token = this.getToken()
    if (!token) return false
    const parts = token.split('.')
    return JSON.parse(atob(parts[1])).sub
  }

}

export default Auth
