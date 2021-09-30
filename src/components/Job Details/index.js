import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdPin} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs/index'
import Header from '../Header/index'
import './index.css'

const jobDetailsApiStatusOutputs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {jobDetails: [], apiStatus: jobDetailsApiStatusOutputs.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: jobDetailsApiStatusOutputs.loading})
    const {match} = this.props
    const {id} = match.params
    console.log(id)
    const token = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        skills: data.job_details.skills,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        similarJobs: data.similar_jobs,
      }
      //   console.log(data)
      this.setState({
        jobDetails: updatedData,
        apiStatus: jobDetailsApiStatusOutputs.success,
      })
    } else {
      this.setState({apiStatus: jobDetailsApiStatusOutputs.failure})
    }
  }

  renderLoading = () => (
    <div testid="loader" className="loaderContainer">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessData = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      similarJobs,
    } = jobDetails

    return (
      <>
        <div className="jobCard">
          <div className="companyLogoContainer">
            <img
              className="companyLogo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="titleContainer">
              <h1 className="jobTitle">{title}</h1>
              <div className="ratingContainer">
                <AiFillStar className="ratingIcon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobIconsContainer">
            <div className="jobLocationContainer">
              <IoMdPin className="jobsItemIcon" />
              <p className="jobsItemIconPara">{location}</p>
              <BsFillBriefcaseFill className="jobsItemIcon" />
              <p className="jobsItemIconPara">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <div className="descriptionContainer">
            <h1 className="jobDetailsDescriptionHeading">Description</h1>
            <a className="websiteUrl" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="jobItemDescription">{jobDescription}</p>
          <h1 className="jobDetailsDescriptionHeading">Skills</h1>
          <ul className="skillsContainer">
            {skills.map(eachSkill => {
              const {name} = eachSkill
              const imageUrl = eachSkill.image_url
              console.log(name, imageUrl)
              return (
                <li key={name} className="skillListItem">
                  <div className="skillsIconContainer">
                    <img className="skillsIcon" src={imageUrl} alt={name} />
                  </div>
                  <p>{name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="lifeAtCompany">Life At Company</h1>
          <div className="lifeAtCompanyContainer">
            <p className="LACPara">{lifeAtCompany.description}</p>
            <img
              className="LACImage"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similarJobsData">
          <SimilarJobs jobs={similarJobs} />
        </div>
      </>
    )
  }

  renderJobData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobDetailsApiStatusOutputs.success:
        return this.renderJobsSuccessData()
      case jobDetailsApiStatusOutputs.loading:
        return this.renderLoading()
      case jobDetailsApiStatusOutputs.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getJobDetails} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobDetailsMain">{this.renderJobData()}</div>
      </>
    )
  }
}

export default JobDetails
