import React from 'react';
import SignUp from './MainComponent/SignUp/SignUp';
import Login from './MainComponent/SignUp/Login';
import Header from './Header';
import Product from "./MainComponent/Product"
import ErrorPage from './MainComponent/ErrorPage';
import ChangePassword from './MainComponent/SignUp/ChangePassword';
import UpdatePage from './MainComponent/UpdatePage';
import SettingPage from './MainComponent/SettingPage';
import ForgotPassword from './MainComponent/SignUp/ForgotPassword';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      
        <Header></Header>
        <Switch>
          {/* <Route path="/">
            <SignUp></SignUp>

          </Route> */}
          

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/product" >
            <Product></Product>
          </Route>
          <Route path="/logout" >
            <Login></Login>
          </Route>
          <Route path="/update">
            <UpdatePage></UpdatePage>
          </Route>
          <Route path="/changePassword">
            <ChangePassword></ChangePassword>

          </Route>
          <Route path="/forgotpass">
            <ForgotPassword></ForgotPassword>
          </Route>
          <Route path="/setting">
            <SettingPage></SettingPage>
          </Route>
          <Route path="*">
            <ErrorPage></ErrorPage>
          </Route>

        </Switch>
      
    </BrowserRouter>




  );
}
