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

/**
 * Kicks off the authentication process
 *
 * @export function
 */
export function init() {
  // Check cookie to see if already authenticated
  if (Cookies.get(state.token) === undefined) {
    // Run logout tasks since not authenticated
    lougout();
    // Setup the login process
    initLogin();
  } else {
    // Run login tasks since authenticated
    login();
    // Setup the logout process
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
  console.log(state.loggedIn);
  // Toggle login/logout forms
  getEl(loginBtn).classList.add("hidden");
  getEl(logoutBtn).classList.remove("hidden");
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
  console.log(state.loggedIn);
  // Toggle login/logout forms
  getEl(loginBtn).classList.remove("hidden");
  getEl(logoutBtn).classList.add("hidden");
  // Init and render posts
  Posts();
}

/**
 * Setup the login process including login event handler
 *
 * @export function
 */
export function initLogin() {
  // Replace login button with a clone to remove event listeners
  const prevLogin = getEl(loginBtn);
  const newLogin = prevLogin.cloneNode(true);
  prevLogin.parentNode.replaceChild(newLogin, prevLogin);

  // Setup event listener for login form
  newLogin.addEventListener("click", event => {
    // Prevent form submission
    event.preventDefault();
    // Let us know we're logging in
    console.log("Logging in...");
    // Get username and password from form
    const creds = {
      username: "yourusername",
      password: "yourpassword"
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
          console.log("Logged in");
          // Kick off the authentication process again
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
  // Replace logout button with a clone to remove event listeners
  const prevLogout = getEl(logoutBtn);
  const newLogout = prevLogout.cloneNode(true);
  prevLogout.parentNode.replaceChild(newLogout, prevLogout);

  // Setup event listeners for logout form
  newLogout.addEventListener("click", event => {
    // Prevent logout form from submitting
    event.preventDefault();
    // Let us know we're logging out
    console.log("Logging out..");
    // Remove the auth token cookie
    Cookies.remove(state.token, { secure: true });
    // Let us know we're logged out
    console.log("Logged out");
    // Restart the authentication flow
    init();
  });
}
