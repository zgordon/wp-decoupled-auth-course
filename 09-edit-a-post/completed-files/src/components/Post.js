// Import components
import { render as Posts, clear as clearPosts } from "./Posts";

// Import components
import { loadPost } from "./Editor";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers.js";
import { main, backBtn } from "../config";

/**
 * Displays a post on the page from state.post
 *
 * @param {Object} event - Event object
 */
export function render(event) {
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

  // If logged in, display edit link
  if (state.loggedIn) {
    article.append(editLink(state.post));
  }

  // Clear the posts from the page
  clearPosts();

  // Add the post to the page
  getEl(main).append(article);
}

/**
 * Creates an edit link for a post bound to it
 *
 * @param {Object} post The post to be edited
 */
export function editLink(post) {
  // Setup the edit link
  const link = document.createElement("a");
  link.href = "#edit-post";
  link.classList.add("edit");
  link.innerText = "Edit";

  // Add event listener for the post edit link
  link.addEventListener("click", () => {
    setState("editorPost", post.id);
    loadPost();
  });

  // Return the link element
  return link;
}
