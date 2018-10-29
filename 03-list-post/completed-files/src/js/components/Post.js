// Import components
import { render as Posts, clear as clearPosts } from "./Posts";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers";
import { main, backBtn } from "../config";

/**
 * Displays a post on the page from state.post
 *
 * @param {Object} event - Event object
 */
export function render() {
  // Setup the post article element
  const article = createEl("article");
  article.classList.add("post");
  article.innerHTML = `
      <p><a id="${backBtn}" href="#">&lt; Back to Posts</a></p>
      <h1 class="entry-title">${state.post.title.rendered}</h1>
      <div class="entry-content">${state.post.content.rendered}</div>
    `;

  // Attach event listeners to back button
  article.querySelector(`#${backBtn}`).addEventListener("click", event => {
    event.preventDefault();
    setState("post", null);
    Posts();
  });

  // Clear the posts from the page
  clearPosts();

  // Add the post to the page
  getEl(main).append(article);
}
