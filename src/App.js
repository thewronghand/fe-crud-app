import { createGlobalStyle } from "styled-components";
import D2CodingFont from "./fonts/D2Coding-Ver1.3.2-20180524-all.ttc";

import Board from "./pages/Board";
import Nav from "./components/Nav";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'D2CodingFont';
    src: url(${D2CodingFont}) format('truetype');
  }
`;

function App() {
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
