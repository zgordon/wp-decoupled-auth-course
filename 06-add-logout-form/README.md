# Add Logout Form

In this step we will add a logout form to the site dynamically

## To Do

Step 1: Setup the Config and index.html
- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open the `config.js` file and add the following `export const logoutForm = "logout-form";`

Step 2: Create the Logout Form
- Create a file called "Logout.js" inside of "./components"
- Import the following:
```
import { state } from "../state";
import { getEl, isRendered } from "../helpers.js";
import { sidebar, logoutForm } from "../config";
```

Step 3: Create the Logout Form render()
- Create a `render()` function
- Write a conditional statement to check if loggedIn is false or isRendered(logOut) is true.  If either are, return and exit the function.
- Create a form with the following markup and append it inside the sidebar `getEl(sidebar)`
```
<form id="${logoutForm}>
    <button class="button submit">
        Logout
    </button>
</form>
```

Step 4: Setting up Authentication.js
- Open `Authentication.js`
- Import `render` as `LogoutForm` from `LoginForm.js`
- Make sure to import `logoutForm` from `config.js`

Step 5: Add and Remove Login Form
- Inside of the `login()` function call `LogoutForm()` after removing the Login Form
- Inside of the `logout()` function remove the Logout Form with `removeEl(logoutForm);` before rendering the Login Form
- Then update `initLogout()` to add the event listener to the `logoutForm` and change the type from `click` to `submit`

This exercise should create a logout form via JavaScript rather than being hardcoded.  It will also remove the form when logged out.