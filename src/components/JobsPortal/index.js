import {AiFillStar} from 'react-icons/ai'

import {TiLocation} from 'react-icons/ti'

import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobsPortal = props => {
  const {list} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = list

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-portal-container">
        <div className="job-portal-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-portal-logo"
          />
          <div className="job-portal-role-container">
            <p className="job-portal-role">{title}</p>
            <div className="rating-container">
              <AiFillStar className="job-portal-icon" />
              <p className="job-portal-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-portal-salary-container">
          <div className="salary-part-1">
            <div className="location-container">
              <TiLocation className="location-icon" />
              <p className="job-portal-location">{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="location-icon" />
              <p className="job-portal-location">{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr />
        <h1 className="job-portal-description-heading">Description</h1>
        <p className="job-portal-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsPortal
