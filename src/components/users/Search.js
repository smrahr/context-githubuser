import React, { useState , useContext } from 'react'
import GithubContext from '../../context/github/githubContext'

const Search = (props) => {

    // state = {
    //     text: '',
    //   };
    const githubContext = useContext(GithubContext)
    const {clearUsers}= githubContext
    const [text , setText] =useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
          githubContext.setAlert('Please enter something', 'light');
        } else {
          githubContext.searchUser(text);
          setText('');
        }
      };

    // const handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    const handleChange = (e) => setText(e.target.value);
    // const {showClear , clearUsers} = props;
        return (
            <div>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='text' name='text' placeholder='Search Users...' value={text} onChange={handleChange} autoComplete='off' />
                    {/* <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChangeHandler} autoComplete="off" /> */}
                    <input type='submit' className='btn btn-block btn-dark'/>
                </form>
                {githubContext.users.length > 0 && <button className='btn btn-block btn-light' onClick={clearUsers}>clear</button>}                
            </div>
        )
    
}

export default Search
