import styled from 'styled-components'
import { useState, useEffect } from 'react';
import Loading from './Loading';
import Button from './Button'
import RWD from '../css/rwd'
import Global from '../css/global'
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import variants from '../motion/variants';

//Styling
const StyledDiv = styled(motion.div)`
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

    //When the ComponentDidMounted + 1s, set isLoading to false
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])


    const handleGoBack = () => {

        //Go to the previous page
        navigate(-1);
    }
    return (
        <>
            {/* When loading, show Loading components*/}
            {isLoading ? <Loading /> :
                // Adding animation on page
                <StyledDiv className="error" variants={variants.pageVariants} initial="initial" animate="animate" exit="exit">
                    <div className="title">{code}</div>
                    <div className="subtitle">{msg1}</div>
                    <div className="subtitle">{msg2}</div>
                    <StyledButton text={'Go Back'} onClick={handleGoBack} />
                </StyledDiv>
            }
        </>
    );
}

export default Error;