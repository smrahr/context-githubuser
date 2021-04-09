import React , {createContext, useContext} from 'react'
import  Spinner  from '../Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/githubContext'

const Users = (props) => {
    const githubContext = useContext(GithubContext)
    const {loading, users} = githubContext

    if (loading) {
        return <Spinner />;
    }else{
        return (
            <div style={usersStyle}>
                {
                    users.map((user)=> <UserItem key={user.id} user={user} />)
                }
                
            </div>
        )
    }    
}

const usersStyle = {
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent : 'space-between'
}



export default Users
