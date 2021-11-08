import { slide as Menu } from "react-burger-menu";
import { styles } from "./Styles/MenuStyle";
import {
  GlobalStyles,
  MenuItem,
  ActiveMenuItem,
  SubMenu,
} from "./Styles/Styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItemComponent from "./Components/AddItemComponent";
import AddColorComponent from "./Components/AddColorComponent";
import AddSizeComponent from "./Components/AddSizeComponent";
import AddBrandComponent from "./Components/AddBrandComponent";
import AddTypeComponent from "./Components/AddTypeComponent";
import AddProjectComponent from "./Components/AddProjectComponent";
import HomePageComponent from "./Components/HomePageComponent";
import PrivComponent from "./Helpers/PrivComponent";
import SellItemComponent from "./Components/SellItemComponent";
import RestockItemComponent from "./Components/RestockItemComponent";
import { initializeApp } from "firebase/app";
import LoginPage from "./Components/LoginPage";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDJKFs3w4I4uqyQKxBeC2Uh6KuiYTZXaLU",
    authDomain: "superbeestorage-f778a.firebaseapp.com",
    projectId: "superbeestorage-f778a",
    storageBucket: "superbeestorage-f778a.appspot.com",
    messagingSenderId: "1091745430163",
    appId: "1:1091745430163:web:9bed889dcd025184566b66",
    measurementId: "G-Y4KG9HDGLH",
  };
  initializeApp(firebaseConfig);
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Router>
        <Menu isOpen={false} styles={styles}>
          <PrivComponent>
            <SubMenu>
              <MenuItem exact activeStyle={ActiveMenuItem} to="/addcolor">
                Add new Color
              </MenuItem>
              <MenuItem exact activeStyle={ActiveMenuItem} to="/addsize">
                Add new Size
              </MenuItem>
              <MenuItem exact activeStyle={ActiveMenuItem} to="/addbrand">
                Add new Brand
              </MenuItem>
              <MenuItem exact activeStyle={ActiveMenuItem} to="/addtype">
                Add new Type
              </MenuItem>

              <MenuItem exact activeStyle={ActiveMenuItem} to="/addproject">
                Add new Project
              </MenuItem>
              <MenuItem exact activeStyle={ActiveMenuItem} to="/additem">
                Add new Item
              </MenuItem>
            </SubMenu>
            <MenuItem exact activeStyle={ActiveMenuItem} to="/itemlist">
              Item List
            </MenuItem>
            <MenuItem exact activeStyle={ActiveMenuItem} to="/sellitem">
              Sell items
            </MenuItem>
            <MenuItem exact activeStyle={ActiveMenuItem} to="/restockitem">
              Restock items
            </MenuItem>
          </PrivComponent>
          <MenuItem exact activeStyle={ActiveMenuItem} to="/">
            Login Page
          </MenuItem>
        </Menu>
        <Switch>
          <Route exact path="/addcolor" component={AddColorComponent}></Route>
          <Route exact path="/addsize" component={AddSizeComponent}></Route>
          <Route exact path="/addbrand" component={AddBrandComponent}></Route>
          <Route exact path="/addtype" component={AddTypeComponent}></Route>
          <Route exact path="/additem" component={AddItemComponent}></Route>
          <Route exact path="/sellitem" component={SellItemComponent}></Route>
          <Route
            exact
            path="/restockitem"
            component={RestockItemComponent}
          ></Route>
          <Route
            exact
            path="/addproject"
            component={AddProjectComponent}
          ></Route>
          <Route exact path="/itemlist" component={HomePageComponent}></Route>
          <Route exact path="/" component={LoginPage}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
