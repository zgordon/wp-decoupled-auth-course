// Import configs
import { state } from "../state";
import { getEl, isRendered } from "../helpers";
import { save } from "../crud";
import { primary, main, editor, editorTitle, editorContent } from "../config";

/**
 * render - Displays the editor on the page
 *
 * @export
 */
export function render() {
  // Make sure user is logged in or editor is not already rendered
  if (state.loggedIn !== true || isRendered(editor)) {
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

  // Add listener to save button that calls save
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
    // Get the post id
    id: state.editorPost,
    // Get the editor title
    title: getEl(editorTitle).value,
    // Get the editor content
    content: quillEditor.root.innerHTML,
    // Set the status to publish
    status: "publish"
  };

  // Prevent default even behavior
  event.preventDefault();

  console.log(post);
  // Quick and dirty validation
  if (!post.title || !post.content) {
    alert("All fields required");
    return;
  }

  // Finally save the post
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
}
