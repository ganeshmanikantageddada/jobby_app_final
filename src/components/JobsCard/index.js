import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import JobsCardDetails from '../JobCardDetails/index'

import SimilarJobs from '../SimilarJobs/index'

import Header from '../Header'

import './index.css'

class JobsCard extends Component {
  state = {
    convertedJObDetails: [],
    lifeAtCompanyList: [],
    skillsList: [],
    similarJobsList: [],
    load: true,
    onErr: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  onagain = () => {
    this.setState({
      load: true,
      onErr: false,
    })
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const convertedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = convertedData
    const convertedJObDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
      title: jobDetails.title,
    }
    const lifeAtCompanyList = {
      description: convertedJObDetails.lifeAtCompany.description,
      imageUrl: convertedJObDetails.lifeAtCompany.image_url,
    }
    const list2 = convertedJObDetails.skills
    const skillsList = list2.map(item => ({
      imageUrl: item.image_url,
      name: item.name,
    }))
    const similarJobsList = similarJobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      rating: item.rating,
      title: item.title,
    }))

    if (response.status === 200) {
      this.setState({
        convertedJObDetails,
        lifeAtCompanyList,
        skillsList,
        similarJobsList,
        load: false,
      })
    } else {
      this.setState({onErr: true, load: false})
    }
  }

  onDetails = () => {
    const {
      convertedJObDetails,
      lifeAtCompanyList,
      skillsList,
      similarJobsList,
      onErr,
    } = this.state

    if (onErr) {
      return (
        <div className="jobs-failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="jos-failure-img"
          />
          <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
          <p className="jobs-failure-para">
            We cannot seem to find the page you are looking for.
          </p>
          <div>
            <button
              type="button"
              className="jobs-failure-btn"
              onClick={this.onagain}
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return (
      <>
        <Header />
        <div className="list-of-single-container">
          <JobsCardDetails
            list1={convertedJObDetails}
            list2={lifeAtCompanyList}
            list3={skillsList}
          />
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="silimar-job-list">
            {similarJobsList.map(item => (
              <SimilarJobs list={item} key={item.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {load} = this.state

    return (
      <>
        {load ? (
          <div className="loadd-contaier">
            <div className="loader-container">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        ) : (
          this.onDetails()
        )}
      </>
    )
  }
}
export default JobsCard
