// Element IDs
export const getEl = id => document.getElementById(id);
export const wrapperId = "content";
export const primaryId = "primary";
export const sidebarId = "secondary";
export const mainId = "main";
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
let logged_in = false;
const setLoggedIn = value => (logged_in = value);
export { logged_in, setLoggedIn };
let editorPostId = null;
const setEditorPostId = value => (editorPostId = value);
export { editorPostId, setEditorPostId };
