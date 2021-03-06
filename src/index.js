import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import token from './_token.js'

const initialState = {
  userdata: {},
  user: ''
}

let appState = initialState

function fetchGitHubInfo (user) {
  if (user === '') {
    return
  }
  const githubToken = encodeURIComponent('access_token='+ token)
  const githubUrl = 'https://api.github.com/users/'
  const username = user
  const fullUrl = githubUrl + username + '?' + githubToken
  let request = new XMLHttpRequest()
  request.open('GET', fullUrl, true)
    request.onload = function validateJson(jsonData) {
      jsonData = request.responseText
      if (request.status >= 200 && request.status < 400) {
      try {
        appState.userdata = JSON.parse(jsonData)
      }
      catch(error) {
        console.log("Error in the data")
        console.log(error)
        appState.userdata = null
        appState.user = null

      }
    } else {
        appState.userdata = null
        appState.user = null
      }
  }
  request.send()
}

fetchGitHubInfo('asharnaud')
appState.user = ''

function App (props) {
  return (
        <div>
          {Header()}
          {Body(props)}
          {Footer(props.userdata)}
        </div>
      )
}

function Header () {
  return <div className="header">
          <p> <img src="http://octodex.github.com/images/stormtroopocat.png" alt="octocat"/>Github Clone</p>
        </div>
}

const NOT_FOUND_IMG_SRC = "https://cdn.meme.am/cache/instances/folder204/500x/78118204/stop-like-man-dont-freak-out-just-reload-try-another-user.jpg"

function Body (props) {
  if (props.userdata) {
  return MainText(props)
  } else {
    return ErrorMessage()
  }
}

function MainText (props) {
  return (
    <div className="body">
      <img className="img-circle" src={props.userdata.avatar_url} alt="user profile" />
        <div className="body-wrapper">
          <h2 className="feature-heading">{props.userdata.name}</h2>
            <p className="feature-paragraph">{props.userdata.location}</p>
            <p className="feature-paragraph">Following: {props.userdata.following} Followers: {props.userdata.followers}</p>
            <p className="feature-paragraph">{props.userdata.bio}</p>
            {SearchUser(props.user)}
        </div>
    </div>
  )
}

function ErrorMessage () {
    return (
      <div className='body'>
        <h1 className="feature-heading">USER NOT FOUND</h1>
        <img className="error-img" src={NOT_FOUND_IMG_SRC} alt="error meme" />
      </div>
    )
}

function onKeyPressSearchInput (key) {
    if (key.charCode === 13) {
      clickSearchBtn()
   }
 }

function onChangeSearchInput (evt) {
  appState.user = evt.target.value
}

function clickSearchBtn () {
  fetchGitHubInfo(appState.user)
}

function SearchUser (searchTxt) {
  return (
    <div className="search">
      <label>
        Username
      </label>
      <input className="user-input"
             onChange={onChangeSearchInput}
             onKeyPress={onKeyPressSearchInput}
             type="text"
             value={searchTxt} />
      <button onClick={clickSearchBtn}>Search</button>
    </div>
  )
}

function Footer (userdata) {
  if (userdata === null) {
    return
  }
  return <div className="footer">
          <a href={userdata.html_url} target="_blank">Github</a>
          <a href={userdata.blog} target="_blank">Blog</a>
          <a href={'mailto:' + userdata.email}>{userdata.email}</a>
        </div>
}

const rootEl = document.getElementById('root')

function renderNow () {
  ReactDOM.render(App(appState), rootEl)
  window.requestAnimationFrame(renderNow)
}

window.requestAnimationFrame(renderNow)
