import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobsHeader = () => (
  <div className="jh-container">
    <div className="search-container">
      <input className="js-input" placeholder="Search" type="search" />
      <div className="icon-container">
        <BsSearch className="search-icon" />
      </div>
    </div>
  </div>
)
export default JobsHeader
