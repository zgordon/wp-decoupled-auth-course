## Part 1 - Overview

### 1. Overview of Authentication Types
- What is Authentication 
- When would you need this 
- Types of Authentication 
    - Basics
    - JWT Auth
    - OAuth
- What we will use for this project

### 2. Example of what we want to build
- final-project
- Authentication
- Adding, Editing, Deleting

## Part 2 - Setting Up Non Authenticated Site

### 3. Setting Up The  WordPress Site
- Install the JWT Auth plugin
- .htaccess
- Secret Key
- CORs support
- Test the endpoint

### 4. The Project Starter Files
- 00-starter-files
- package.json
- webpack.config.js
- index.js            
- config.js
    - state
    - setState
    - IDs
    - getEl shortcut 

### 5. Building the Header    
- 01-add-header
- Make API call for data
- Update the posts

### 6. Listing the Posts    
- 02-list-posts
- Post


## 7. Showing Single Post
- 03-list-post
- Get list of posts
- Render to the page

## Part 3 - Setting Up Authentication

### Setting up Decoupled Authentication
- 04-setting-up-authentication
- Authentication class 
- initLogin, onLogin, initLogout, onLogout
- main init with logic
- 3 packages 
    - fetch / axios 
    - form URL encode 
    - Cookies JS 

### Adding a Login Form
- 05-add-login-form

### Adding a Logout Form
- 06-add-logout-form

### Adding Add Post
- 07-add-post-form
- Add Quill CSS and JS
- Add save method

### Add Notice
- 08-add-notices

### Adding Edit Post
- 09-edit-a-post-form
- Part 1
    - Add to state
    - Create edit link function with event listener
- Part 2
    - Add a load edit post to load the form
- Part 3 - Update function    
    - Remove from state in clear() in Editor.js
    - Add if/else to save() method - could make two different onces two

### Adding Delete Post
- 10-delete-a-post

### Ideas for Next Practices


Is port is running Find:
lsof -i :3000
Kill:
kill -9 <PID>