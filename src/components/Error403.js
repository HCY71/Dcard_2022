import { useState, useEffect } from "react";
import styled from "styled-components";
import RWD from '../css/rwd';
import Global from '../css/global';
import Loading from "./Loading";
import { motion } from "framer-motion";
import variants from "../motion/variants";

//Styling
const StyledDiv = styled(motion.div)`
    color: ${props => props.theme.main};
    width: 90vw;
    border: solid 1px ${props => props.theme.border};
    border-radius: 10px;
    padding: 20px 40px;
    margin-top: 30px;
    display: grid;
    grid-row-gap: 10px;
    .title{
        font-size: 60px;
        font-weight: bold;
    }
    .subtitle{
        font-size: 20px;
    }
    .des{
        margin-top: 10px;
    }
    ${RWD.md}{
        max-width: 500px;
    }
    ${RWD.xl}{
        padding: 40px 120px;
        max-width: ${Global.maxContentWidth};
    }
    
`

const Error_403 = () => {
    const [isLoading, setIsLoading] = useState(true);

    //When the ComponentDidMounted + 1s, set isLoading to false
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return (
        <>
            {/* When loading, show Loading components*/}
            {isLoading ? <Loading /> :
                // Adding animation on page
                <StyledDiv className="error-403" variants={variants.pageVariants} initial="initial" animate="animate" exit="exit">
                    <div className="title">403</div>
                    <div className="subtitle">Unauthenticated clients can make 60 requests per hour.</div>
                    <a href="https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#authentication" target="_blank" rel="noreferrer">See Github Doc</a>
                    <div className="des">You need to add your GitHub Token as .env file to continue!</div>
                    <a href="https://github.com/HCY71/RepoFinder#getting-started-with-create-react-app" target="_blank" rel="noreferrer">See README</a>
                </StyledDiv>
            }
        </>

    );
}

export default Error_403;