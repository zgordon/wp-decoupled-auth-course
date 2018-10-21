import Authentication from "./components/Authentication";
import Header from "./components/Header";
import Posts from "./components/Posts";

(function init() {
  Authentication.init();
  Header.init();
  Posts.init();
})();
