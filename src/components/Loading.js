import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import RWD from '../css/rwd'

//Styling
const StyledDiv = styled.div`
    color: ${props => props.theme.icon};  
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    margin-top: 30px;
    opacity: 1;
    transform: scale(1);
    transition: .5s;
    &.hide{
        opacity: 0;
        transform: scale(0);
    }
    ${RWD.xl}{
        font-size: 30px;
    }
`

const Loading = ({ hide = false }) => {
    return (
        // Use class: hide to control visibility
        <StyledDiv className={`container ${hide ? 'hide' : ''}`}>
            <FontAwesomeIcon className="loading" icon={faSpinner} spin />
        </StyledDiv>
    );
}

export default Loading;