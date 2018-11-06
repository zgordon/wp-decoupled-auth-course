# List Single Post from State

In this step we will list a single post from the state

## To Do

Step 1: Setup State & Config

- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open `src/js/state.js` and add `post` to the state with a default valule of `null`
- Open `src/js/config.js` and add `export const backBtn = "back-to-post";` to give us an ID for the Back to Posts button we will be creating

Step 2: Setup Posts.js

- Create a `Post.js` file inside `src/js/components/` 
- Open the `Post.js` file
- Import the following:
```
// Import components
import { render as Posts, clear as clearPosts } from "./Posts";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers";
import { main, backBtn } from "../config";
```

Step 3: Setup Post render()
- Create a function called `render()` that also gets exported
- Have `render()` create something like this using values from state.post:
```
<article class="post>
    <p><a id="${backBtn}" href="#">&lt; Back to Posts</a></p>
    <h1 class="entry-title">POST_TITLE_HERE</a></h1>
    <div class="entry-content">POST_CONTENT_HERE</div>     
</article>
```
- For the Back to Posts id use the `backBtn` id from `config.js`

Step 4: Adding Event Listener
- Still inside of `render()` attach an event listener to the back button
- Have the event listener prevent default and then set state for `post` to null
- After setting the state in the event listener call Posts() to render the posts on the page

Step 5: Completing Single Post Render
- After the event listener call `clearPosts()` that we imported from `Posts.js`
- Make sure the post gets added to the `main` element on the page (ie `getEl(main)`)

Step 6: Attaching Post render to the post listings event listeners
- Go back to the `Posts.js` file
- Import `render` as `Post` from `Post.js`
- Inside the `Posts.js` `render()` function find the event listener on the post title link.  
- After `event.preventDefault()`, set the `post` state value equal to the `post` being rendered to the page
- Finally, after setting state, call `Post()` to render the single post when the title gets clicked

This should cause the single Post `render()` function to get called when the title of a post is clicked in the posts listing.

Posts does not receive a post object directly, but rather gets it directly from state.
