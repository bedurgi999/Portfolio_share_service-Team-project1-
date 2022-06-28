import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RightNavigation';

const StyledBurger = styled.div`
  :hover {
    cursor: pointer;
    div {
      background-color: black;
    }
  }
  width: 2rem;
  height: 2rem;
  margin: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 1300px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #79889e;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = ({logout}) => {
  const [open, setOpen] = useState(false)

  const changeOpen = () => {
    setOpen(false)
  }
  
  return (
      <>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
        <RightNav logout={logout} open={open} changeOpen={changeOpen} />
      </>
  )
}

export default Burger