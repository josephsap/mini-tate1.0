"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCursor = exports.setCoords = exports.cursorSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    coords: [],
};
exports.cursorSlice = (0, toolkit_1.createSlice)({
    name: 'cursor',
    initialState,
    reducers: {
        setCoords: (state, action) => {
            state.coords = action.payload;
        },
    },
});
exports.setCoords = exports.cursorSlice.actions.setCoords;
const selectCursor = (state) => state.cursor;
exports.selectCursor = selectCursor;
exports.default = exports.cursorSlice.reducer;
//# sourceMappingURL=cursor.js.map