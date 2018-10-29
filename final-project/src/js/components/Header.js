// Import libraries
import axios from "axios";

// Import components
import Posts from "./Posts";

// Import configs
import { state, setState } from "../state";
import { getEl, siteNameId, siteDescriptionId } from "../config";

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
    // Add event listener to header
    getEl(siteNameId)
      .querySelector("a")
      .addEventListener("click", Posts.init);

    // Make API request with Axios
    axios
      // Set the url to the API root for site info
      .get(state.restUrl)
      .then(({ data: apiInfo }) => {
        // Render the header
        setState("siteName", apiInfo.name);
        setState("siteDescription", apiInfo.description);
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
    getEl(siteNameId).querySelector("a").innerText = state.siteName;
    getEl(siteDescriptionId).innerText = state.siteDescription;
  }
}
