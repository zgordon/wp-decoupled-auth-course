// Import components
import Editor from "./Editor";
import Posts from "./Posts";
import Delete from "./Delete";

// Import configs
import { getEl, rest_url, logged_in, mainId, backBtnId } from "../config";

/**
 * Post - Handles the displaying of single post views
 *
 * @export
 * @class Post
 */
export default class Post {
  /**
   * render - Displays a post on the page
   *
   * @static
   * @param {Object} post - Takes a post object
   * @param {boolean} [singleView=false] - If displaying in a single post view [true] vs a listing view [false]
   * @memberof Posts
   */
  static render() {
    const {
      id,
      title: { rendered: title },
      content: { rendered: content }
    } = this;

    // Setup the post article element
    const article = document.createElement("article");
    article.classList.add("post");
    // article.dataset.id = id;
    article.innerHTML = `
      <p><a id="${backBtnId}" href="#">&lt; Back to Posts</a></p>
      <h1 class="entry-title">${title}</h1>
      <div class="entry-content">${content}</div>
    `;
    // Clear the posts from the page
    Posts.clear();

    // Attach event listeners to back button
    article
      .querySelector(`#${backBtnId}`)
      .addEventListener("click", Posts.init, false);

    // If logged in, display edit and delete links
    if (logged_in) {
      article.append(
        Post.getEditLink.call(this),
        Post.getDeleteLink.call(this)
      );
    }

    // Append the post to the page
    getEl(mainId).append(article);
  }

  /**
   * getEditLink - Gets the markup and event listener for the edit post link
   *
   * @static
   * @returns {HTMLElement} link - The edit post link
   * @memberof Posts
   */
  static getEditLink() {
    // Setup the edit link
    const link = document.createElement("a");
    link.href = "#edit-post";
    link.classList.add("edit");
    link.innerText = "Edit";
    // Add event listener for the post edit link
    link.addEventListener("click", Editor.loadPost.bind(this));

    // Return the link element
    return link;
  }

  /**
   * getDeleteLink - Gets the markup and event listener for the delete post link
   *
   * @static
   * @returns {HTMLElement} link - The delete post link
   * @memberof Posts
   */
  static getDeleteLink() {
    // Setup the delete link
    const link = document.createElement("a");
    link.href = "#delete-post";
    link.innerText = "Delete";
    link.classList.add("delete-post");

    // Add the event listener to delete the post
    link.addEventListener("click", Delete.post.bind(this));

    // Return the delete link
    return link;
  }

  /**
   * clear - Clears the posts from the main content area
   *
   * @static
   * @memberof Posts
   */
  static clear() {
    // Set the inner html of the main content area to emptu=y==y
    getEl(mainId).innerHTML = "";
  }
}
