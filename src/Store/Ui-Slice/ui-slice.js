import {createSlice} from '@reduxjs/toolkit';

const initialUiState ={
    isVisible:true,
    open: false,
}

const LoaderSlice = createSlice({
    name:'ui',
    initialState:initialUiState,
    reducers:{
        isLoadingData(state, action){
            state.isVisible = action.state
        },
        isOpen(state, action){
            state.open = !state.open
            console.log(state.open)
        }
    }
})

export const LoaderActions = LoaderSlice.actions;
export default LoaderSlice.reducer;