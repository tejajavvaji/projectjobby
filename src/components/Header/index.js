import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="headerMain">
      <Link to="/">
        <img
          className="headerLogo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <div className="linksContainer">
        <Link to="/">
          <p className="headerLink">Home</p>
        </Link>
        <Link className="headerLink" to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <div>
        <button onClick={logout} className="headerLogoutBtn" type="button">
          Logout
        </button>
        <ul className="headerIconsContainer">
          <Link to="/">
            <li>
              <AiFillHome className="headerIcon" />
            </li>
          </Link>

          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="headerIcon" />
            </li>
          </Link>
          <button
            onClick={logout}
            className="headerLogoutIconBtn"
            type="button"
          >
            <li>
              <FiLogOut className="headerIcon" />
            </li>
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
