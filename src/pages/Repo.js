import instance from "../api/axios";
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import RWD from '../css/rwd'
import Global from '../css/global'
import Button from '../components/Button';

const githubToken = "";

const StyledDiv = styled.div`
    background-color: ${props => props.theme.front};
    margin: 10px;
    padding: 20px 10px;
    height: fit-content;
    border-radius: 20px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    justify-items: start;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
    width: 100vw;
    .repo-name{
        font-size: 18px;
        font-weight: bold;
        color: ${props => props.theme.main};
        text-align: left;
        grid-column: 1 / span 2;
        max-width: 90vw;
        overflow: hidden;
        white-space: wrap;
        text-overflow: ellipsis;
    }
    .repo-lan{
        grid-column: 1 / span 1;
        background-color: ${props=>props.theme.main};
        color:  ${props=>props.theme.front};
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 50px;
        
    }
    .repo-star{
        color: ${props => props.theme.main};
        display: grid;
        grid-template-columns: auto auto;
        grid-column: 2 / span 1;
        align-items: center;
        grid-column-gap: 5px;
    }
    .repo-des{
        text-align: left;
        grid-column: 1 / span 2;
        color: ${props => props.theme.second};
    }
    .repo-url{
        font-size: 20px;
        margin-left: 5px;
        grid-column: 1 / span 2;
        display: grid;
        align-self: start;
        grid-template-columns: auto auto;
        grid-column-gap: 10px;
        justify-self: left;
        grid-column: 1 / span 2;
    }
    ${RWD.sm}{
        margin: 20px;
        padding: 60px 40px;
        width: 80vw;        
    }
    ${RWD.md}{
        padding: 60px;
        width: 60vw;
        max-width: 600px;

    }
    ${RWD.xl}{
        max-width: ${Global.maxWidth};
        width: ${Global.maxWidth};
        grid-row-gap: 10px;
        .repo-name{
            font-size: 32px;
        }
        .repo-des{
            font-size: 20px;
            margin-top: 20px;
        }
        .repo-url{
            margin-top: 20px;
        }
    }
`
const StyleButton = styled(Button)`
    grid-column: 1 / span 2;
    justify-self: center;
    ${RWD.xl}{
        margin-top: 50px;
    }
`
const Repo = () => {
    let { username, repo } = useParams();
    const [error, setError] = useState('');
    const [data, setData] = useState('');

    let navigate = useNavigate();

    const getData = async (username, repo) => {
        try {
            const res = await instance.get(`/repos/${username}/${repo}`, {
                headers: {
                    "Authorization": `${githubToken ? "token " + githubToken: ''}`
                }
            });
            setData(res.data);
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
        getData(username, repo);
    }, [])
    return (
        <>
            {(error || !data) ? <NotFound /> :
                <StyledDiv className="repo">
                    <div className="repo-name">
                        <Link to={'/users/' + username + '/repos'} className='repo-name-user'>
                            {data.full_name.slice(0, data.full_name.indexOf('/')) + ' '}
                        </Link>
                         / {repo}
                    </div>
                    <div className="repo-lan">
                        {data.language ? data.language:'--'}
                    </div>
                    <div className="repo-star">
                        <FontAwesomeIcon className="repo-star-icon" icon={faStar}/>
                        {data.stargazers_count}
                    </div>
                    <div className="repo-des">
                        {data.description}
                    </div>
                    <a className="repo-url" href={data.html_url} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className="repo-url-icon" icon={faLink}/>
                    </a>
                    <StyleButton text={'Go Back'} onClick={()=>navigate(-1)}/>
                </StyledDiv>
            }
        </>
    );
}

export default Repo;