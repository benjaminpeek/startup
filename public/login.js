"use strict";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", e => {
    if (loginForm.checkValidity()) {
        e.preventDefault();
        // loginOrCreate(`/api/auth/create`);
        
        if (localStorage.getItem("loginChosen") === 'true') {
            loginOrCreate(`/api/auth/login`);
        }
        else if (localStorage.getItem("createChosen") === 'true') {
            loginOrCreate(`/api/auth/create`);
        }
    }
        
    else {
        loginForm.reportValidity();
    }
});

async function loginUser() {
    console.log("login chosen");
    localStorage.setItem("loginChosen", true);
    localStorage.setItem("createChosen", false);
    // loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    console.log("create chosen");
    localStorage.setItem("createChosen", true);
    localStorage.setItem("loginChosen", false);
    // loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName').value;
    const userEmail = document.querySelector('#userEmail').value;
    const userPassword = document.querySelector('#userPassword').value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    console.log("got past fetch, but did it work?");

    if (response.ok) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);
      sessionStorage.setItem("loggedIn", true);
      window.location.href = 'profile.html';
    } else {
      const body = await response.json();
      console.log(body);
    }
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
}

  // Functionality for peer communication using WebSocket

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = () => {
      displayMsg('connected');
    };
    socket.onclose = () => {
      displayMsg('disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data);
      displayMsg(msg);
    };

    return socket;
  }

  function displayMsg(msg) {
    const userCount = document.querySelector('#user-count-text');
    userCount.innerText = "users on the site currently: " + msg;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }

  let socket = configureWebSocket();