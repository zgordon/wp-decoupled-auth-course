// Import configs
import { getEl, wrapperId } from "../config";

/**
 * Notice - Controls the messages displayed to page as notices
 *
 * @export
 * @class Notice
 */
export default class Notice {
  /**
   * render - Displays a notice on the page
   *
   * @static
   * @param {String} type The type of message to display: saved | updated | deleted
   * @memberof Notice
   */
  static render(type) {
    // Setup notice messages
    const messages = {
      saved: "This post has been saved!",
      loggedin: "Welcome! You are logged in!",
      updated: "This post has been updated!",
      required: "All fields are required!",
      failed: "This action failed :(",
      deleted: "This post has been deleted!"
    };

    // Setup the notice markup
    const message = document.createElement("div");
    message.id = "message";
    message.classList.add(type);
    message.innerHTML = `<p>${messages[type]}</p>`;

    // If there is already a notice rendered, remove it
    this.remove();

    // Get the container for the page
    const container = getEl(wrapperId);
    container.insertBefore(message, container.childNodes[0]);

    setTimeout(() => {
      getEl("message").remove();
    }, 1600);
  }
  /**
   * remove - Remove the login form from the page
   *
   * @static
   * @memberof Notice
   */
  static remove() {
    // If the login form is rendered, remove it
    if (this.isRendered()) getEl("message").remove();
  }
  /**
   * isRendered - Checks if a message is currently rendered
   *
   * @static
   * @returns
   * @memberof Notice
   */
  static isRendered() {
    // Return the message if rendered
    return getEl("message");
  }
}
