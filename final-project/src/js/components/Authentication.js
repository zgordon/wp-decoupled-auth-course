// Import libraries
import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

// Import components
import Editor from "./Editor.js";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import Notice from "./Notice.js";
import Posts from "./Posts.js";

// Import configs
import {
  getEl,
  tokenCookie,
  rest_url,
  setLoggedIn,
  logoutBtnId,
  loginBtnId,
  usernameId,
  passwordId
} from "../config";

/**
 * Authentication - Handles the logging in and out of WordPress site with JWT
 *
 * @export
 * @class Authentication
 */
export default class Authentication {
  /**
   * init - Kicks off the authentication process
   *
   * @static
   * @memberof Authentication
   */
  static init() {
    // Check cookie to see if already authenticated
    if (Cookies.get(tokenCookie) === undefined) {
      // Run logout tasks since not authenticated
      Authentication.onLogout();
      // Setup the login process to be possible
      Authentication.initLogin();
    } else {
      // Run login tasks since authenticated
      Authentication.onLogin();
      // Setup the logout process to be possible
      Authentication.initLogout();
    }
  }

  /**
   * onLogin - Handles the login process
   *
   * @static
   * @memberof Authentication
   */
  static onLogin() {
    // Set the logged_in statis to true
    setLoggedIn(true);
    // Make sure to remove the login form
    LoginForm.remove();
    // Display the editor
    Editor.render();
    Posts.init();
  }

  /**
   * onLogout - Handles the logout process
   *
   * @static
   * @memberof Authentication
   */
  static onLogout() {
    // Set the logged_in statis to false
    setLoggedIn(false);
    // Remove the editor
    Editor.remove();
    // Remove the logout form
    LogoutForm.remove();
    Posts.init();
  }

  /**
   * initLogin - Setup the login process including event handlers
   *
   * @static
   * @memberof Authentication
   */
  static initLogin() {
    // Display the login form
    LoginForm.render();
    // Setup event listener for login form
    getEl(loginBtnId).addEventListener("click", function(event) {
      // Get username and password from form
      const creds = {
        username: getEl(usernameId).value,
        password: getEl(passwordId).value
      };
      // Prevent form submission
      event.preventDefault();
      if (!creds.username || !creds.password) {
        Notice.render("required");
        return;
      }
      // Make request to authenticate
      axios({
        method: "post",
        // Set the URL to authentication endpoint
        url: rest_url + "jwt-auth/v1/token",
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
            Cookies.set(tokenCookie, response.data.token, {
              expires: 1,
              secure: true
            });
            // Kick off the authentication process again
            Authentication.init();
          } else {
            // Executed when response code is not 200
            alert("Login failed, please check credentials and try again!");
          }
        })
        .catch(error => {
          // Display a notice that login auth did not work
          Notice.render("failed");
          // Also log the actual error
          console.error(error);
        });
    });
  }

  /**
   * initLogout - Setup the logout process
   *
   * @static
   * @memberof Authentication
   */
  static initLogout() {
    // Display the logout form
    LogoutForm.render();
    // Setup event listeners for logout form
    getEl(logoutBtnId).addEventListener("click", function(event) {
      // Prevent logout form from submitting
      event.preventDefault();
      // Remove the auth token cookie
      Cookies.remove(tokenCookie, { secure: true });
      // Restart the authentication flow
      Authentication.init();
    });
  }
}
