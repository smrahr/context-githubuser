import React, { useReducer } from 'react'
import axios from 'axios'
import githubReducer from './githubReducer'
import githubContext from './githubContext';
import {SEARCH_USERS, GET_USERS, CLEAR_USERS, GET_REPOS, SET_LOADING, SET_ALERT, REMOVE_ALERT} from '../Types';

const GithubState = props =>{
    const initialState={
        users :[],
        user :{},
        repos :[],
        loading :false,
        alert: null
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);
    const setLoading = ()=>dispatch({type:SET_LOADING})

    const searchUser = async(text) => {
        setLoading();
        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_sECRET}`)
        dispatch({type:SEARCH_USERS , payload: response.data.items})
      }

    const clearUsers = (e) => dispatch({type: CLEAR_USERS})


    const getUser = async(username) => {
        setLoading();
        const response = await axios.get(`https://api.github.com/users/${username}?client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_sECRET}`)
        dispatch({type:GET_USERS , payload: response.data})
    }


    const getUserRepos = async (username) => {
        setLoading();
        const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({type:GET_REPOS , payload: response.data} )    
    };


    const setAlert = (msg , type) => {
        dispatch({type: SET_ALERT, payload:{msg , type}})
        setTimeout(()=>dispatch({type:REMOVE_ALERT}) , 4000)
      }

    
    








    return (
        <githubContext.Provider
        value={
            {
                users : state.users,
                user : state.user,
                repos :state.repos,
                loading :state.loading,
                alert : state.alert,
                searchUser,
                clearUsers,
                getUser,
                getUserRepos,
                setAlert
            }
        }>
            {props.children}
        </githubContext.Provider>
    )

}
export default GithubState;