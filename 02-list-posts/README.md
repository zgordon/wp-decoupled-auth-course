# List Posts with a WP API Call

In this step we will list posts using an API call

## To Do

Step 1: Setup State

- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open `src/state.js` and add `posts` to the state with a default valule of `null`

Step 2: Setup Posts.js

- Create a `Posts.js` file inside `src/components/` 
- Open the `Posts.js` file
- Import the following:
```
// Import libraries
import axios from "axios";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers.js";
import { main } from "../config";
```

Step 3: Setup Posts init()

- Create an `init()` function that takes `event` as an event listener and gets exported
- Inside `init()` check if `event` exists and if so, call `event.preventDefault()`
- Then inside `init()` make an axios call to the `state.restUrl + "wp/v2/posts` to get the posts from a site
- Customize the request to set `per_page` to `5`
- With the data returned from the request use the `setState()` function to set the `posts` property to `data`(NOTE: I like to deconstruct data and rename to posts)

Step 4: Setup Posts render()
- Create another function called `render()` that also gets exported
- Have `render()` map through `state.posts` and render something that looks like this for each post:
```
<article class="post>
    <h2 class="entry-title">
        <a href="#POST_SLUG_HERE">POST_TITLE_HERE</a>
    </h2>
    <div class="entry-content">POST_EXCERPT_HERE</div>     
</article>
```
- Also attach an event listener to each post title link that prevents default behavior (we will more to this later)
- Make sure each post gets added to the `main` element on the page (ie `getEl(main)`)
- Go back into the axios call in `init()` and add a call to `render()` right after you set state for posts.

Step 5: Writing Posts clear()

- Create a function `clear()`
- Have it get the main element where posts are rendered and set the innerHTML to an empty string
- Go back to the `render()` function and call `clear()` before you map through the posts and render them to the page.

Step 6: Calling Posts from index.js

- Open `index.js` and import the Posts `init()` function like` {init as Posts}`.
- Inside the main `init()` function in `index.js` call the `Posts()` to render right after the `Header()` call

Step 7: Calling Post init() from Header

- Open `Header.js` and import Posts init() as Posts()
- Inside the event listener in the Header `init()` function call `Posts()` 

This should cause the Posts `init()` function to kick off, which gets the posts and then calls `render()` to add them to the page.  `clear()` will always be called within `render()` to prevent posts from reloading.

In the future, we can also call `render()` instead of `init()` if we want to just load posts from state and not do an API call.
