// Import libraries
import axios from "axios";

// Import components
import { init as Posts } from "./Posts";

// Import configs
import { state, setState } from "../state";
import { getEl } from "../helpers.js";
import { siteName, siteDescription } from "../config";

/**
 * Gets the site information and calls it to render
 *
 * @export
 */
export function init() {
  // Add event listener to header
  getEl(siteName)
    .querySelector("a")
    .addEventListener("click", event => {
      event.preventDefault();
      Posts();
    });

  // Make API request with Axios
  axios
    // Set the url to the API root for site info
    .get(state.restUrl)
    .then(({ data: apiInfo }) => {
      // Render the header
      setState("siteName", apiInfo.name);
      setState("siteDescription", apiInfo.description);
      update();
    });
}

/**
 * Updates the header with current site name and description
 *
 * @export
 */
export function update() {
  getEl(siteName).querySelector("a").innerText = state.siteName;
  getEl(siteDescription).innerText = state.siteDescription;
}
