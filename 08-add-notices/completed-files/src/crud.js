// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components./components/Editor";
import { render as Notice } from "./components/Notice";
import { init as Posts } from "./components/Posts";

// Import configs
import { state } from "../state";

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
