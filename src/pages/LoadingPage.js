import styled from 'styled-components'
import Loading from '../components/Loading';

import { motion, AnimatePresence } from 'framer-motion';
import variants from '../motion/variants'


//Styling
const StyledDiv = styled(motion.div)` 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    position: absolute;
    top: 0;
    background-color: ${props => props.theme.background};
`

const LoadingPage = ({ isPageLoading }) => {
    return (
        // Adding leave animation on loading page
        <AnimatePresence initial={false}>
            {isPageLoading ?
                <StyledDiv className="pageLoading" variants={variants.backgroundVariants} exit="exit" >
                    <Loading />
                </StyledDiv> : ''
            }
        </AnimatePresence>
    );
}

export default LoadingPage;