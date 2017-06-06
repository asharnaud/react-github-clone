import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import token from './_token.js'

function gitHubInfo (user) {
  const githubToken = 'access_token='+ token
  const githubUrl = 'https://api.github.com/users/'
  const userName = user
  const url = githubUrl + userName + '?' + githubToken
  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      appState.userdata = JSON.parse(request.responseText);
      appState.user = user
      appState.isLoading = false
      renderNow()
    } else {
      appState.isLoading = false
      appState.userData = null
      renderNow()
    }
  };

  request.onerror = function() {
    appState.isLoading = false
    appState.userData = null
    renderNow()
  };
  request.send();
}

gitHubInfo('asharnaud')

const initialState = {
  isLoading: true,
  userdata: {},
  user: ''
}

let appState = initialState

function App (props) {
  return (
        <div>
          {Header(props)}
          {Body(props)}
          {Footer(props)}
        </div>
      )
}

function Header (props) {
  return <div className="header">
          <p> <img src="http://octodex.github.com/images/stormtroopocat.png" alt="octocat"></img>Github Clone</p>
        </div>
}

function Body (props) {
  if (props.userData === null) {
    return (
      <div className='body'>
        <img className="error-img" src='https://cdn.meme.am/cache/instances/folder204/500x/78118204/stop-like-man-dont-freak-out-just-reload-try-another-user.jpg'alt="error meme"/>
      </div>
    )
  }
  return (
    <div className="body">
            <img className="img-circle" src={props.userdata.avatar_url} alt="user profile"></img>
            <h2 className="feature-heading">{props.userdata.name}</h2>
            <p className="feature-paragraph">{props.userdata.location}</p>
            <p className="feature-paragraph">Following: {props.userdata.following} Followers: {props.userdata.followers}</p>
            <p className="feature-paragraph">{props.userdata.bio}</p>
            {SearchUser(props)}
    </div>
  )
}

function pressEnterFn (key) {
    if (key.charCode === 13) {
      searchInput(key)
      clickSearchBtn()
   }
 }

function searchInput (evt) {
  appState.user = evt.target.value
}

function clickSearchBtn () {
  gitHubInfo(appState.user)
}

function SearchUser (props) {
  return (
    <div className="search">
      Username
      <input className="user-input" type="text" onChange={searchInput} onKeyPress={ pressEnterFn } name="username" />
      <button onClick={clickSearchBtn}>Search</button>
    </div>
  )
}

function Footer (props) {
  console.log(props.userdata.url)
  return <div className="footer">
          <a href={props.userdata.html_url}>Github</a>
          <a href={props.userdata.blog}>Blog</a>
          <a href={props.userdata.email}>{props.userdata.email}</a>
        </div>
}


function renderNow () {
  console.log(appState);
  ReactDOM.render(App(appState), document.getElementById('root'));
}
