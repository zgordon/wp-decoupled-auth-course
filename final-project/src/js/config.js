export /**
 * getEl - Helper function for getting elements based on ID
 *
 * @param {(string|int)} id - The id for the element to get
 */
const getEl = id => document.getElementById(id);

// Main Container IDs
export const wrapperId = "content";
export const primaryId = "primary";
export const sidebarId = "secondary";
export const mainId = "main";

// UI Component IDs
export const backBtnId = "back-to-post";
export const loginFormId = "login-form";
export const usernameId = "login-username";
export const passwordId = "login-password";
export const loginBtnId = "login-button";
export const logoutFormId = "logout-form";
export const logoutBtnId = "logout-button";
export const editorFormId = "add-post-form";
export const editorTitleId = "title-editor";
export const editorContentId = "content-editor";
export const editorBtn = "save-post";

// Authentication
export const rest_url = "https://decoupledauth.local/wp-json/";
export const tokenCookie = "jwt-token";

// State if user is logged in
let logged_in = false;
/**
 * setLoggedin - Setter function for logged_in
 *
 * @param {boolean} value - New state for if user is logged in
 */
const setLoggedIn = value => (logged_in = value);
export { logged_in, setLoggedIn };

// Editor State
let editorPostId = null;
/**
 * setEditorPostId - Setter function for editorPostId
 *
 * @param {(string|int)} value - ID for current post being edited
 */
const setEditorPostId = value => (editorPostId = value);
export { editorPostId, setEditorPostId };
