// Import configs
import { state } from "../state";
import { getEl, isRendered } from "../helpers.js";
import { sidebar, logoutForm } from "../config";

/**
 * Display the logout form
 *
 * @export function
 * @returns
 */
export function render() {
  // Make sure logged in and form is not already rendered
  if (state.loggedIn === false || isRendered(logoutForm)) {
    return;
  }
  // Setup the logout form
  const form = document.createElement("form");
  form.id = logoutForm;
  form.innerHTML = `
    <button class="button submit">
      Logout
    </button>
  `;
  // Add the form to the page
  getEl(sidebar).appendChild(form);
}
