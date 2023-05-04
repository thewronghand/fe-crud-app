import React, { useEffect } from "react";
import styled from "styled-components";

import auth from "../firebase";
import { signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/login/loginAtom";

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
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserData(user);
    });

    return () => unsubscribe();
  }, [setUserData]);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserData({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.signOut();
    setUserData(null);
  };

  return (
    <NavBar>
      <img className="logo_image" src="logo_with_title.png" alt="nav_logo" />
      {userData ? (
        <span>welcome {userData.displayName}</span>
      ) : (
        <button onClick={handleGoogleLogin}>login</button>
      )}
      {userData && <button onClick={handleLogout}>logout</button>}
    </NavBar>
  );
}

export default Nav;
