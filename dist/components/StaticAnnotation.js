"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@alteryx/ui");
function StaticAnnotation({ height, width, top, left, onClick, options, type, }) {
    console.log(type, 'afjasdkljfkla');
    const styles = options.annoStyles || {};
    return (react_1.default.createElement("div", { className: "staticAnno", "data-testid": "static-annotation", onClick: onClick, onPointerDown: (e) => e.stopPropagation(), style: Object.assign(Object.assign({}, styles), { height, width, top, left }) },
        react_1.default.createElement(ui_1.Typography, { variant: "body1", style: {
                margin: 0,
                position: 'absolute',
                top: '-17px',
                left: '-50%'
            } }, type)));
}
exports.default = StaticAnnotation;
//# sourceMappingURL=StaticAnnotation.js.map