import React from 'react'

const StyleExperimental = () => {
  return (
    <>
      <p className="test-style-from-app-css">This is style from global</p>
      <p style={styles}>This is style from css-in-js</p>
    </>
  )
}

/**
 * Partial support CSS command
 */
const styles = { color: 'green' }

export default StyleExperimental
