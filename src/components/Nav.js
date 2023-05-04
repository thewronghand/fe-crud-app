import React from "react";
import styled from "styled-components";

const NavBar = styled.nav`
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 50px;
  > .logo_image {
    width: 100px;
  }
  background-color: white;
  border-bottom: 1px solid black;
  z-index: 1;
`;

function Nav() {
  return (
    <NavBar>
      <img className="logo_image" src="logo_with_title.png" alt="nav_logo" />
    </NavBar>
  );
}

export default Nav;
