import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    userData: localStorage.getItem('users'),
    isAuthenticated: !!localStorage.getItem('isAuth')
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
           state.isAuthenticated = action.payload
           localStorage.setItem('isAuth' ,JSON.stringify(action.payload))
           console.log('auth true',state.isAuthenticated)
        },
        logout(state, action) {
           state.isAuthenticated = false
           localStorage.removeItem('isAuth')
           localStorage.removeItem('users')
            console.log('auth false',state.isAuthenticated)
        }
    }
})

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
