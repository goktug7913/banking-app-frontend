import {configureStore} from '@reduxjs/toolkit';
import {userAccountSlice} from "./context/userAccount";

export default configureStore({
    reducer: {
        // Add reducers here
        account: userAccountSlice.reducer,
    }
});