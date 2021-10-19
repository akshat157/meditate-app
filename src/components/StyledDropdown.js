import React from 'react'
import styles from './styled-dropdown.module.css'

function StyledDropdown(props) {
  const { options, activeOption, changeOption } = props
  return (
    <li className={styles.drop} {...props}>
      {activeOption}
      <ul>
        {options.map((option, i) => {
          option = option.toLowerCase()
          return (
            <li
              key={option + i}
              className={
                activeOption === option.toLowerCase() && styles.activeOption
              }
              onClick={() => changeOption(option)}
            >
              {option}
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default StyledDropdown
