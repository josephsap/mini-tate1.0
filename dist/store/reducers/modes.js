"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMode = exports.setCornerDrag = exports.setDrag = exports.setEdit = exports.modeSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    edit: false,
    drag: false,
    cornerDrag: false,
};
exports.modeSlice = (0, toolkit_1.createSlice)({
    name: 'mode',
    initialState,
    reducers: {
        setEdit: (state, action) => {
            state.edit = action.payload;
        },
        setDrag: (state, action) => {
            state.drag = action.payload;
        },
        setCornerDrag: (state, action) => {
            state.cornerDrag = action.payload;
        },
    },
});
_a = exports.modeSlice.actions, exports.setEdit = _a.setEdit, exports.setDrag = _a.setDrag, exports.setCornerDrag = _a.setCornerDrag;
const selectMode = (state) => state.mode;
exports.selectMode = selectMode;
exports.default = exports.modeSlice.reducer;
//# sourceMappingURL=modes.js.map