// Import libraries
import axios from "axios";

// Import components
import Post from "./Post";
import Editor from "./Editor";
import Delete from "./Delete";

// Import configs
import { getEl, rest_url, logged_in, mainId, backBtnId } from "../config";

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
      .get(rest_url + "wp/v2/posts", {
        params: {
          // Set number of posts to get
          per_page: 5
        }
      })
      .then(({ data: posts }) => {
        // Clear the current posts from the page
        Posts.clear();
        // Map over the posts and render to page
        Posts.render.call(posts);
        // posts.map(post => Posts.render.call(post));
      });
  }

  /**
   * loadSinglePost - Gets a post from API then renders it
   *
   * @static
   * @memberof Posts
   */
  // static loadSinglePost(event) {
  //   // Get the id from the
  //   let id = event.target.parentElement.parentElement.dataset.id;
  //   id = this.id;
  //   Posts.clear();
  //   // Prevent default behavior
  //   event.preventDefault();
  //   // Render the post to the page
  //   Posts.render(this, true);
  // }

  /**
   * render - Displays a post on the page
   *
   * @static
   * @param {Object} post - Takes a post object
   * @param {boolean} [singleView=false] - If displaying in a single post view [true] vs a listing view [false]
   * @memberof Posts
   */
  static render() {
    // Map through the posts
    this.map(post => {
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
      article
        .querySelector(".entry-title a")
        .addEventListener("click", Post.render.bind(post), false);

      // If logged in, display edit and delete links
      if (logged_in) {
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
   * getEditLink - Gets the markup and event listener for the edit post link
   *
   * @static
   * @returns {HTMLElement} link - The edit post link
   * @memberof Posts
   */
  // static getEditLink() {
  //   // Setup the edit link
  //   const link = document.createElement("a");
  //   link.href = "#edit-post";
  //   link.innerText = "Edit";

  //   // Add event listener for the post edit link
  //   link.addEventListener("click", Editor.loadPost.bind(this));

  //   // Return the link element
  //   return link;
  // }

  /**
   * getDeleteLink - Gets the markup and event listener for the delete post link
   *
   * @static
   * @returns {HTMLElement} link - The delete post link
   * @memberof Posts
   */
  // static getDeleteLink() {
  //   // Setup the delete link
  //   const link = document.createElement("a");
  //   link.href = "#delete-post";
  //   link.innerText = "Delete";
  //   link.classList.add("delete-post");

  //   // Add the event listener to delete the post
  //   link.addEventListener("click", Delete.post.bind(this));

  //   // Return the delete link
  //   return link;
  // }

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
