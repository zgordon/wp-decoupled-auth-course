# Add The Post Form

In this step we will add a from to add new posts with

## To Do

Step 1: Setup the Config and index.html
- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Add the following to `config.js` 
```
export const editor = "add-post-form";
export const editorTitle = "title-editor";
export const editorContent = "content-editor";
```
- Open the `index.html` file
- Add the following CSS
```
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
```
- Add the following JavaScript before our call to `bundle.min.js`
```
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

Step 2: Create the Editor
- Create a file called "Editor.js" inside of "./components"
- Import the following:
```
import { state } from "../state";
import { getEl, isRendered } from "../helpers";
import { primary, main, editor, editorTitle, editorContent } from "../config";
```

Step 3: Create the Editor Form render()
- Create a `render()` function
- Write a conditional statement to check if loggedIn is false or isRendered(editor) is true.  If either are, return and exit the function.
- Create and add a form to the page with the following markup
```
<form id="${editor}>
    <h3 class="add-new-post">Add New Post</h3>
    <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
    <div id="content-editor"></div>
    <p><button class="button">Save</button></p>
</form>
```
- Initialize the Quill editor using the following
```
// Initialize the quill editor
var quill = new Quill(`#${editorContent}`, {
    theme: "snow"
});
```
- Attach an event listener to the getEl(editor) that prevents default on submit.  We will add more to this later

Step 4: Create the Editor Form process()
- Create a function called `process()` that takes `event` as a parameter
- Get the quillEditor from the page using `Quill.find(getEl(editorContent))`
- Create a post object where we set the following:
``` 
title: getEl(editorTitle).value, 
content: quillEditor.root.innerHTML,
status: "publish"
```
- Prevent the event default
- Do a quick verfication by checking if `post.title` or `post.content` is empty.  If it is, alert "All fields required" and then return from the function
- Make a comment after that to with a note to later save post here
- Finally, go back to the Editor `render()` function and in the event listener at the bottom, reference the `process` function to happen on submit

Step 5: Creating a crud.js File
- Create a new file `src/crud.js`
- Import the following
```
// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components/Editor";
import { init as Posts } from "./components/Posts";

// Import configs
import { state } from "./state";
```


Step 6: Creating a save() Function with Authentication
- Create a `save()` function in `crud.js` that takes a `post` object as a paramter
- Inside of `save()` create a `token` const equal the to current Cookie token `Cookies.get(state.token)`
- Then make an axios call with the following configurations to setup the authentication API call to save the `post`
```
method: "post",
url: state.restUrl + "wp/v2/posts",
data: post,
headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
}
```
- In the then with the repsonse, call `clearEditor()` to clear the editor after save
- Then call `Posts()` to re-initialize the posts with the the added post

Step 7: Call Save from Editor `process()`
- Open `Editor.js`
- Import `save` from `crud.js`
- In the Editor `process()` function, at the very end, call `save()` and pass `post` as a parameter

This exercise adds an Add Post Form to the site and a new `crud.js` file to handle saving, and later updating and deleting the posts.