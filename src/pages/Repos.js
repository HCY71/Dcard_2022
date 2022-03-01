import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'
import Loading from '../components/Loading';
import Error from '../components/Error'
import Error403 from '../components/Error403';

import RWD from '../css/rwd';
import Global from '../css/global';

import { useGetRepos, useGetUser } from '../api/get'

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
        grid-column-gap: 12px;
        .header-img{
            border-radius: 50%;
            width: 40vw;
            grid-row: 1 / span 1;
        }
        .header-name{
            grid-column: 2 / span 1;
            font-size: 5vw;
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
            color: ${props => props.theme.second};
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
            &.no-repo{
                color: ${props => props.theme.main};
                font-size: 20px;
                font-weight: bold;
                grid-column: 1 / span 3;
                padding: 40px;
                justify-items: center;
            }
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
                font-size: 24px;
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
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isTriggered, setIsTriggered] = useState(false);

    const scrollEl = useRef(null);

    const { user, errorUser } = useGetUser(username);
    const { fetching, error, repos, dataEnd } = useGetRepos(username, page);


    const detectFetch = () => {
        if (scrollEl.current.offsetHeight + scrollEl.current.scrollTop >= scrollEl.current.scrollHeight) {
            setIsTriggered(true);
        }
    }

    useEffect(() => {
        setPage(1);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    useEffect(() => {
        if (scrollEl.current) {
            scrollEl.current.addEventListener('scroll', detectFetch);
        };
    }, [isLoading]);

    useEffect(() => {
        if (isTriggered && !dataEnd && !fetching) {
            setPage(page + 1);
        }
        if (isTriggered) {
            setTimeout(() => {
                setIsTriggered(false);
            }, 500)
        }
    }, [isTriggered])

    if (error || errorUser) {
        if (errorUser && errorUser.status === 403) {
            return <Error403 />
        }
        else if (error && error.status === 403) {
            return <Error403 />

        }
        else if (errorUser && errorUser.status === 404) {
            return <Error code={404} msg1={"搜尋User時出錯了。"} msg2={"搜尋的User不存在！"} />
        }
        else if (errorUser) {
            return <Error code={errorUser.status} msg1={"搜尋User時出錯了。"} msg2={errorUser.data.message} />
        }
        else if (error) {
            return <Error code={error.status} msg1={"取得Repo資料時出錯了。"} msg2={error.data.message} />
        }
    }
    return (
        <>
            {isLoading ? <Loading /> :
                user ?
                    <StyledDiv className="repos-page" ref={scrollEl}>
                        <div className="header">
                            <img src={user.avatar_url} alt="" className="header-img" />
                            <div className="header-name">{user.name ? user.name : user.login}</div>
                            <div className="header-des">{user.bio}</div>
                            <a className="header-url" href={user.html_url} rel="noreferrer" target='_blank'>
                                <FontAwesomeIcon icon={faLink} className='header-url-icon' />
                                {user.html_url}
                            </a>
                            <hr />
                        </div>
                        <div className="repos" >
                            {repos.length === 0 && !fetching ?
                                <div className="repos-item no-repo">
                                    No Repo available here!
                                </div>
                                : repos.map(r =>
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
                                )}
                        </div>
                        <Loading hide={!fetching || dataEnd} />
                    </StyledDiv>
                    : ''
            }
        </>
    );
}

export default Repos;