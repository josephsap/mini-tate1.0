"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("@alteryx/ui");
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
function Form({ name, type, top, left, height, width, handleSave, handleCancel, handleDelete, annotationTypes, labels, }) {
    const [values, setValues] = (0, react_1.useState)({ name, type });
    const selectOptions = annotationTypes.map((opt) => ({
        value: opt,
        label: opt,
    }));
    const { nameLabel, typeLabel, saveLabel, cancelLabel, deleteLabel } = labels;
    const handleChange = (changeKey) => (event) => {
        setValues(Object.assign(Object.assign({}, values), { [changeKey]: event.target.value }));
    };
    return (react_1.default.createElement(ui_1.Card, { style: {
            top: `${(0, utils_1.pixelToNum)(top) + (0, utils_1.pixelToNum)(height) + 10}px`,
            left,
            position: 'absolute',
            zIndex: '1',
        } },
        react_1.default.createElement(ui_1.CardContent, null,
            react_1.default.createElement(ui_1.Grid, { container: true, spacing: 4 },
                react_1.default.createElement(ui_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(ui_1.FormControl, null,
                        react_1.default.createElement(ui_1.InputLabel, null, nameLabel || 'Annotation Name'),
                        react_1.default.createElement(ui_1.Input, { id: "annotation-name", onChange: handleChange('name'), value: values.name }))),
                react_1.default.createElement(ui_1.Grid, { item: true, xs: 12 },
                    react_1.default.createElement(ui_1.FormControl, null,
                        react_1.default.createElement(ui_1.InputLabel, null, typeLabel || 'Annotation Type'),
                        react_1.default.createElement(ui_1.NativeSelect, { onChange: handleChange('type'), value: values.type }, selectOptions.map((option) => (react_1.default.createElement("option", { key: option.value, value: option.value }, option.label)))))))),
        react_1.default.createElement(ui_1.CardActions, null,
            react_1.default.createElement(ui_1.Button, { color: "primary", onClick: () => handleSave({
                    top,
                    left,
                    height,
                    width,
                    name: values.name,
                    type: values.type,
                }, name), variant: "contained" }, saveLabel || 'Save'),
            react_1.default.createElement(ui_1.Button, { color: "secondary", onClick: handleCancel, variant: "contained" }, cancelLabel || 'Cancel'),
            handleDelete && (react_1.default.createElement(ui_1.Button, { id: "removeAnnoBtn", onClick: () => handleDelete(name), variant: "contained" }, deleteLabel || 'Delete')))));
}
exports.default = Form;
//# sourceMappingURL=Form.js.map