import Header from '../Header/index'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notFoundMain">
      <div className="notFoundContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1 className="notFoundHeading">Page Not Found</h1>
        <p>we’re sorry, the page you requested could not be found</p>
      </div>
    </div>
  </>
)

export default NotFound
