// Set state object with values that are changed programatically
const state = {
  loggedIn: false,
  restUrl: "https://decoupledauth.local/wp-json/",
  token: "wp-token",
  siteName: "Site Name",
  siteDescription: "Just another decoupled site",
  posts: null,
  post: null
};
/**
 * Handles updating the state
 *
 * @param {string} toSet The property from state to set
 * @param {*} newValue The new value to set
 */
const setState = (toSet, newValue) => {
  state[toSet] = newValue;
};
export { state, setState };
