import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', warning: false, warningMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')

      this.setState({warning: false, username: '', password: ''})
    } else {
      this.setState({warning: true, warningMsg: data.error_msg})
    }
  }

  render() {
    const {warning, warningMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />

          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="login-input-container">
              <label htmlFor="userName" className="login-heading">
                USERNAME
              </label>
              <input
                type="text"
                className="login-input"
                placeholder="Username"
                onChange={this.onUsername}
                value={username}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="userName" className="login-heading">
                PASSWORD
              </label>
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                onChange={this.onPassword}
                value={password}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>

            {warning && <p className="warning">*{warningMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
