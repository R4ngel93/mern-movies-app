import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
  className: 'navbar-brand'
})``

class Logo extends Component {
  render() {
    return (
      <Wrapper href='https://github.com/R4ngel93' target='_blank'>
        <img src={logo} width="50" height="50" alt="github.com/R4ngel93" />
      </Wrapper>
    )
  }
}

export default Logo