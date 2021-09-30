import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const userApiStatusOutputs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class UserProfile extends Component {
  state = {userApiStatus: userApiStatusOutputs.initial, userDetails: []}

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    this.setState({userApiStatus: userApiStatusOutputs.loading})
    const token = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        userApiStatus: userApiStatusOutputs.success,
        userDetails: data,
      })
      console.log(data)
    } else {
      this.setState({userApiStatus: userApiStatusOutputs.failure})
    }
  }

  getSuccessData = () => {
    const {userDetails} = this.state
    console.log(userDetails)
    const profileDetails = userDetails.profile_details
    const {name} = profileDetails
    const imageUrl = profileDetails.profile_image_url
    const bio = profileDetails.short_bio
    return (
      <div className="userDetailsContainer">
        <img className="profileImage" src={imageUrl} alt="profile" />
        <h1 className="profileHeading">{name}</h1>
        <p className="profileBio">{bio}</p>
      </div>
    )
  }

  getLoadingData = () => (
    <div className="loaderContainer">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getFailureData = () => (
    <div className="loaderContainer">
      <button className="failureBtn" onClick={this.getUserData} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {userApiStatus} = this.state
    switch (userApiStatus) {
      case userApiStatusOutputs.success:
        return this.getSuccessData()
      case userApiStatusOutputs.failure:
        return this.getFailureData()
      case userApiStatusOutputs.loading:
        return this.getLoadingData()
      default:
        return null
    }
  }
}

export default UserProfile
