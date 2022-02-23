import './App.css';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Repo from './pages/Repo';
import Repos from './pages/Repos';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import theme from './css/theme'

const StyledDiv = styled.div`
  background-color: ${props=>props.theme.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-bottom: 10px; */
  a{
    text-decoration: none;
    color: ${props=>props.theme.link}
  }
`

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleTheme = ()=>{
    setIsDarkTheme(!isDarkTheme);
    console.log(isDarkTheme);
  }
  return (
    <ThemeProvider theme={isDarkTheme? theme.default:theme.light}>
      <Router>
        <StyledDiv className="App">
          <Navbar handleTheme={handleTheme}/>
          <Routes>
            <Route path="/" element={<Navigate to="/users/HCY71/repos" />} />
            <Route path="/users/:username/repos" element={<Repos />} />
            <Route path="/users/:username/repos/:repo" element={<Repo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </StyledDiv>
      </Router>
    </ThemeProvider>
  );
}

export default App;
