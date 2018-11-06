// Import libraries
import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

// Import components
import { init as Posts } from "./Posts.js";
import { render as LoginForm } from "./LoginForm.js";
import { render as LogoutForm } from "./LogoutForm.js";
import { render as Editor } from "./Editor.js";

// Import configs
import { state, setState } from "../state";
import { getEl, removeEl } from "../helpers.js";
import { loginForm, logoutForm, editor, username, password } from "../config";

/**
 * Kicks off the authentication process
 *
 * @export function
 */
export function init() {
  // Check cookie to see if already authenticated
  if (Cookies.get(state.token) === undefined) {
    // Run logout tasks since not authenticated
    logout();
    // Setup the login process to be possible
    initLogin();
  } else {
    // Run login tasks since authenticated
    login();
    // Setup the logout process to be possible
    initLogout();
  }
}

/**
 * Handles the login process
 *
 * @export function
 */
export function login() {
  // Set the loggedIn statis to true
  setState("loggedIn", true);
  // Toggle login/logout forms
  removeEl(loginForm);
  LogoutForm();
  // Load editor
  Editor();
  // Init and render posts
  Posts();
}

/**
 * Handles the logout process
 *
 * @export function
 */
export function logout() {
  // Set the loggedIn statis to false
  setState("loggedIn", false);
  // Toggle login/logout forms
  removeEl(logoutForm);
  LoginForm();
  // Init and render posts
  removeEl(editor);
  Posts();
}

/**
 * Setup the login process including login event handler
 *
 * @export function
 */
export function initLogin() {
  // Setup event listener for login form
  getEl(loginForm).addEventListener("submit", event => {
    // Prevent form submission
    event.preventDefault();
    // Get username and password from form
    const creds = {
      username: getEl(username).value,
      password: getEl(password).value
    };
    // Make request to authenticate
    axios({
      method: "post",
      // Set the URL to authentication endpoint
      url: state.restUrl + "jwt-auth/v1/token",
      // Make sure form data is encoded properly
      data: formurlencoded(creds),
      // Set the post headers for encoded form data
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        // Check to see response comes back approved
        if (200 === response.status) {
          // Set a secure cookie with the authentication token
          Cookies.set(state.token, response.data.token, {
            expires: 1,
            secure: true
          });
          // Kick off the authentication check again
          init();
        } else {
          // Executed when response code is not 200
          alert("Login failed, please check credentials and try again!");
        }
      })
      .catch(error => {
        // Also log the actual error
        console.error(error);
      });
  });
}

/**
 * Setup the logout process
 *
 * @export function
 */
export function initLogout() {
  // Setup event listeners for logout form
  getEl(logoutForm).addEventListener("click", event => {
    // Prevent logout form from submitting
    event.preventDefault();
    // Remove the auth token cookie
    Cookies.remove(state.token, { secure: true });
    // Restart the authentication flow
    init();
  });
}
