import { Link } from 'gatsby'
import React from 'react'
import Column from './grid/column'
import Row from './grid/row'
import './Header.scss'
import Logo from './logo'
import MainNav from './mainNav'

const Header: React.FC = () => (
  <header className="header">
    <Row align="center">
      <Column xs={12} m={4}>
        <Link to="/">
          <Logo />
        </Link>
      </Column>
      <Column xs={12} m={8} justify="left" mJustify="right">
        <MainNav />
      </Column>
    </Row>
  </header>
)

export default Header
