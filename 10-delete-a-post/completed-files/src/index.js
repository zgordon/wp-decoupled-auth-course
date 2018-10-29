import { init as Authenticate } from "./components/Authentication";
import { init as Header } from "./components/Header";
import { init as Posts } from "./components/Posts";

(function init() {
  Authenticate();
  Header();
  Posts();
})();
