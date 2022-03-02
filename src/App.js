import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Repo from './pages/Repo';
import Repos from './pages/Repos';
import NotFound from './components/NotFound';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Loading from './pages/LoadingPage';

import styled, { ThemeProvider } from 'styled-components';
import theme from './css/theme'

import { AnimatePresence } from 'framer-motion';


//Styling
const StyledDiv = styled.div`
  background-color: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  a{
    text-decoration: none;
    color: ${props => props.theme.link}
  }
  `

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const location = useLocation();

  //Handle theme changes
  const handleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  //Check loading state
  useEffect(() => {
    if (document.readyState === 'interactive') {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 1500);
    };
  })
  return (
    // Set theme
    <ThemeProvider theme={isDarkTheme ? theme.default : theme.light}>
      <Loading isPageLoading={isPageLoading} />
      <StyledDiv className="App">
        {/* Show Loading when is loading */}
        <Navbar handleTheme={handleTheme} />
        {/* Set Routes && Animate page transition*/}
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Navigate to="/users/HCY71/repos" />} />
            <Route path="/users/:username/repos" element={<Repos />} />
            <Route path="/users/:username/repos/:repo" element={<Repo />} />
            <Route path="/search" element={<Search />} />
            {/* Catch Not Found error */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </StyledDiv>
    </ThemeProvider>
  );
}

export default App;
