import {IoMdPin} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const renderJobCard = eachJob => {
  console.log(eachJob)
  const {rating, title, location, id} = eachJob
  const jobDescription = eachJob.job_description
  const employmentType = eachJob.employment_type
  const companyLogoUrl = eachJob.company_logo_url
  return (
    <li key={id} className="jobCard2">
      <div className="companyLogoContainer">
        <img
          className="companyLogo"
          src={companyLogoUrl}
          alt="similar job company logo"
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
      </div>
      <div className="descriptionContainer">
        <h1 className="jobDetailsDescriptionHeading">Description</h1>
      </div>
      <p className="jobItemDescription">{jobDescription}</p>
    </li>
  )
}

const SimilarJobs = props => {
  const {jobs} = props
  return (
    <>
      <h1 className="similarProductsPara">Similar Jobs</h1>
      <ul className="similarJobsList">
        {jobs.map(eachJob => renderJobCard(eachJob))}
      </ul>
    </>
  )
}

export default SimilarJobs
