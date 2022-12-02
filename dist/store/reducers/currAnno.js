"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCurrAnno = exports.clearSelectedAnno = exports.setLeft = exports.setTop = exports.setHeight = exports.setWidth = exports.setSelectedCorner = exports.setSelectedAnno = exports.currAnnoSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    selectedAnno: null,
    selectedCorner: '',
    updatedCoords: {},
};
exports.currAnnoSlice = (0, toolkit_1.createSlice)({
    name: 'currAnno',
    initialState,
    reducers: {
        setSelectedAnno: (state, action) => {
            state.selectedAnno = action.payload;
            state.updatedCoords = {
                width: action.payload.width,
                height: action.payload.height,
                top: action.payload.top,
                left: action.payload.left,
            };
        },
        clearSelectedAnno: (state) => {
            state.selectedAnno = null;
            state.updatedCoords = {};
        },
        setSelectedCorner: (state, action) => {
            state.selectedCorner = action.payload;
        },
        setWidth: (state, action) => {
            state.updatedCoords.width = action.payload;
        },
        setHeight: (state, action) => {
            state.updatedCoords.height = action.payload;
        },
        setTop: (state, action) => {
            state.updatedCoords.top = action.payload;
        },
        setLeft: (state, action) => {
            state.updatedCoords.left = action.payload;
        },
    },
});
_a = exports.currAnnoSlice.actions, exports.setSelectedAnno = _a.setSelectedAnno, exports.setSelectedCorner = _a.setSelectedCorner, exports.setWidth = _a.setWidth, exports.setHeight = _a.setHeight, exports.setTop = _a.setTop, exports.setLeft = _a.setLeft, exports.clearSelectedAnno = _a.clearSelectedAnno;
const selectCurrAnno = (state) => state.currAnno;
exports.selectCurrAnno = selectCurrAnno;
exports.default = exports.currAnnoSlice.reducer;
//# sourceMappingURL=currAnno.js.map