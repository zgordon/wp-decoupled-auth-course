export /**
 * Helper function for getting elements based on ID
 *
 * @param {(string|int)} id The id for the element to get
 */
const getEl = id => document.getElementById(id);

export /**
 * Shorthand for document.createElement()
 *
 * @param {string} id Element to create
 */
const createEl = id => document.createElement(id);

export /**
 * Removes the passed element
 *
 * @param {*} el The ID of the element to remove
 */
const removeEl = el => {
  if (isRendered(el)) getEl(el).remove();
};

export /**
 * Returns true or false based on if item is rendered to page
 *
 * @param {(string|int)} el
 * @returns
 */
const isRendered = el => {
  return getEl(el) ? true : false;
};
