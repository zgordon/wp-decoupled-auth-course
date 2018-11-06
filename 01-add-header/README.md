# Adding a Header Component with WP API Call

In this step we will add a header component to our app that pulls in the site name and description with the WordPress REST API.

## To Do

Step 1: Setup State

- Open the `starter-files` and run `npm install` and `npm start` to get things going
- Open `src/state.js` and add `siteName` and `siteDescription` to the state


Step 2: Setup Header.js
- Create a new `components` folder inside `src/`
- Create a `Header.js` file inside `src/components/`
- Open the `Header.js` 
- Import the following:
```
// Import libraries
import axios from "axios";

// Import configs
import { state, setState } from "../state";
import { getEl } from "../helpers";
import { siteName, siteDescription } from "../config";
```

Step 3: Create Posts init()

- Create an `init()` function that gets exported
- Inside `init()` add an event listener to the Site Name that prevents it from going anywhere
- Inside `init()` also make an axios call to the `state.restUrl` root to a working WordPress site
- With the data returned from the request use the `setState()` function to set the `siteName` property to `data.name` do the same for `siteDescription` and `data.description`

Step 4: Create Posts update()

- Create a function called `update()` inside `Header.js`
- Have `update()` update the Site Name and Site Description based on state
- Add a call to `update()` after setting the state inside the axio `then()` return

Step 5: Init Header inside index.js

- Finally, import the Header `init()` function into `src/index.js` and call it inside the main app `init()` function.

This should cause the name of the WordPress site you are using along with the description to display on in the header section of the site.
