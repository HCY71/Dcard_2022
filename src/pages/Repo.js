import instance from "../api/axios";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const githubToken = "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";

const Repo = () => {
    let { username, repo } = useParams();
    const [error, setError] = useState('');
    const [data, setData] = useState('');

    const getData = async (username, repo) => {
        try {
            const res = await instance.get(`/repos/${username}/${repo}`, {
                headers: {
                    "Authorization": "token " + githubToken
                }
            });
            console.log(res.data);
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
            {error ? <NotFound /> :
                <>
                    {/* {username} */}
                    {data.full_name}
                    {data.description}
                    {data.stargazers_count}
                    This is Repo {repo}.
                </>
            }
        </>);
}

export default Repo;