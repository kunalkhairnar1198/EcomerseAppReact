import {  Route, Routes } from "react-router-dom";
import Aboutus from "./Pages/Aboutus";
import Contactus from "./Pages/Contactus";
import Home from "./Pages/Home/Home";
import CartPage from "./Pages/Cart/CartPage";
import Productdetail from "./Pages/AllProducts/ProductInfo/Productdetail";
import AllProducts from "./Pages/AllProducts/Products/AllProducts";
import Signup from "./Pages/AuthPage/Signup";
import Signin from "./Pages/AuthPage/Signin";
import Userdashbord from "./Pages/UserDashBoard/Userdashbord";
import AdminDashboard from "./Pages/AdminDashbord/AdminDashboard";
import AddProductPage from "./Pages/AdminDashbord/AddProductPage";
import UpdateProductPage from "./Pages/AdminDashbord/UpdateProductPage";
import React from "react";
import { ProtectedRouteForUser } from "./Component/ProtectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./Component/ProtectedRoute/ProtectedRouteForAdmin";
import Categorypage from "./Pages/Category/Categorypage";

function App() {
  
  
  return (
    <React.Fragment>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/productdetail/:id' element={<Productdetail/>}/>
      <Route path='/all-products' element={<AllProducts/>}/>
      <Route path='/cart-page' element={<CartPage/>}/> 
      <Route path="/category/:categoryname" element={<Categorypage/>}/> 
      <Route path='/userdashbord' element={
        <ProtectedRouteForUser>
          <Userdashbord />
        </ProtectedRouteForUser>
      }/>  
      <Route path='/admin-dashboard' element={
          <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
      }/> 
      <Route path="/addproductpage" element={
        <ProtectedRouteForAdmin>
          <AddProductPage/>
        </ProtectedRouteForAdmin>
      }/> 
      <Route path="/updateproductpage/:id" element={
        <ProtectedRouteForAdmin>
          <UpdateProductPage/>
        </ProtectedRouteForAdmin>
      }/> 
      <Route path='/aboutus' element={<Aboutus/>}/>
      <Route path='/contactus' element={<Contactus/>}/>
     </Routes>
    </React.Fragment>
  );
}

export default App;
