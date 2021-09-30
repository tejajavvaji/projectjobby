import {Component} from 'react'
import './index.css'

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
let typeList = []
class FilterDetails extends Component {
  sendType = event => {
    if (typeList.includes(event.target.value)) {
      typeList = typeList.filter(item => item !== event.target.value)
    } else {
      typeList.push(event.target.value)
    }
    const {updateType} = this.props
    updateType(typeList)
  }

  renderEachEmploymentType = eachType => {
    const {label, employmentTypeId} = eachType
    return (
      <li
        key={employmentTypeId}
        onChange={this.sendType}
        className="filterTypeListItem"
      >
        <input value={employmentTypeId} id={employmentTypeId} type="checkbox" />
        <label className="filterTypeLabel" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  sendSalary = event => {
    const {updateSalary} = this.props
    updateSalary(event.target.value)
  }

  renderEachRange = eachRange => {
    const {label, salaryRangeId} = eachRange
    return (
      <li
        key={salaryRangeId}
        onChange={this.sendSalary}
        className="filterTypeListItem"
      >
        <input
          value={salaryRangeId}
          name="range"
          id={salaryRangeId}
          type="radio"
        />
        <label className="filterTypeLabel" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  render() {
    return (
      <div className="filterMain">
        <div className="filterDataContainer">
          <h1>Type of Employment</h1>
          <ul className="filterTypeList">
            {employmentTypesList.map(eachType =>
              this.renderEachEmploymentType(eachType),
            )}
          </ul>
        </div>
        <div className="filterDataContainer">
          <h1>Salary Range</h1>
          <ul className="filterTypeList">
            {salaryRangesList.map(eachRange => this.renderEachRange(eachRange))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterDetails
