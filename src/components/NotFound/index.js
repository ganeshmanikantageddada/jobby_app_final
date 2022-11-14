import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-para">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
