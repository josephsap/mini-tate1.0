export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    mode: import("./reducers/modes").IModeState;
    currAnno: import("./reducers/currAnno").ICurrAnnoState;
    cursor: import("./reducers/cursor").ICursorState;
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    mode: import("./reducers/modes").IModeState;
    currAnno: import("./reducers/currAnno").ICurrAnnoState;
    cursor: import("./reducers/cursor").ICursorState;
}, import("redux").AnyAction, undefined>]>;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
