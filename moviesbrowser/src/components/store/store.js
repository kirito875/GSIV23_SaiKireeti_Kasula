import {createSlice,configureStore} from '@reduxjs/toolkit';


const searchSlice=createSlice({
  name:'search',
  initialState:{
    searchResults:[]
  },
  reducers:{
    searchList:(state,action)=>{
        state.searchResults=action.payload
    }
  }
});

const detailsSlice=createSlice({
    name:'details',
    initialState:{
        details:{}
    },
    reducers:{
        movieDetails:(state,action)=>{
            state.details=action.payload
        }
    }
})

export const {searchList}=searchSlice.actions;
export const {movieDetails}=detailsSlice.actions;
export const store=configureStore({reducer:{
    search:searchSlice.reducer,
    details:detailsSlice.reducer
}});
export const searchResults=(state)=>state.search.searchResults;