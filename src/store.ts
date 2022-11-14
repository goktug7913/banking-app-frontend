import {configureStore} from '@reduxjs/toolkit';
import {userAccountSlice} from "./slices/userAccount";

export default configureStore({
    reducer: {
        // Add reducers here
        account: userAccountSlice.reducer,
    }
});