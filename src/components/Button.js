import styled from 'styled-components'

const StyledDiv = styled.div`
    color: ${props=>props.theme.main};
    font-weight: bold;
    border: solid 2px ${props=>props.theme.main};
    padding: 5px 30px;
    border-radius: 10px;
    cursor: pointer;
`

const Button = ({text, className, onClick}) => {
    return (
        <StyledDiv className={className} onClick={onClick}>
            {text}
        </StyledDiv>
    );
}

export default Button;