// Import libraries
import axios from "axios";

// Import components
import Post from "./Post";

// Import configs
import { state, setState } from "../state";
import { getEl, mainId } from "../config";

/**
 * Posts - Handles the displaying of posts
 *
 * @export
 * @class Posts
 */
export default class Posts {
  /**
   * init - get posts from the REST API
   *
   * @static
   * @param {*} event - The event object
   * @memberof Posts
   */
  static init(event) {
    // If coming from an event, prevent default behavior
    if (event) event.preventDefault();

    // Make API request with Axios
    axios
      // Set the url to request posts
      .get(state.restUrl + "wp/v2/posts", {
        params: {
          // Set number of posts to get
          per_page: 5
        }
      })
      .then(({ data: posts }) => {
        setState("posts", posts);
        // Map over the posts and render to page
        Posts.render();
        // posts.map(post => Posts.render.call(post));
      });
  }

  /**
   * render - Displays a post on the page
   *
   * @static
   * @param {Object} post - Takes a post object
   * @param {boolean} [singleView=false] - If displaying in a single post view [true] vs a listing view [false]
   * @memberof Posts
   */
  static render() {
    // Clear the current posts from the page
    Posts.clear();
    // Map through the posts
    state.posts.map(post => {
      // Setup the post article element
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `
        <h2 class="entry-title">
        <a href="#${post.slug}">${post.title.rendered}</a>
        </h2>
        <div class="entry-content">${post.excerpt.rendered}</div>      
      `;

      // Attach an event listenr on the post link
      article.querySelector(".entry-title a").addEventListener("click", () => {
        setState("post", post);
        Post.render();
      });

      // If logged in, display edit and delete links
      if (state.loggedIn) {
        article.append(
          Post.getEditLink.call(post),
          Post.getDeleteLink.call(post)
        );
      }

      // Append the post to the page
      getEl(mainId).append(article);
    });
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
