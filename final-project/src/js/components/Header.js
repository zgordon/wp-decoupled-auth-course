// Import libraries
import axios from "axios";

// Import configs
import {
  rest_url,
  getEl,
  state,
  siteNameId,
  siteDescriptionId,
  setState
} from "../config";

/**
 * Header - Gets and displays the name and description of the site
 *
 * @export
 * @class Header
 */
export default class Header {
  /**
   * init - Gets the site information and calls it to render
   *
   * @static
   * @memberof Header
   */
  static init() {
    // Make API request with Axios
    axios
      // Set the url to the API root for site info
      .get(rest_url)
      .then(({ data: apiInfo }) => {
        // Render the header
        setState("siteName", apiInfo.name);
        setState("siteDescription", apiInfo.description);
        console.log(state.siteName);
        console.log(state.siteDescription);
        Header.update();
      });
  }
  /**
   * update - Updates the header with current site name and description
   *
   * @static
   * @returns
   * @memberof Header
   */
  static update() {
    getEl(siteNameId).innerHTML = `
      <a href="/" role="home">${state.siteName}</a>
    `;
    getEl(siteDescriptionId).innerText = state.siteDescription;
  }
}
