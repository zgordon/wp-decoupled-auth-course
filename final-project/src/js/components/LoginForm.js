// Import configs
import { state } from "../state";
import {
  getEl,
  sidebarId,
  loginFormId,
  usernameId,
  passwordId
} from "../config";

/**
 * LoginForm - The login form and related actions
 *
 * @export
 * @class LoginForm
 */
export default class LoginForm {
  /**
   * render - Displays the LoginForm on the page
   *
   * @static
   * @returns
   * @memberof LoginForm
   */
  static render() {
    // Make sure logged out and form is not rendered already
    if (state.loggedIn === true || this.isRendered()) {
      return;
    }

    // Setup the login form
    const form = document.createElement("form");
    form.id = loginFormId;
    form.method = "post";
    form.innerHTML = `    
        <h3>Login</h3>
        <p><label for="username">Username:</label></p>
        <p><input id="${usernameId}" class="username" type="text" name="username" value=""></p>
        <p><label for="password">Password:</label></p>
        <p><input id="${passwordId}" class="password" type="password" name="password" value=""></p>
        <p><button id="login-button" class="button submit" type="button" name="">Login</button></p>
    `;

    // Add the form to the page
    getEl(sidebarId).appendChild(form);
  }
  /**
   * remove - Remove the login form from the page
   *
   * @static
   * @memberof LoginForm
   */
  static remove() {
    // If the login form is rendered, remove it
    if (LoginForm.isRendered()) getEl(loginFormId).remove();
  }
  /**
   * isRendered - Checks if the login form is currently rendered
   *
   * @static
   * @returns
   * @memberof LoginForm
   */
  static isRendered() {
    // Return the form if it is on the page
    return getEl(loginFormId);
  }
}
