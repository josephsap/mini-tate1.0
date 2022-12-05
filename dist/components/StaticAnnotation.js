"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@alteryx/ui");
const typeStyles = {
    account_number: `rgb(155, 59, 136)`,
    contact_email: 'rgb(226, 95, 69)',
    due_date: 'rgb(150, 177, 73)',
    invoice_date: 'rgb(76, 114, 182)',
    invoice_number: 'rgb(0, 94, 70)',
    tax_amount: 'rgb(168, 37, 85)',
    total_due: 'rgb(16, 197, 173)',
    vendor_name: 'rgb(255, 112, 130)'
};
function StaticAnnotation({ height, width, top, left, onClick, options, type, }) {
    const styles = options.annoStyles || {};
    return (react_1.default.createElement(react_1.default.Fragment, null, type !== 'other' ? (react_1.default.createElement("div", { className: "staticAnno", "data-testid": "static-annotation", onClick: onClick, onPointerDown: (e) => e.stopPropagation(), style: Object.assign(Object.assign({}, styles), { height: height + '15px', width: width + '15px', top, left, backgroundColor: `${typeStyles[type]}` }) },
        react_1.default.createElement(ui_1.Typography, { variant: "body1", style: {
                margin: 0,
                position: 'absolute',
                top: '-17px',
                left: '-50%',
                color: `${typeStyles[type]}`
            } }, type))) : null));
}
exports.default = StaticAnnotation;
//# sourceMappingURL=StaticAnnotation.js.map