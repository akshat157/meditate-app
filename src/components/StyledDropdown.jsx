import React from 'react'
import styles from './styled-dropdown.module.css'

const StyledDropdown = ({ options, activeOption, changeOption, ...rest }) => (
  <li className={styles.drop} {...rest}>
    {activeOption}
    <ul>
      {options.map((option, i) => {
        const lowerCaseOption = option.toLowerCase()
        return (
          <li
            key={`${lowerCaseOption}-${i}`}
            className={
              activeOption === lowerCaseOption ? styles.activeOption : ''
            }
            onClick={() => changeOption(lowerCaseOption)}
          >
            {lowerCaseOption}
          </li>
        )
      })}
    </ul>
  </li>
)

export default StyledDropdown
