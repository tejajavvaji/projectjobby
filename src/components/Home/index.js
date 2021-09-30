import {Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="homeMain">
      <div className="infoContainer">
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p className="homePara">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="homeBtn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
