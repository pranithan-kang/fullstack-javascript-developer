import React from 'react'
import Title from '../styles/title/Title'

const Header = () => {
  return (
    <div>
      <h1>Hello Header</h1>
      <Title size={1.5}>Test styled-components</Title>
      <Title primary>Test styled-components</Title>
    </div>
  )
}

export default Header
