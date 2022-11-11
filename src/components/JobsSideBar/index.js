import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsSideBar extends Component {
  state = {dataList: {}}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      const profileDetails = [data]
      const profileDetailsList = profileDetails.map(item => ({
        Details: item.profile_details,
      }))
      const usefulDetails = profileDetailsList[0].Details
      const convertedData = {
        name: usefulDetails.name,
        profileImgUrl: usefulDetails.profile_image_url,
        shortBio: usefulDetails.short_bio,
      }
      this.setState({dataList: convertedData})
    }
  }

  render() {
    const {dataList} = this.state
    const {name, profileImgUrl, shortBio} = dataList

    return (
      <div className="sidebar-container">
        <div className="profile-container">
          <img src={profileImgUrl} alt="profile" className="profile" />
          <h1 className="name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
        <hr />
        <h1 className="employment-heading">Type Of Employment</h1>
        <ul className="employment-list">
          {employmentTypesList.map(item => (
            <li className="employment-list-item">
              <input
                type="checkbox"
                id="employment"
                className="employment-input"
              />
              <label
                className="employment-para"
                htmlFor="employment"
                key={item.salaryRangeId}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
        <hr />
        <h1 className="salaryRanges-heading">Salary Range</h1>
        <ul className="salaryRanges-list">
          {salaryRangesList.map(item => (
            <li className="salaryRanges-list-item">
              <input
                type="radio"
                name="yes"
                id="salaryRanges"
                className="salaryRanges-input"
              />
              <label
                className="salaryRanges-para"
                htmlFor="salaryRanges"
                key={item.employmentTypeId}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default JobsSideBar
