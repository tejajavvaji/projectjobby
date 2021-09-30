import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobsItem from '../JobsItem/index'
import Header from '../Header/index'
import FilterDetails from '../FilterDetails'
import UserProfile from '../UserProfile/index'
import './index.css'

const jobsApiStatusOutputs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    searchTerm: '',
    jobsData: [],
    jobsApiStatus: jobsApiStatusOutputs.initial,
    salary: '',
    type: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFilters = () => (
    <FilterDetails
      updateSalary={this.updateSalary}
      updateType={this.updateType}
    />
  )

  getJobsData = async () => {
    this.setState({jobsApiStatus: jobsApiStatusOutputs.loading})
    const {searchTerm, salary, type} = this.state
    const typeKeys = type.join()
    const token = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?search=${searchTerm}&minimum_package=${salary}&employment_type=${typeKeys}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsData: updatedData,
        jobsApiStatus: jobsApiStatusOutputs.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusOutputs.failure})
    }
  }

  updateType = list => {
    console.log(list)
    this.setState({type: list}, this.getJobsData)
  }

  updateSalary = amount => {
    console.log(amount)
    this.setState({salary: amount}, this.getJobsData)
  }

  updateSearchTerm = event => {
    this.setState({searchTerm: event.target.value})
  }

  renderLoading = () => (
    <div className="loaderContainer" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  reRenderData = () => {
    this.getJobsData()
  }

  checkKey = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  renderJobsSuccessData = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div className="noJobsContainer">
          <img
            className="noJobsImage"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="noJobsTitle">No Jobs Found</h1>
          <p className="noJobsPara">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <>
        <ul className="jobsUl">
          {jobsData.map(eachJob => (
            <JobsItem jobsData={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getJobsData} type="button">
        Retry
      </button>
    </div>
  )

  renderJobsData = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusOutputs.success:
        return this.renderJobsSuccessData()
      case jobsApiStatusOutputs.loading:
        return this.renderLoading()
      case jobsApiStatusOutputs.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchTerm} = this.state
    return (
      <>
        <Header />
        <div className="jobsMain">
          <div className="jobsInfoContainer">
            <div className="jobsLeftContainer">
              <div className="searchContainerSmall">
                <input
                  value={searchTerm}
                  onChange={this.updateSearchTerm}
                  onKeyDown={this.checkKey}
                  placeholder="Search"
                  className="search"
                  type="search"
                />
                <button
                  onClick={this.reRenderData}
                  type="button"
                  testid="searchButton"
                  className="searchIconContainer"
                >
                  <BsSearch />
                </button>
              </div>
              <div className="userProfileContainer">
                <UserProfile />
              </div>
              {this.getFilters()}
            </div>
            <div className="jobsRightContainer">
              <div className="searchContainer">
                <input
                  value={searchTerm}
                  onChange={this.updateSearchTerm}
                  onKeyDown={this.checkKey}
                  placeholder="Search"
                  className="search"
                  type="search"
                />
                <button
                  onClick={this.reRenderData}
                  type="button"
                  testid="searchButton"
                  className="searchIconContainer"
                >
                  <BsSearch />
                </button>
              </div>
              {this.renderJobsData()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
