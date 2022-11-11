import {Link, withRouter} from 'react-router-dom'

import {BsBriefcaseFill} from 'react-icons/bs'

import {AiFillHome} from 'react-icons/ai'

import {BiExit} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <ul className="middle-contaier">
          <Link to="/">
            <li className="header-list-item">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="header-list-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="header-btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <nav className="header-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <ul className="middle-contaier">
          <Link to="/">
            <AiFillHome className="icon-1" />
          </Link>
          <Link to="/jobs">
            <BsBriefcaseFill className="icon-2" />
          </Link>
        </ul>
        <button type="button" className="header-btn" onClick={onLogout}>
          <BiExit className="icon-3" />
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
