import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

import JobsHeader from '../JobsHeader/index'
import JobsPortal from '../JobsPortal/index'
import JobsSideBar from '../JobsSideBar/index'

const listToArrange = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsLIst: [],
    loader: false,
    apiCall: listToArrange.initial,
    searchOption: '',
    empParameter: '',
    salParameter: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  retring = () => {
    this.setState({loader: false})
    this.getDetails()
  }

  getDetails = async () => {
    const {searchOption, empParameter, salParameter} = this.state
    this.setState({loader: true, apiCall: listToArrange.success})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empParameter}&minimum_package=${salParameter}&search=${searchOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      const {jobs} = data

      const fetcheddata = jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        apiCall: listToArrange.success,
        loader: false,
        jobsLIst: fetcheddata,
      })
    } else {
      this.setState({loader: false, apiCall: listToArrange.failure})
    }
  }

  searchingDone = value => {
    this.setState({searchOption: value}, this.getDetails)
  }

  onEmploymentChnage = value => {
    this.setState({empParameter: value}, this.getDetails)
  }

  onSalaryChange = value => {
    this.setState({salParameter: value}, this.getDetails)
  }

  onZeroList = () => {
    const {jobsLIst} = this.state
    console.log(jobsLIst.length)

    return (
      <ul className="jobs-portal-list">
        {jobsLIst.map(item => {
          if (item.length === 0) {
            return (
              <div className="nothing-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="nothing-img"
                />
                <h1 className="nothing-heading">No Jobs Found</h1>
                <p className="nothing-para">
                  We could Not Find Any Jobs.Try Other Filters
                </p>
              </div>
            )
          }

          return <JobsPortal list={item} key={item.id} />
        })}
      </ul>
    )
  }

  onSuccess = () => {
    const {loader, jobsLIst} = this.state

    const styling = loader ? 'loader-container-1' : 'loader-container-2'
    return (
      <>
        <div className="jobs-container">
          <div className="jobs-left-container">
            <JobsSideBar
              onEmploymentChnage={this.onEmploymentChnage}
              onSalaryChange={this.onSalaryChange}
            />
          </div>
          <div className="jobs-right-container">
            <JobsHeader searchingDone={this.searchingDone} />
            <div className="jobs-portal">
              {loader ? (
                <div className={styling}>
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <ul className="jobs-portal-list">
                  {jobsLIst.map(item => (
                    <JobsPortal list={item} key={item.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="jobs-mobile-container">
          <JobsHeader />
          <div className="jobs-left-container">
            <JobsSideBar />
          </div>
          <div className="jobs-right-container">
            <div className="jobs-portal">
              {loader ? (
                <div className={styling}>
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                this.onZeroList()
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  onLoading = () => {
    const styling = 'loader-container-1'
    return (
      <div className="jobs-portal">
        <div className={styling}>
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    )
  }

  jobsFailure = () => {
    const {loader} = this.state

    const styling = loader ? 'loader-container-1' : 'loader-container-2'
    return (
      <>
        <div className="jobs-container">
          <div className="jobs-left-container">
            <JobsSideBar />
          </div>
          <div className="jobs-right-container">
            <JobsHeader />
            <div className="jobs-portal">
              {loader ? (
                <div className={styling}>
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <div className="jobs-failure-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="failure view"
                    className="jos-failure-img"
                  />
                  <h1 className="jobs-failure-heading">
                    Oops! Something Went Wrong
                  </h1>
                  <p className="jobs-failure-para">
                    We cannot seem to find the page you are looking for.
                  </p>
                  <div>
                    <button
                      type="button"
                      className="jobs-failure-btn"
                      onClick={this.retring}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="jobs-mobile-container">
          <JobsHeader />
          <div className="jobs-left-container">
            <JobsSideBar />
          </div>
          <div className="jobs-right-container">
            <div className="jobs-portal">
              {loader ? (
                <div className={styling}>
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <div className="jobs-failure-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="failure view"
                    className="jobs-failure-img"
                  />
                  <h1 className="jobs-failure-heading">
                    Oops! Something Went Wrong
                  </h1>
                  <p className="jobs-failure-para">
                    We cannot seem to find the page you are looking for.
                  </p>
                  <div>
                    <button type="button" className="jobs-failure-btn">
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiCall} = this.state

    switch (apiCall) {
      case listToArrange.success:
        return this.onSuccess()
      case listToArrange.failure:
        return this.jobsFailure()
      default:
        return null
    }
  }
}

export default Jobs
