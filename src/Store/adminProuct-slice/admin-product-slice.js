import {createSlice} from '@reduxjs/toolkit';
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';

const initialUiState ={
    AllProducts:[],
    count:0
}
const ProductSlice = createSlice({
    name:'admin_products',
    initialState:initialUiState,
    reducers:{
      addItemtoProducts (state, action){
        state.AllProducts = action.payload
        state.count = action.payload.length
        console.log(state.AllProducts)
      }
    }
})

export const fetchProductData =()=>{
  return async(dispatch)=>{
      const fetchProducts = async()=>{
          try {
            const q =query( collection(fireDB,'products'),orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot)=>{
              let productsArray =[];
              QuerySnapshot.forEach((doc)=>{
                // console.log(doc)
                productsArray.push(
                  { ...doc.data(),
                    time: Date.now(),
                  id: doc.id,})
              });
              
              dispatch(AdminProductsActions.addItemtoProducts(productsArray))
            })
            return () => data;
          } catch (error) {
            console.log(error)
          }
      }
      fetchProducts()
  }
}

export const AdminProductsActions = ProductSlice.actions;
export default ProductSlice.reducer;

