# Add Login Form

In this step we will add a login form to the site

## To Do

Step 1: Setup the Config and index.html
- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open the `config.js` file and add the following exports
```
export const loginForm = "login-form";
export const username = "login-username";
export const password = "login-password";
```
- Open the `index.html` file and add the following inside the side bar
```
<p><button id="logout-button" class="button submit" type="button">Logout</button></p>
```

Step 2: Create the Login Form
- Create a file called "LoginForm.js" inside of "./components"
- Import the following:
```
import { state } from "../state";
import { getEl, createEl } from "../helpers.js";
import { sidebar, loginForm, username, password } from "../config";
```

Step 3: Create the Login Form render()
- Create a `render()` function
- Write a conditional statement to check if loggedIn is true or isRendered(loginForm) is true.  If either are, return and exit the function.
- Create a form with the following markup and append it inside the sidebar `getEl(sidebar)`

Step 4: Setting up Authentication.js
- Open `Authentication.js`
- Import `render` as `LoginForm` from `LoginForm.js`
- Make sure to import `loginForm` from `config.js`
- You will no longer need `loginBtn` from `config.js`

Step 5: Add and Remove Login Form
- Inside of the `login()` function call `removeEl(loginForm)` after setting state
- Inside of the `logout()` function call `LoginForm()` after setting the state
- Then update `initLogin()` to add the event listener to the `logoutForm` and change the type from `click` to `submit`


Step 6: Getting credentials from Login Form
- Replace the hard coded username and password creds inside the `initLogin()`
- To get the title you can use `getEl(username).value`
- To get the content you can use `getEl(username).value`

This exercise should replace the login button from the last exercise with a login form that allows a user to add their login credentials and authenticate.