"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function StaticAnnotation({ height, width, top, left, onClick, options, type, }) {
    console.log('STATIC ANNO JSAP FORK 1212');
    const styles = options.annoStyles || {};
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null, type),
        react_1.default.createElement("div", { className: "staticAnno", "data-testid": "static-annotation", onClick: onClick, onPointerDown: (e) => e.stopPropagation(), style: Object.assign(Object.assign({}, styles), { height, width, top, left }) })));
}
exports.default = StaticAnnotation;
//# sourceMappingURL=StaticAnnotation.js.map