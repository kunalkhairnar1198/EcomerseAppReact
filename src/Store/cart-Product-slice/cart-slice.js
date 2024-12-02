import { createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const cartState ={
    cartProducts:[],
    totalQuantity:0
}

const CartSlice = createSlice({
name: 'cart',
initialState:cartState,
reducers:{
    replaceCart(state, action){
        console.log('REplace to cart')
        state.totalQuantity = action.payload.totalQuantity;
        state.cartProducts = action.payload.cartProducts;
        console.log(state.cartProducts)
    },
    addItemCart(state, action){
        console.log('Add to cart')
        const newItem = action.payload;
        const existingItem = state.cartProducts.find((item) => item.id === newItem.id);
            state.totalQuantity++
            if(!existingItem){
                state.cartProducts.push({
                    id : newItem.id,
                    title:newItem.title,
                    category:newItem.category,
                    description:newItem.description,
                    price:newItem.price,
                    totalPrice:newItem.price,
                    productImageUrl:newItem.productImageUrl,
                    qunatity : 1,
                    })
            }else{
                existingItem.qunatity++;
                existingItem.totalPrice = parseInt(existingItem.totalPrice) + parseInt(newItem.price);
            }
            console.log(state.cartProducts)
    },
    removeCartItem(state, action){
        const id = action.payload;
        console.log(action.payload)
        const existingItem = state.cartProducts.find((item)=>item.id === id);
        state.totalQuantity--;
        if(existingItem.qunatity ==1){
            state.cartProducts = state.cartProducts.filter((item)=> item.id !== id);

        }else{
            existingItem.qunatity--;
            existingItem.totalPrice =parseInt(existingItem.totalPrice) - parseInt(existingItem.price);
        }
    }
}
})

export const sendCart = (cart) => {
    return async (dispatch, getState) => {
        dispatch(cartSliceActions.addItemCart(cart))
        const updatedCart = getState().cart;
        const sendRequest = async () => {
            try {
                // Save the entire cart to Firestore
                await setDoc(doc(fireDB, 'cart', 'user-cart-id'), updatedCart);
            } catch (error) {
                throw new Error('Sending cart data failed');
            }
        };

        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        }
    }
}

export const cartSliceActions= CartSlice.actions;
export default CartSlice.reducer;