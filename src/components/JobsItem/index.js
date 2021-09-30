import {Link} from 'react-router-dom'
import {IoMdPin} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobsItem = props => {
  const {jobsData} = props

  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobsData

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobItem">
        <div className="companyLogoContainer">
          <img
            className="companyLogo"
            src={companyLogoUrl}
            alt="company logo"
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

        <h1 className="jobItemDescriptionHeading">Description</h1>
        <p className="jobItemDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItem
