import {createSlice} from '@reduxjs/toolkit';

const initialUiState ={
    isVisible:true,
}

const LoaderSlice = createSlice({
    name:'ui',
    initialState:initialUiState,
    reducers:{
        isLoadingData(state, action){
            state.isVisible = action.state
        }
    }
})

export const LoaderActions = LoaderSlice.actions;
export default LoaderSlice.reducer;