# Handle Authentication

In this step we will setup the JWT authentication with WordPress

## To Do

Step 1: Setup State, Config and index.html

- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open `src/state.js` and add `token` to the state with a value of "wp-token" and `loggedIn` with a value of `false`
- Open `src/config.js` and add `export const loginBtn = "login-button";` and `export const loginBtn = "login-button";` for our login and logout buttons
- Open the `index.html` file and add the following inside the side bar
```
<p><button id="login-button" class="button submit" type="button">Login</button></p>
<p><button id="logout-button" class="button submit" type="button">Logout</button></p>
```

Step 2: Setup Authentication.js

- Create a `Authentication.js` file inside `src/components/` 
- Open the `Authentication.js` file
- Import the following:
```
// Import libraries
import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

// Import components
import { init as Posts } from "./Posts.js";

// Import configs
import { state, setState } from "../state";
import { getEl } from "../helpers.js";
import { loginBtn, logoutBtn } from "../config";
```

Step 3: Setup Authentication init()
- Create a function called `init()` that also gets exported
- Inside of it, write a conditional statement to see if `Cookies.get(state.token)` is equal to `undefined`
- Console log "Logged out" if it is undefined and "Logged in" if it is not undefined
- We will come back to this later and add more

Step 4: Setup login()
- Create a function called `login()`
- Inside the function set the state for `loggedIn` to `true`
- Then selet the login button `getEl(loginBtn)` and add a class of `hidden`
- Then selet the logout button `getEl(logoutBtn)` and remove the class of `hidden`
- Finally, call `Posts()` to initialize and render the posts again

Step 5: Setup logout()
- Create a function called `lgout()`
- Inside the function set the state for `loggedIn` to `false`
- Then selet the login button `getEl(loginBtn)` and remove the class of `hidden`
- Then selet the logout button `getEl(logoutBtn)` and add the class of `hidden`
- Finally, call `Posts()` to initialize and render the posts again

Step 6: Create initLog()
- Create a function called `initLogin()`
- Add an event listener to the login button `getEl(loginBtn)`
- Inside the event handler, prevent default
- Then setup an object called `creds` with a property of `username` and `password` where you will (for now) hardcode in the username and password for the WordPress site you're accessing

Step 7: Making Authentication Request
- Inide of the `initLogin()` function make an axios call with the following configurations:
     - `method: post`
     - `url: state.restUrl + "jwt-auth/v1/token"`
     - `data: formurlencoded(creds)`
     - `headers: { "Content-Type": "application/x-www-form-urlencoded" }`
- Then inside the response check that `response.status` is `200`
- If it is, use `Cookies.set()` with `state.token` as the first parameter and `response.data.token` as the second parameter
- As the third parameter pass an object like this `{expires: 1, secure: true}` to set a secure cookie
- Finally, call the `init()` function again 

Step 8: Create initLogout()
- Create a function called `initLogout()`
- Inside of it, add an event listeners to the logout form `getEl(logoutBtn)`
- Have the listener prevent default
- Then clear the cookies with the following line: `Cookies.remove(state.token, { secure: true });`
- Finally call `init()` again

Step 9: Preventing multiple event listeners *
- To prevent multiple event listeners with this show / hide login approach clone the login or logout button and replace the current one on the page with a clone that won't have event listeners
- This will not be necessary once we add actual login / logout forms

Step 10: Complete `init()` function
- Go back to the `init()` function
- Remove the console logs
- If the Cookie is undefined, call `logout()` and then `initLogin()`, finally log out the current state of `loggedIn`
- If the Cookie is not undefined, call `login()` and then `initLogout()`, once again out the current state of `loggedIn`

Step 11: Initializing Authentication from `index.js`
- Import `init` as `Authentication` from `Authentication.js`
- Before the `Header()` call `Authentication()`

This exercise should add event listeners to a login and logout button that handles authenticating with WordPress.

Look in the console to check the state of whether use is currently authenticated.