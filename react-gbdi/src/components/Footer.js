import React from 'react'

const Footer = (props) => {
  const { title, isOpen } = props;
  return (
    <>
      <p>{title} &copy; {new Date().getFullYear()} {isOpen ? "Open": "Closed"}</p>
    </>
  )
}

export default Footer
