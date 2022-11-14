import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import './index.css'

class JobsHeader extends Component {
  state = {searching: ''}

  onSearch = event => {
    this.setState({searching: event.target.value})
  }

  onSearchClicked = () => {
    const {searching} = this.state
    const {searchingDone} = this.props
    searchingDone(searching)
  }

  render() {
    return (
      <div className="jh-container">
        <div className="search-container">
          <input
            className="js-input"
            placeholder="Search"
            type="search"
            onChange={this.onSearch}
          />
          <button
            type="button"
            className="icon-container"
            onClick={this.onSearchClicked}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default JobsHeader
