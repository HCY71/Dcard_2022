import styled from 'styled-components'
import Loading from '../components/Loading';

const StyledDiv = styled.div` 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    position: absolute;
    top: 0;
    background-color: ${props=>props.theme.background};
`

const LoadingPage = () => {
    return ( 
        <StyledDiv className="pageLoading">
            <Loading />
        </StyledDiv>
     );
}
 
export default LoadingPage;