// Import components
import Posts from "./Posts";

// Import configs
import { getEl, rest_url, mainId, backBtnId } from "../config";

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
   * @memberof Post
   */
  static render() {
    console.log(this);
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

    // Append the post to the page
    getEl(mainId).append(article);
  }
}
