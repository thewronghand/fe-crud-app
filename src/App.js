import { createGlobalStyle } from "styled-components";
import D2CodingFont from "./fonts/D2Coding-Ver1.3.2-20180524-all.ttc";

import Board from "./pages/Board";
import Nav from "./components/Nav";

import auth from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/login/loginAtom";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'D2CodingFont';
    src: url(${D2CodingFont}) format('truetype');
  }
`;

function App() {
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserData({
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
          uid: authUser.uid,
        });
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUserData]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <Nav />
        </header>
        <Board />
      </div>
    </>
  );
}

export default App;
