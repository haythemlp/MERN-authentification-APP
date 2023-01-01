import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware } from 'redux';


import thunk from 'redux-thunk';

import userReducer from './userReducer';

const rootReducer = combineReducers({
    userReducer

});


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(thunk),

})
export default store;