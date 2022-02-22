import styled from 'styled-components';
import logo from '../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMoon } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import RWD from '../css/rwd';
import Global from '../css/global';

const StyledDiv = styled.div`
    background-color: ${props=>props.theme.background};
    width: 100%;
    display: grid;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: 7fr 1fr auto;
    height: 50px;
    padding: 10px;
    align-content: center;
    justify-items: center;
    .brand, .search, .mode ,.link{
        display: grid;
        justify-items: center;
        align-content: center;
    }
    .brand{
        display: none;
    }
    .search{
        background-color: ${props=>props.theme.front};
        padding: 5px 10px;
        border-radius: 10px;
        grid-template-columns: auto auto;
        grid-column-gap: 10px;
        justify-self: start;
        .search-input{
            width: 55vw;
            border: none;
        }
        .search-input:focus{
            outline: none;
        }
        .search-icon{
            color: ${props=>props.theme.icon};
        }
    }
    .mode{
        .mode-icon{
            font-size: 20px;
            color: ${props=>props.theme.icon};
        }
    }
    .link{
        justify-self: end;
        padding-left: 10px;
        border-left: solid ${props=>props.theme.border} 2px;
        border-radius: 2px;
        .link-logo{
            width: 30px;
        }
    }
    ${RWD.sm}{
        grid-template-columns: 7fr auto auto;
        .search{
            .search-input{
                width: 70vw;
            }
        }
        .mode{
            margin: 0px 10px;
        }
    }
    ${RWD.md}{
        height: 60px;
        grid-template-columns: auto 5fr auto auto;
        padding: 20px;
        .brand{
            display: initial;
            display: grid;
            justify-items: center;
            align-content: center;
            .brand-link{
                font-weight: bold;
                color: ${props=>props.theme.icon};
                font-size: 20px;
            }
        }
        .search{
            justify-self: center;
            .search-input{
                width: 50vw;
                max-width: 500px;
            }
        }
        .mode{
            margin: 0px 20px;
        }
    }
    ${RWD.xl}{
        max-width: ${Global.maxWidth};
        height: 80px;
        padding: 20px 0px;
    }
`

const Navbar = () => {
    return ( 
        <StyledDiv id="navbar">
            <div className="brand">
                <Link to='/' className='brand-link'>
                    Repo Finder
                </Link>
            </div>
            <div className="search">
                <input type="text" className="search-input" placeholder='搜尋...'></input>
                <div className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                </div>
            </div>
            <div className="mode">
                    <div className="mode-button">
                        <FontAwesomeIcon icon={faMoon} className="mode-icon"/>
                    </div>
            </div>
            <a className='link' href='https://github.com/HCY71/Dcard_2022' target='_blank' rel="noreferrer">
                <img src={logo} alt="" className="link-logo" />
            </a>
        </StyledDiv>
     );
}
 
export default Navbar;