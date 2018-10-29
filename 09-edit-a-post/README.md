# Add The Ability to Edit a Post

In this step we will add an "Edit" link to each post that loads that post in the Editor. We will also update our crud.js file with an update function.

## To Do

Step 1: Setup Up and the Config
- Open the `starter-files` and run `npm init` and `npm start` to get things going
- Open the `state.js` file and add a value to property to state for `editorPost` with a default setting of null.  This will save the ID of any post currently being edited.


Step 2: Adding an Edit Link to Posts
- Open the Post.js file and add a new function called editLink that takes post as an argument
- Create create a node element that would generate this if added to the page
```
<a href="#edit-post" class="edit">Edit</a>
```
- Attach an event listener to the link that prevents default behavior then updates the state for `editorPost` to the `post.id` passed in as a parameter.
- Finally, have the function return the link rather than render it to the page.
- Then go back up to the render() function before `clearPosts()` is called.  Write a conditional statement that checks the state to see if the user is logged in.  If logged in, then append editLink(state.post) to the article.  This will add the edit link to all single posts rendered
- Now open `Posts.js` and make sure to import `editLink` from `Post.js`
- Inside the Posts.js render() function, right before the article we create is appended to the main element, add the code you added in the Post.js render().  Check if the user is logged in and if they are, append `editLink(post)` to the current article.  This will add the edit link to all posts listed in the post listing view.

Step 3: Adding update() to crud.js
- Open the crud.js file and create a function called `update()` that takes `post` as a parameter.
- Create a const named token that gets the current token saved in the Cookie (same as in the save function)
- Make an axios call with the following configurations:
```
method: "put",
url: state.restUrl + "wp/v2/posts/" + post.id,
data: post,
headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
}
```
- Once you have your response, call clearEditor(), set a Notice() of "updated" and then reload Posts with Posts().  
- In the catch response, log out the error message with a console.error()

Step 4: Write loadPost Function
- Open `Editor.js` and create a function named `loadPost()` right before process()
- First pull in the token from cookies like we have done before
- Then make an axios get call to the url `state.restUrl + "wp/v2/posts/" + state.editorPost` with the following settings:
```
params: {
  context: "edit"
},
headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
}
```
- With that response, call window.scrollTo(0,50) to move the user back to the top of the page
- Then set the value for the editor title equal to the raw post title you just got back
```
getEl(editorTitle).value = response.data.title.raw;
```
- Then set the quill to the raw post content from the post.
```
const contentEditor = Quill.find(getEl(editorContent));      
contentEditor.root.innerHTML = response.data.content.raw;
```

Step 5: Have editorClear resest editorPost state
- Open the `Editor.js` file and inside the clear function come down to right after the quill editor is cleared.
- Set the state for `editorPost` back to `null`

Step 6: Update the Editor process() method
- Make sure that `Editor.js` imports `update` from crud.js
- In the `Editor.js` file, come down into the process() function.  Remove the line `save(post)`.
- Replace it with a conditional statement that checks if state.editorPost is set to null.
- If editorPost is null that means it is a new post and we should call save(post)
- If editorPost is not null that means we are editing a post and we should call update(post)

Step 7: Call Load Post from editLink() Event Listener
- Come back into Post.js and into the editLink() function
- In the event handler, add a call to loadPost right after setState is called

This exercise adds the ability to load posts into the editor and save them.