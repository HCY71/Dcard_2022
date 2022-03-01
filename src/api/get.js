import instance from "./axios";
import { useEffect, useState } from "react";

//Access the githubToken from .env
const githubToken = '' || process.env.REACT_APP_githubToken;

//Customize react hooks
const useGetSearch = (searchParams, page) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [dataEnd, setDataEnd] = useState(false);

    //Reset when searchResult changes.
    useEffect(() => {
        setSearchResult([])
        setDataEnd(false)
    }, [searchParams]);

    useEffect(() => {
        setFetching(true);
        setError(null);
        const fetchData = async () => {
            try {
                const res = await instance.get(`search/users`, {
                    headers: {
                        "Authorization": `${githubToken ? "token " + githubToken : ''}`
                    },
                    params: {
                        q: searchParams.get('keyword') + 'in:fullname&type=Users',
                        per_page: 10,
                        page: page
                    }
                });

                //check id uniqueness before setting searchResult
                for (let i = 0; i < res.data.items.length; i++) {
                    let unique = true;
                    searchResult.map(r => {
                        if (r.id === res.data.items[i].id) {
                            unique = false;
                        };
                        return null
                    })
                    if (unique) {
                        setSearchResult(oldData => [...oldData, res.data.items[i]]);
                    }
                }

                setFetching(false);

                //check if end of data
                if (searchResult.length === res.data.total_count || res.data.total_count === 0) {
                    setDataEnd(true)
                }
            } catch (e) {
                setError(e.response);
            }
        }
        fetchData();

    }, [searchParams, page]);

    return { fetching, error, searchResult, dataEnd };
}

const useGetRepos = (username, page) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [repos, setRepos] = useState([]);
    const [dataEnd, setDataEnd] = useState(false);

    useEffect(() => {
        setRepos([])
        setDataEnd(false)
    }, [username]);

    useEffect(() => {
        setFetching(true);
        setError(null);
        const fetchData = async () => {
            try {
                const res = await instance.get(`users/${username}/repos`, {
                    headers: {
                        "Authorization": `${githubToken ? "token " + githubToken : ''}`
                    },
                    params: {
                        per_page: 10,
                        page: page
                    }
                });

                //check id uniqueness before setting repos
                for (let i = 0; i < res.data.length; i++) {
                    let unique = true;
                    repos.map(r => {
                        if (r.id === res.data[i].id) {
                            unique = false;
                        };
                        return null
                    })
                    if (unique) {
                        setRepos(oldData => [...oldData, res.data[i]]);
                    }
                }

                setFetching(false);

                //check if end of data
                if (repos.length === res.data.total_count || res.data.total_count === 0) {
                    setDataEnd(true)
                }

            } catch (e) {
                setError(e.response);
            }
        }
        fetchData();
    }, [username, page]);

    return { fetching, error, repos, dataEnd };
}

const useGetRepo = (username, repo) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState('');

    useEffect(() => {
        setError(null);
        const fetchData = async () => {
            try {
                const res = await instance.get(`/repos/${username}/${repo}`, {
                    headers: {
                        "Authorization": `${githubToken ? "token " + githubToken : ''}`
                    }
                });
                setData(res.data)

            } catch (e) {
                setError(e.response);
            }
        }
        fetchData();

    }, [username]);

    return { data, error };

}

const useGetUser = (username) => {
    const [user, setUser] = useState(null);
    const [errorUser, setErrorUser] = useState(false);

    useEffect(() => {
        setErrorUser(null);
        const fetchData = async () => {
            try {
                const res = await instance.get(`users/${username}`, {
                    headers: {
                        "Authorization": `${githubToken ? "token " + githubToken : ''}`
                    }
                });
                setUser(res.data)
            } catch (e) {
                setErrorUser(e.response);
            }
        }
        fetchData();

    }, [username]);

    return { user, errorUser };
}

export { useGetSearch, useGetRepos, useGetRepo, useGetUser };