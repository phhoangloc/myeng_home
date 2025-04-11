import { configureStore } from "@reduxjs/toolkit";

import MenuReducer from "./reducer/MenuReduce";
import RefreshReducer from "./reducer/RefreshReduce";
import UserReducer from "./reducer/UserReduce";

const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        refresh: RefreshReducer.reducer,
        user: UserReducer.reducer,

    }
})

export default store