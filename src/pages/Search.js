import { useState, useEffect } from 'react';
import instance from "../api/axios";
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Global from '../css/global';
import RWD from '../css/rwd';


const githubToken = "";

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
                border: solid 2px ${props=>props.theme.border};
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
    const [searchResult, setSearchResult] = useState([]);

    const getData = async () => {
        try {
            const res = await instance.get(`search/users`, {
                headers: {
                    "Authorization": `${githubToken ? "token " + githubToken: ''}`
                },
                params: {
                    q: searchParams.get('keyword') + 'in:fullname&type=Users',
                    per_page: 10
                }
            });
            setSearchResult(res.data.items);
        }
        catch (e) {
            const status = e.response.status;
            // if(status === 404){
            //     window.location = '/';
            // }
            // setError(e.message);
        }
    }

    useEffect(() => {
        getData();
    }, [searchParams])

    return (
        <StyledDiv className="search">
            {searchResult ? <div className="results">
                <div className="results-title">
                    關鍵字： {searchParams.get('keyword')} 的搜尋結果
                </div>
                {searchResult.length !== 0 ? searchResult.map(r =>
                    <Link className="result" to={"/users/" + r.login + "/repos"} key={r.id}>
                        <img className="result-img" src={r.avatar_url} />
                        <div className="result-name">{r.login}</div>
                        <div className="result-type">{r.type}</div>
                        {/* <a className="result-url" href={r.html_url} target="_black" rel="noreferrer">
                        <FontAwesomeIcon icon={faLink}/>
                    </a> */}
                    </Link>
                ) : <div className="result">
                    <div className="result-name result-none">什麼都沒找到！</div>
                    <div className="result-name result-none">換換關鍵字吧</div>
                </div>}
            </div> : ''}
        </StyledDiv>
    );
}

export default Search;