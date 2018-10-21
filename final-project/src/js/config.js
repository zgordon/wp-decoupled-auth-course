// Set state object with values that are changed programatically
const state = {
  loggedIn: false,
  siteName: "Site Name",
  siteDescription: "Just another decoupled site",
  posts: null,
  post: null,
  editorPostId: null
};
/**
 * setSiteName - Setter for the site name
 *
 * @param {string} value - New site name
 */
const setState = (toSet, newValue) => {
  state[toSet] = newValue;
  console.log(state);
};
export { state, setState };

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
export const siteNameId = "site-title";
export const siteDescriptionId = "site-description";

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
