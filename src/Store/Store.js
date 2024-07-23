import { configureStore } from "@reduxjs/toolkit";
import  loaderReducer  from "./Ui-Slice/ui-slice";
import AuthReducer from "./auth-slice/auth-slice";
import AdminProductReducer from "./adminProuct-slice/admin-product-slice";

export const store = configureStore({
    reducer:{
        ui:loaderReducer,
        auth:AuthReducer,
        admin_products:AdminProductReducer
    }
})