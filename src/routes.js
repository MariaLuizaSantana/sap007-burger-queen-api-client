import React from "react";
import { Route, BrowserRouter, Routes as RoutesDOM } from "react-router-dom";

import Login from "./Pages/Login";
import Waiter from "./Pages/Waiter";
import Chef from "./Pages/Chef";
import Admin from "./Pages/Admin";
import NotFound from "./Pages/Notfound";
import ListUsers from "./Pages/Admin/Listusers";
import CreateUser from "./Pages/Admin/Createuser";
import UpdateUser from "./Pages/Admin/Updateuser";
import DeleteUser from "./Pages/Admin/Deleteuser";
import WaiterMenu from "./Pages/Waiter/Menu";
import WaiterOrder from "./Pages/Waiter/Order";
import ChefAllOrders from "./Pages/Chef/Allorders";
import ChefDelivered from "./Pages/Chef/Delivered";
import ChefReady from "./Pages/Chef/Ready";
import ChefPending from "./Pages/Chef/Pending";
import ChefPreparation from "./Pages/Chef/Preparation";

const Routes = () => {
  return(
      <BrowserRouter>
        <RoutesDOM>
          <Route element={<Login />} path="/" exact />
          <Route element={<Waiter />} path="/waiter" />
          <Route element={<Chef />} path="/chef" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<NotFound />} path="/not-found" />
          <Route element={<ListUsers />} path="/list-users" />
          <Route element={<CreateUser />} path="/create-user" />
          <Route element={<UpdateUser />} path="/update-user" />
          <Route element={<DeleteUser />} path="/delete-user" />
          <Route element={<WaiterMenu />} path="/menu" />
          <Route element={<WaiterOrder />} path="/order" />
          <Route element={<ChefAllOrders />} path="/all-orders" />
          <Route element={<ChefDelivered />} path="/delivered" />
          <Route element={<ChefReady />} path="/ready" />
          <Route element={<ChefPending />} path="/pending" />
          <Route element={<ChefPreparation />} path="/preparation" />
        </RoutesDOM>
      </BrowserRouter>
  );
}

export default Routes;