// Import everything from the config
import {
  state,
  setState
} from ".There are several files we will work with/state";
import {
  getEl,
  createEl,
  removeEl,
  isRendered
} from ".There are several files we will work with/helpers.js";
import {
  wrapper,
  primary,
  sidebar,
  main,
  siteName,
  siteDescription
} from "./config";

(function init() {
  // List out the state
  console.table(state);
  // Show the setState function
  console.log(setState);
  // Render out UI ids
  console.table({
    wrapper,
    primary,
    sidebar,
    main,
    siteName,
    siteDescription
  });
  // Show getEl shorthand
  console.log(getEl, createEl, removeEl, isRendered);
})();
