// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import Notice from "./Notice";
import Posts from "./Posts";
import Editor from "./Editor";

// Import configs
import { tokenCookie, rest_url } from "../config";

/**
 * Delete - Handles the deleting of posts
 *
 * @export
 * @class Delete
 */
export default class Delete {
  /**
   * post - Handles the deleting of a post
   *
   * @static
   * @param {*} event The event object
   * @memberof Delete
   */
  static post(event) {
    // Get the title of post to delete
    const title = event.target.parentElement.querySelector(".entry-title")
      .innerText;
    // Get the ID of the post to delete
    // const id = event.target.parentElement.dataset.id;
    // Confirm that user wants to delete post
    const confirm = window.confirm(`Delete Post: "${title}"`);
    // Get the token for making an authenticated request
    const token = Cookies.get(tokenCookie);
    // Prevent form from submitting
    event.preventDefault();

    // If user confirms delete then proceed
    if (true === confirm) {
      // Setup the API request
      axios({
        // Set method to delete
        method: "delete",
        // Setup the URL for the post to delete
        url: rest_url + "wp/v2/posts/" + this.id,
        // Setup headers for authenticated request
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          // Display delete notice
          Notice.render("deleted");
          // Clear the editor
          Editor.clear();
          // Load the updated list of posts
          Posts.init();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
