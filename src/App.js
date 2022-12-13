import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import HomeScreen from "./screens/HomeScreen";
import AddData from './screens/AddData'
import RegisterToCensus from './screens/RegisterToCensus'
import Login from './screens/Login'
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Fragment>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<HomeScreen/>}/>
      <Route path='/add-data' element={<AddData/>}/>
      <Route path='/register-to-census' element={<RegisterToCensus/>}/>
    </Routes>
    </Fragment>
  );
}

export default App;
