import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
// import JSON from './ash.json'
import token from './_token.js'
// let myOBJ = JSON
// console.log(myOBJ);
let myOBJ = ''

function gitHubInfo () {
  const githubToken = 'access_token='+ token
  const githubUrl = 'https://api.github.com/users/'
  const userName = 'asharnaud'
  const url = githubUrl + userName + '?' + githubToken
  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      myOBJ = JSON.parse(request.responseText);
      renderNow()
    } else {
      // We reached our target server, but it returned an error
      console.log('The user information was not retrieved.')
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
}

gitHubInfo()

const initialState = {
  isLoading: true,
  username: '',
  userdata: {}
}

let appState = initialState

function App (props) {
  // console.log(props)
  return (
        <div>
          {Header(props)}
          {Body(props)}
          {Footer(props)}
        </div>
      )
}

function Header (props) {
  console.log(props)
  return <div className="header">
          <p> <img src="http://octodex.github.com/images/stormtroopocat.png"></img>Github Clone</p>
        </div>
}

function Body (props) {
  return <div className="body">
          <img src={props.avatar_url}></img>
          <p>{props.name}</p>
          <p>{props.location}</p>
          <p>Following {props.following} Followers {props.followers}</p>
          <p>{props.bio}</p>
        </div>
}

function Footer (props) {
  return <div className="footer">
          <p>github: {props.url}</p>
          <p>email: {props.email}</p>
          <p>blog: {props.blog}</p>
        </div>
}

function renderNow () {
  ReactDOM.render(App(myOBJ), document.getElementById('root'));
}
