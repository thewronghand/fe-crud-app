import React, { useEffect } from "react";
import styled from "styled-components";

import auth from "../firebase";
import { signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/login/loginAtom";
import Sign from "./Sign";

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
  > .user_menu {
    position: absolute;
    right: 10px;
  }
`;

function Nav() {
  return (
    <NavBar>
      <img className="logo_image" src="logo_with_title.png" alt="nav_logo" />
      <div className="user_menu">
        <Sign />
      </div>
    </NavBar>
  );
}

export default Nav;
