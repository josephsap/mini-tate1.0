"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@alteryx/ui");
const annoBgStyles = {
    account_number: 'rgba(155, 59, 136, 0.46)',
    contact_email: 'rgba(226, 95, 69, 0.46)',
    due_date: 'rgba(150, 177, 73, 0.46)',
    invoice_date: 'rgba(76, 114, 182, 0.46)',
    invoice_number: 'rgba(0, 94, 70, 0.46)',
    tax_amount: 'rgba(168, 37, 85, 0.46)',
    total_due: 'rgba(16, 197, 173, 0.46)',
    vendor_name: 'rgba(255, 112, 130, 0.46)'
};
const textStyles = {
    account_number: 'rgba(155, 59, 136, 1)',
    contact_email: 'rgba(226, 95, 69, 1)',
    due_date: 'rgba(150, 177, 73, 1)',
    invoice_date: 'rgba(76, 114, 182, 1)',
    invoice_number: 'rgba(0, 94, 70, 1)',
    tax_amount: 'rgba(168, 37, 85, 1)',
    total_due: 'rgba(16, 197, 173, 1)',
    vendor_name: 'rgba(255, 112, 130, 1)'
};
function StaticAnnotation({ height, width, top, left, onClick, options, type, }) {
    const styles = options.annoStyles || {};
    return (react_1.default.createElement(react_1.default.Fragment, null, type !== 'other' ? (react_1.default.createElement("div", { className: "staticAnno", "data-testid": "static-annotation", onClick: onClick, onPointerDown: (e) => e.stopPropagation(), style: Object.assign(Object.assign({}, styles), { height, width, top, left, backgroundColor: `${annoBgStyles[type]}` }) },
        react_1.default.createElement(ui_1.Typography, { variant: "body1", style: {
                margin: 0,
                position: 'absolute',
                top: '-17px',
                left: '-50%',
                color: `${textStyles[type]}`
            } }, type))) : null));
}
exports.default = StaticAnnotation;
//# sourceMappingURL=StaticAnnotation.js.map