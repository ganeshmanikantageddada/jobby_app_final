import {Component} from 'react'

import Cookies from 'js-cookie'

import JobsCardDetails from '../JobCardDetails/index'

class JobsCard extends Component {
  state = {renderList: []}

  componentDidMount() {
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
    console.log(data)
    console.log(response)
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
    const list2 = [convertedJObDetails.skills]
    const skillsList = list2.map(item => ({
      imageUrl: item.image_url,
      name: item.name,
    }))
    const similarJobsList = similarJobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: id.job_description,
      location: item.location,
      rating: item.rating,
      title: item.title,
    }))
    console.log(convertedJObDetails)
    console.log(lifeAtCompanyList)
    console.log(skillsList)
    console.log(similarJobsList)
  }

  render() {
    return <JobsCardDetails />
  }
}
export default JobsCard
