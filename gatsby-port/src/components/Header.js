import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { getConfig } from './../theme.config'

const { title, subtitle, hideMenu } = getConfig()

const Header = props => (
  <header id="header" className="alt">
    <Link to="/" className="logo">
      <strong>{title}</strong> <span>{subtitle}</span>
    </Link>
    {!hideMenu && (
      <nav>
        <a
          className="menu-link"
          onClick={props.onToggleMenu}
          href="javascript:;"
        >
          Menu
        </a>
      </nav>
    )}
  </header>
)

Header.propTypes = {
  onToggleMenu: PropTypes.func,
}

export default Header
