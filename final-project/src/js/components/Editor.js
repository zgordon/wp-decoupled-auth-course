// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import Save from "./Save.js";

// Import configs
import {
  getEl,
  rest_url,
  tokenCookie,
  logged_in,
  primaryId,
  mainId,
  editorFormId,
  editorTitleId,
  editorContentId,
  editorBtn,
  editorPostId,
  setEditorPostId
} from "../config";

// Get the token for an authorized request
const token = Cookies.get(tokenCookie);

/**
 * Editor - Controls the add / edit post form
 *
 * @export
 * @class Editor
 */
export default class Editor {
  /**
   * render - Displays the editor on the page
   *
   * @static
   * @returns
   * @memberof Editor
   */
  static render() {
    // Make sure user is logged in or editor is not already rendered
    if (logged_in !== true || Editor.isRendered()) {
      return;
    }

    // Setup the editor form
    const form = document.createElement("form");
    form.id = editorFormId;
    form.innerHTML = `
      <h3 class="add-new-post">Add New Post</h3>
      <h3><input id="${editorTitleId}" type="text" name="title" placeholder="Enter title here" value=""></h3>
      <div id="content-editor"></div>
      <p><button id="${editorBtn}" class="button" type="button">Save</button></p>
    `;

    // Add the login form to the page
    getEl(primaryId).insertBefore(form, getEl(mainId));

    // Initialize the quill editor
    var quill = new Quill(`#${editorContentId}`, {
      theme: "snow"
    });

    // Add listener to save button that calls Save.post
    // getEl(editorBtn).removeEventListener("click", Save.edit);
    // Editor.clear();
    getEl(editorBtn).addEventListener("click", Save.post);
  }

  /**
   * loadPost - Populates the editor form with post data
   *
   * @static
   * @param {*} event The event object
   * @memberof Editor
   */
  static loadPost(event) {
    const post = this;
    // getEl(editorFormId).dataset.postId = post.id;
    setEditorPostId(post.id);
    // Prevent the form from edit link from submitting
    if (event) event.preventDefault();

    // Setup an authenticated request for posts
    axios
      .get(rest_url + "wp/v2/posts/" + post.id, {
        // Set context to edit to get raw post content for editing
        params: {
          context: "edit"
        },
        // Set headers for authenticated request
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        // Go back up to the edit form
        window.scrollTo(0, 50);
        getEl(editorFormId).method = "put";
        // Set the value of the post title input field
        getEl(editorTitleId).value = response.data.title.rendered;
        // Set the value of the post content from the editor
        const contentEditor = Quill.find(getEl(editorContentId));
        // Set the editor to receive the raw content for editing
        contentEditor.root.innerHTML = response.data.content.raw;
        // Make sure to bind the post to the save method
        // getEl(editorBtn).dataset.id = id;
      });
  }

  /**
   * clear - Clear the data from the editor form
   *
   * @static
   * @memberof Editor
   */
  static clear() {
    // Only proceed if the editor is rendered
    if (!Editor.isRendered()) return;
    // Set the editor title field to empty
    getEl(editorTitleId).value = "";
    // Get the Quill editor
    const editor = Quill.find(getEl(editorContentId));
    // Clear the editor content
    editor.root.innerHTML = "";
    // Set the form method back to post
    setEditorPostId(null);
  }
  /**
   * remove - Removes the editor from the page
   *
   * @static
   * @returns
   * @memberof Editor
   */
  static remove() {
    // Only proceed if the editor is rendered
    if (!Editor.isRendered()) return;
    // Remove the edit form
    // getEl(editorFormId).remove();
    getEl(editorFormId).outerHTML = "";
    // getEl(editorBtn).removeEventListener("click", Save.post);
  }
  /**
   * isRendered - Checks to see if editor form is rendered on the page
   *
   * @static
   * @returns {Boolean} True of false if editor is rendered
   * @memberof Editor
   */
  static isRendered() {
    // Return the form if it exists
    return getEl(editorFormId);
  }
}
