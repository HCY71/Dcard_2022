import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Repo from './pages/Repo';
import Repos from './pages/Repos';
import NotFound from './pages/NotFound';
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
  return (
    <ThemeProvider theme={theme.default}>
      <Router>
        <StyledDiv className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/users/HCY71/repos" />} />
            <Route path="/users/:username/repos" element={<Repos />} />
            <Route path="/users/:username/repos/:repo" element={<Repo />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </StyledDiv>
      </Router>
    </ThemeProvider>
  );
}

export default App;
