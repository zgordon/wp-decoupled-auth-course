// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components/Editor";
import { render as Notice } from "./components/Notice";
import { init as Posts } from "./components/Posts";

// Import configs
import { state } from "./state";

/**
 * Saves a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function save(post) {
  // Get the token for an authorized request
  const token = Cookies.get(state.token);
  // Save post
  axios({
    // Setup method
    method: "post",
    // Setup rest url
    url: state.restUrl + "wp/v2/posts",
    // Setup the post object to send
    data: post,
    //  Setup headers with auth token
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      // Clear the editor
      clearEditor();
      // Load notice
      Notice("saved");
      // Reload the latest posts
      Posts();
    })
    .catch(error => {
      console.error(error);
    });
}

/**
 * Updates a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function update(post) {
  // Get the token for an authorized request
  const token = Cookies.get(state.token);
  // Update existing post
  axios({
    // Set method to put
    method: "put",
    // set the URL with the current post id
    url: state.restUrl + "wp/v2/posts/" + post.id,
    // Set the post data object to send
    data: post,
    // Set the headers
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      // Clear the editor
      clearEditor();
      // Load a notice post is updated
      Notice("updated");
      // Reload the posts
      Posts();
    })
    .catch(error => {
      console.error(error);
    });
}
export function deletePost(post) {
  // Confirm that user wants to delete post
  const confirm = window.confirm(`Delete Post: "${post.title.rendered}"`);
  // Get the token for making an authenticated request
  const token = Cookies.get(state.token);

  // If user confirms delete then proceed
  if (true === confirm) {
    // Setup the API request
    axios({
      // Set method to delete
      method: "delete",
      // Setup the URL for the post to delete
      url: state.restUrl + "wp/v2/posts/" + post.id,
      // Setup headers for authenticated request
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        // Clear the editor
        clearEditor();
        // Display delete notice
        Notice("deleted");
        // Load the updated list of posts
        Posts();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
