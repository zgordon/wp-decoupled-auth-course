// Import configs
import { state } from "../state";
import { getEl, createEl, isRendered } from "../helpers.js";
import { sidebar, loginForm, username, password } from "../config";

/**
 * Displays the LoginForm on the page
 *
 */
export function render() {
  // Make sure logged out and form is not rendered already
  if (state.loggedIn === true || isRendered(loginForm)) {
    return;
  }

  // Setup the login form
  const form = createEl("form");
  form.id = loginForm;
  form.innerHTML = `    
    <h3>Login</h3>
    <p><label for="username">Username:</label></p>
    <p><input id="${username}" class="username" type="text" name="username" value=""></p>
    <p><label for="password">Password:</label></p>
    <p><input id="${password}" class="password" type="password" name="password" value=""></p>
    <p><button class="button submit">Login</button></p>
  `;

  // Add the form to the page
  getEl(sidebar).appendChild(form);
}
