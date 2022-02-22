import instance from "../api/axios";
import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'

import RWD from '../css/rwd';
import Global from '../css/global';

const githubToken = "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";

const StyledDiv = styled.div`
    background-color: ${props => props.theme.front};
    margin: 10px;
    padding: 10px;
    height: 100%;
    border-radius: 20px;
    overflow-y: auto;
    .header{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: repeat(4, auto);
        grid-row-gap: 12px;
        .header-img{
            border-radius: 50%;
            width: 50vw;
            grid-row: 1 / span 1;
        }
        .header-name{
            grid-column: 2 / span 1;
            font-size: 28px;
            padding: 10px;
            align-self: center;
            font-weight: bold;
            text-align: left;
            color: ${props => props.theme.main};
        }
        .header-des{
            grid-column: 1 / span 2;
            font-size: 16px;
            text-align: left;
        }
        .header-url{
            font-size: 16px;
            grid-column: 1 / span 2;
            display: grid;
            align-items: center;
            grid-template-columns: auto auto;
            grid-column-gap: 10px;
            justify-self: left;
            .header-url-icon{
                color: ${props => props.theme.main};
            }
        }
        hr{
            width: 100%;
            grid-column: 1 / span 2;
            border: 1px ${props => props.theme.border} solid;
        }
    }
    .repos{
        display: grid;
        grid-row-gap: 10px;
        grid-template-columns: minmax(0, 1fr);
        .repos-item{
            border-radius: 10px;
            background-color: ${props => props.theme.background};
            padding: 10px 20px;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            justify-items: start;
            grid-row-gap: 10px;
            .repos-item-link{
                width: 80vw;
                font-size: 20px;
                font-weight: bold;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .repos-item-des{
                color: ${props => props.theme.second};
                text-align: left;
            }
            .repos-item-star{
                color: ${props => props.theme.main};
                display: grid;
                grid-template-columns: auto auto;
                align-items: center;
                grid-column-gap: 5px;
            }
        }
    }
    ${RWD.sm}{
        margin: 20px;
        padding: 20px;
        .header{
            justify-items: start;
            grid-column-gap: 40px;
            grid-row-gap: 0px;
            .header-name{
                padding: 0;
            }
            .header-img{
                width: 250px;
                grid-row: 1 / span 3;
            }
            .header-des{
                grid-column: 2 / span 1;
            }
            .header-url{
                grid-column: 2 / span 1;
            }
            hr{
                margin-top: 30px;
            }
        }
        .repos{
            padding-top: 30px;
        }
    }
    ${RWD.md}{
        padding: 60px 80px;
        .header{
            grid-row-gap: 10px;
            .header-name{
                font-size: 40px;
            }
            .header-img{
                width: 200px;
            }
        }
        .repos{
            .repos-item{
                .repos-item-link{
                    width: initial;
                }
            }
        }
    }
    ${RWD.lg}{
        .repos{
            grid-row-gap: 30px;
            .repos-item{
                padding: 20px 40px;
                grid-row-gap: 10px;
                .repos-item-link{
                    font-size: 26px;
                }
                .repos-item-des{
                    font-size: 20px;
                }
                .repos-item-star{
                    font-size: 18px;
                    margin-top: 20px;
                }
            }
        }
    }
    ${RWD.xl}{
        max-width: ${Global.maxWidth};
        width: ${Global.maxWidth};
        .header{
            grid-template-columns: auto 1fr;
            .header-img{
                width: 150px;
            }
            .header-name{
                font-size: 28px;
            }
            .header-des{
                max-width: 300px;
            }
        }
        .repos{
            grid-template-columns: repeat(2, auto);
            grid-column-gap: 30px;
            .repos-item{
                max-width: 400px;
                padding: 20px 30px;
                grid-template-rows: auto 1fr auto;
                .repos-item-link{
                    font-size: 20px;
                    max-width: 320px;
                }
                .repos-item-des{
                    font-size: 16px;
                }
                .repos-item-star{
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
        }
    }
`

const Repos = () => {
    let { username } = useParams();
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');

    const getUser = async (username) => {
        try {
            const res = await instance.get(`users/${username}`, {
                headers: {
                    "Authorization": "token " + githubToken
                }
            });
            setUser(res.data);
        }
        catch (e) {
            const status = e.response.status;
            // if(status === 404){
            //     window.location = '/';
            // }
            setError(e.message);
        }
    }
    const getRepos = async (username) => {
        try {
            const res = await instance.get(`users/${username}/repos`, {
                headers: {
                    "Authorization": "token " + githubToken
                }
            });
            // console.log(res.data[0])
            setRepos(res.data);
        }
        catch (e) {
            const status = e.response.status;
            // if(status === 404){
            //     window.location = '/';
            // }
            setError(e.message);
        }
    }

    useEffect(() => {
        getUser(username);
        getRepos(username);
        // howtographql
    }, [])

    return (
        <StyledDiv className="repos-page">
            {user ? <div className="header">
                <img src={user.avatar_url} alt="" className="header-img" />
                <div className="header-name">{user.name ? user.name : user.login}</div>
                {/* <div className="header-login">{user.login}</div> */}
                <div className="header-des">{user.bio}</div>
                <a className="header-url" href={user.html_url} rel="noreferrer" target='_blank'>
                    <FontAwesomeIcon icon={faLink} className='header-url-icon' />
                    {user.html_url}
                </a>
                <hr />
            </div> : ''}
            {error ? <NotFound /> : <div className="repos">{repos.map(r =>
                <Link to={r.name} className="repos-item" key={r.id}>
                    <div to={r.name} className="repos-item-link">
                        {r.name}
                    </div>
                    <div className="repos-item-des">
                        {r.description}
                    </div>
                    <div className="repos-item-star">
                        <FontAwesomeIcon icon={faStar} className="repos-item-star-icon"></FontAwesomeIcon>
                        {r.stargazers_count}
                    </div>
                </Link>
            )}</div>}
        </StyledDiv>
    );
}

export default Repos;