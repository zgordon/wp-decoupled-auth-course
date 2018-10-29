# Add Notices

In this step we will add a component for displaying notices

## To Do

Step 1: Setup Up and the Config
- Open the `starter-files` and run `npm init` and `npm start` to get things going
- Add the following to `config.js` 
```
export const message = "message";
```

Step 2: Create Notice.js
- Create a file called "Notice.js" inside of "./components"
- Import the following:
```
import { wrapper, message as messageEl } from "../config";
import { getEl, removeEl } from "../helpers";
```

Step 3: Create the Notice render() Function
- Create a `render()` function with a parameter of `type`
- Inside `render()` create a `messages` object with the following properties.  These will serve as our possible notice messages
```
saved: "This post has been saved!",
loggedin: "Welcome! You are logged in!",
updated: "This post has been updated!",
required: "All fields are required!",
failed: "This action failed :(",
deleted: "This post has been deleted!"
```
- Then, inside `render()` create an element node with the following markup
```
<div id="${messageEl}>
  <p>${messages[type]</p>
</div>
```
- This will create a div with ID of message and display the correct message based on the type property
- Next, call `removeEL()` and pass it `messageEl` to remove any message currently rendered
- Then add the message to the top of the page
- Finally, set a Timer function to remove the `messageEl` after 1600

Step 4: Adding Save Notice
- Open the `crud.js` file
- Import render as Notice from `Notice.js`;
- Inside the `save()` function, between clearing the editor and rendering the new posts, call Notice("saved") to display a Saved Post message

Step 5: Adding Logged In / Logged Out Notices
- Open `authentication.js`
- Import render as Notice from `Notice.js`;
- In the `login()` function, after displaying the logout form, call `Notice("loggedin)`
- In the `logout()` function, after displaying the login form, call `Notice("loggedout)`

This exercise adds a Notice component that offers us a quick way to know when certain actions take place.