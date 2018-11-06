// Import configs
import { wrapper, message as messageEl } from "../config";
import { getEl, createEl, removeEl } from "../helpers";

/**
 * Renders a notice on the page
 *
 * @export
 * @param {string} type The type of message to display
 * @returns
 */
export function render(type) {
  // Setup notice messages
  const messages = {
    saved: "This post has been saved!",
    loggedin: "Welcome! You are logged in!",
    loggedout: "Welcome! You are logged in!",
    updated: "This post has been updated!",
    required: "All fields are required!",
    failed: "This action failed :(",
    deleted: "This post has been deleted!"
  };

  // Setup the notice markup
  const message = createEl("div");
  message.id = messageEl;
  message.classList.add(type);
  message.innerHTML = `<p>${messages[type]}</p>`;

  // If there is already a notice rendered, remove it
  removeEl(messageEl);

  // Get the container for the page
  const container = getEl(wrapper);
  container.insertBefore(message, container.childNodes[0]);

  setTimeout(() => {
    removeEl(messageEl);
  }, 1600);
}
