import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import {TiLocation} from 'react-icons/ti'

import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'

class JobcardDetails extends Component {
  render() {
    const {list1, list2, list3} = this.props
    console.log(list2)
    console.log(list3)
    const {
      companyWebsiteUrl,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = list1

    return (
      <div className="single-card-container">
        <div className="job-portal-container">
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
          <div className="details-description-link">
            <h1 className="job-portal-description-heading">Description</h1>
            <a className="share-container" href={companyWebsiteUrl}>
              <p className="share-para">Visit</p>
              <BiLinkExternal className="link" />
            </a>
          </div>
          <p className="job-portal-description">{jobDescription}</p>
          <h1 className="single-heading">Skills</h1>
          <div className="skills-list-container">
            <ul className="skills-list">
              {list3.map(item => (
                <li className="skills-container" key={item.name}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="skills-img"
                  />
                  <p className="skills-para">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="life-at-heading">Life at Company</h1>

          <div className="life-at-container">
            <p className="life-at-para">{list2.description}</p>
            <img
              src={list2.imageUrl}
              alt={list2.imageUrl}
              className="life2-image"
            />
          </div>
        </div>
      </div>
    )
  }
}
export default JobcardDetails
