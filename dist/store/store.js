"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const modes_1 = __importDefault(require("./reducers/modes"));
const currAnno_1 = __importDefault(require("./reducers/currAnno"));
const cursor_1 = __importDefault(require("./reducers/cursor"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        mode: modes_1.default,
        currAnno: currAnno_1.default,
        cursor: cursor_1.default,
    },
});
//# sourceMappingURL=store.js.map