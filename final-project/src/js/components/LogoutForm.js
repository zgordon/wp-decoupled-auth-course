// Import configs
import { getEl, state, sidebarId, logoutFormId, logoutBtnId } from "../config";

/**
 * LogoutForm - Handles the logout form
 *
 * @export
 * @class LogoutForm
 */
export default class LogoutForm {
  /**
   * render - Display the logout form
   *
   * @static
   * @returns
   * @memberof LogoutForm
   */
  static render() {
    // Make sure logged in and form is not already rendered
    if (state.loggedIn === false || LogoutForm.isRendered()) {
      return;
    }
    // Setup the logout form
    const form = document.createElement("form");
    form.id = logoutFormId;
    form.method = "post";
    form.innerHTML = `<button id=${logoutBtnId} class="button submit" type="button">
            Logout
        </button>
    `;
    // Add the form to the page
    getEl(sidebarId).appendChild(form);
  }
  /**
   * remove - Remove the logout form from the page
   *
   * @static
   * @memberof LogoutForm
   */
  static remove() {
    // If form is rendered, remove it from the page
    if (LogoutForm.isRendered()) getEl(logoutFormId).remove();
  }
  /**
   * isRendered - Tells if logout form is currently rendered to the page
   *
   * @static
   * @returns
   * @memberof LogoutForm
   */
  static isRendered() {
    // Return the form if it exists
    return getEl(logoutFormId);
  }
}
