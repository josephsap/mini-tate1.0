"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAnnotatorWrapper = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = require("../store/store");
const ImageAnnotator_1 = require("./ImageAnnotator");
function ImageAnnotatorWrapper(props) {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
        react_1.default.createElement(ImageAnnotator_1.ImageAnnotator, Object.assign({}, props))));
}
exports.ImageAnnotatorWrapper = ImageAnnotatorWrapper;
//# sourceMappingURL=index.js.map