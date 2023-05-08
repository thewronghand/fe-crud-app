import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../recoil/login/loginAtom";
import auth, { provider } from "../firebase/index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faG } from "@fortawesome/free-solid-svg-icons";

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 40px;
    border-radius: 70%;
  }
  > .username {
    margin: 10px;
  }
`;

const SignInButton = styled.button`
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const SignOutButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function Sign() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log("signed out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <UserMenu>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="username">{user.displayName}</div>
          <SignOutButton onClick={handleSignOut}>sign out</SignOutButton>
        </UserMenu>
      ) : (
        <SignInButton onClick={handleGoogleSignIn}>
          sign in with <FontAwesomeIcon icon={faG} />
        </SignInButton>
      )}
    </div>
  );
}

export default Sign;
