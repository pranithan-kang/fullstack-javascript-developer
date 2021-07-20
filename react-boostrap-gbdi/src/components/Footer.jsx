import React from 'react'
import PropTypes from "prop-types";

const Footer = (props) => {
  const { title, isOpen } = props;
  return (
    <>
      <p>{title} &copy; {new Date().getFullYear()} {isOpen ? "Open": "Closed"}</p>
    </>
  )
}

Footer.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool
}

export default Footer
