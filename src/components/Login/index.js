import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  componentDidMount() {
    this.checkToken()
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  loginApiCall = async event => {
    event.preventDefault()
    this.setState({errorMsg: ''})
    const {history} = this.props
    const {username, password} = this.state
    const userdetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  checkToken = () => {
    const token = Cookies.get('jwt_token')
    const {history} = this.props
    if (token !== undefined) {
      history.replace('/')
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="loginMain">
        <div className="loginCard">
          <form onSubmit={this.loginApiCall} className="loginForm">
            <img
              className="loginWebsiteLogo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <label className="loginLabel" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.updateUsername}
              value={username}
              autoComplete="off"
              className="loginInput"
              placeholder="Username"
              id="username"
              type="input"
            />
            <label className="loginLabel" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.updatePassword}
              value={password}
              autoComplete="new-password"
              className="loginInput"
              placeholder="Password"
              id="password"
              type="password"
            />
            <button className="loginBtn" type="submit">
              Login
            </button>
            <p className="errorMsg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
