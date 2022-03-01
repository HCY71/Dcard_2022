import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Global from '../css/global';
import RWD from '../css/rwd';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Error403 from '../components/Error403';

import { useGetSearch } from '../api/get';


const StyledDiv = styled.div`
    width: 100%;
    padding: 30px 10px;
    height: 100%;
    margin: 10px;
    background-color: ${props => props.theme.front};
    border-radius: 10px;
    overflow-y: auto;
    .results{
        display: grid;
        grid-row-gap: 10px;
        .results-title{
            font-size: 20px;
            padding: 20px;
            color: ${props => props.theme.main};
        }
        .result{
            background-color: ${props => props.theme.background};
            border-radius: 10px;
            color: ${props => props.theme.main};
            display: grid;
            grid-template-columns: auto 1fr;
            grid-row-gap: 15px;
            grid-column-gap: 30px;
            justify-items: center;
            align-items: center;
            padding: 30px 15px;
            .result-img{
                width: 100px;
                border-radius: 50%;
                border: solid 2px ${props => props.theme.border};
            }
            .result-name{
                font-size: 20px;
                font-weight: bold;
                justify-self: start;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 50vw;
                
                &.result-none{
                    justify-self: center;
                    grid-column: 1 / span 2;
                }
            }
            .result-type{
                font-size: 14px;
                background-color: ${props => props.theme.icon};
                color: ${props => props.theme.front};
                padding: 3px 8px;
                border-radius: 30px;
            }
        }
    }
    ${RWD.sm}{
        width: 576px;
        padding: 30px;
    }
    ${RWD.lg}{
        width: 80%;
        .results{
            grid-row-gap: 30px;
            .result{
                padding: 20px;
            }
        }
    }
    ${RWD.xl}{
        max-width: ${Global.maxWidth};
        .results{
            .result{
                width: ${Global.maxContentWidth};
                margin-left: auto;
                margin-right: auto;
            }
        }
    }
`
const Search = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isTriggered, setIsTriggered] = useState(false)

    const scrollEl = useRef(null);

    const { fetching, error, searchResult, dataEnd } = useGetSearch(searchParams, page);

    const detectFetch = () => {
        if (scrollEl.current.offsetHeight + scrollEl.current.scrollTop >= scrollEl.current.scrollHeight) {
            setIsTriggered(true);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    useEffect(() => {
        if (scrollEl.current) {
            scrollEl.current.addEventListener('scroll', detectFetch);
        };
    }, [isLoading]);

    //reset page when new search happened
    useEffect(() => {
        setPage(1);
        setIsTriggered(false);
    }, [searchParams])

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

    if (error) {
        if (error.status === 403) {
            return <Error403 />
        }
        return <Error code={error.status} msg1={"搜尋時出錯了。"} msg2={error.data.message} />
    }
    return (
        <>
            {isLoading ? <Loading /> :
                <StyledDiv className="search" ref={scrollEl}>
                    {searchResult ?
                        <div className="results">
                            <div className="results-title">
                                關鍵字： {searchParams.get('keyword')} 的搜尋結果
                            </div>
                            {searchResult.length !== 0 || fetching ? searchResult.map(r =>
                                <Link className="result" to={"/users/" + r.login + "/repos"} key={r.id}>
                                    <img className="result-img" src={r.avatar_url} alt='' />
                                    <div className="result-name">{r.login}</div>
                                    <div className="result-type">{r.type}</div>
                                </Link>
                            ) : <div className="result">
                                <div className="result-name result-none">什麼都沒找到！</div>
                                <div className="result-name result-none">換換關鍵字吧</div>
                            </div>}
                            <Loading hide={!fetching || dataEnd} />
                        </div> : ''}
                </StyledDiv>}
        </>
    );
}

export default Search;