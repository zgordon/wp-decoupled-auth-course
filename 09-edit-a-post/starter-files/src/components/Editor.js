// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { render as Notice } from "./Notice.js";

// Import configs
import { state, setState } from "../state";
import { getEl, isRendered } from "../helpers.js";
import { save, update } from "../crud";
import { primary, main, editor, editorTitle, editorContent } from "../config";

/**
 * render - Displays the editor on the page
 *
 * @export
 * @returns
 */
export function render() {
  // Make sure user is logged in or editor is not already rendered
  if (state.loggedIn === false || isRendered(editor)) {
    return;
  }

  // Setup the editor form
  const form = document.createElement("form");
  form.id = editor;
  form.innerHTML = `
  <h3 class="add-new-post">Add New Post</h3>
  <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
  <div id="content-editor"></div>
  <p><button class="button">Save</button></p>
  `;

  // Add the login form to the page
  getEl(primary).insertBefore(form, getEl(main));

  // Initialize the quill editor
  var quill = new Quill(`#${editorContent}`, {
    theme: "snow"
  });

  // Add listener to process the form
  getEl(editor).addEventListener("submit", process);
}

/**
 * Processes the saving or updating of the form
 *
 * @export
 * @param {Object} event Event object
 */
export function process(event) {
  // Get the Quill editor
  const quillEditor = Quill.find(getEl(editorContent));
  // Setup post object to save with updated content
  const post = {
    // Get the editor title
    title: getEl(editorTitle).value,
    // Get the editor content
    content: quillEditor.root.innerHTML,
    // Set the status to publish
    status: "publish"
  };

  // Prevent default even behavior
  event.preventDefault();

  // Quick and dirty validation
  if (!post.title || !post.content) {
    Notice.render("required");
    return;
  }

  save(post);
}

/**
 * clear - Clear the data from the editor form
 *
 * @export
 */
export function clear() {
  // Set the editor title field to empty
  getEl(editorTitle).value = "";
  // Get the Quill editor
  const quillEditor = Quill.find(getEl(editorContent));
  // Clear the editor content
  quillEditor.root.innerHTML = "";
  // Set the form method back to post
  setState("editorPost", null);
}
