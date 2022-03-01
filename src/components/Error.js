import styled from 'styled-components'
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Button from '../components/Button'
import RWD from '../css/rwd'
import Global from '../css/global'
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
    color: ${props => props.theme.main};
    border: solid 1px ${props => props.theme.border};
    border-radius: 10px;
    margin-top: 30px;
    width: 90vw;
    padding: 10px;
    padding: 20px 5px;
    display: grid;
    grid-row-gap: 10px;
    justify-items: center;
    margin-top: 30px;
    .title{
        font-size: 60px;
        font-weight: bold;
    }
    .subtitle{
        font-size: 20px;
        letter-spacing: 2px;
    }
    ${RWD.sm}{
        width: 500px;
    }
    ${RWD.xl}{
        width: ${Global.maxContentWidth};
    }
`
const StyledButton = styled(Button)`
    width: 200px;
    margin: 50px;
`

const Error = ({ code, msg1, msg2 = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <>
            {isLoading ? <Loading /> :
                <StyledDiv className="error">
                    <div className="title">{code}</div>
                    <div className="subtitle">{msg1}</div>
                    <div className="subtitle">{msg2}</div>
                    <StyledButton text={'Go Back'} onClick={handleGoBack}/>
                </StyledDiv>
            }
        </>
    );
}

export default Error;