# Add The Ability to Delete a Post

In this step we will add an "Delete" link to each post that deletes the post via the WordPress REST API.

## To Do

Step 1: Add Function for deleteLink()
- Open `Post.js` and create a function called deleteLink() that accepts post as a parameter
- Create a node element for deleting a post that produces the following markup
```
<a href="#delete-post" class="delete-post:>Delete</a>
```
- Then attach an event listener to the link that prevents default
- Finally, return the link

Step 2: Display the Delete link if Logged In
- Go back to the Post.js render() function where the editLink is added inside a conditional statement checking if logged in is true
- Append the deleteLink the same way as the editLink inside the conditional statement.

Step 3: Open the crud.js file
- After the `update()` function create a new function called `deletePost()` that accepts post as a parameter.
- Create a new const called confirm that is set to a `window.confirm()` message that asks if they are sure they want to display that post.  You can display the post title in the confirm message as well.
- Set a const for token that gets the token from the cookie.
- Write a conditional statement that checks that confirm returns true
- Inside that conditional, create an axios call with the following settings
```
method: "delete",
url: state.restUrl + "wp/v2/posts/" + post.id,
headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token
}
```
- Then call clearEditor()
- Call Notice("deleted") to display a deleted notice
- Then re-initialize and load the posts with Posts()
- Add a catch to display any errors in the console

Step 4: Adding deletePost() to the deleteLink() Event Listener
- Open `Post.js` and go into the deletePost() function where the event listener is added
- After preventing default, call deletePost() and pass in the `post` object passed in the parameter
- 