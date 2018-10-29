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

export /**
 * getEl - Helper function for getting elements based on ID
 *
 * @param {(string|int)} id - The id for the element to get
 */
const getEl = id => document.getElementById(id);
