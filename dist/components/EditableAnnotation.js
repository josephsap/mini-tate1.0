"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@alteryx/icons");
const ui_1 = require("@alteryx/ui");
const react_1 = __importDefault(require("react"));
const Form_1 = __importDefault(require("./Form"));
const types_1 = require("../types");
const utils_1 = require("../utils");
function EditableAnnotation({ height, width, top, left, name, type, handleCancelEdit, handleCornerPointerDown, handleCornerPointerUp, handlePointerDown, handlePointerMove, handlePointerUp, handleSaveEdit, removeAnnotation, annotationTypes, options, }) {
    const styles = options.editStyles || {};
    return (react_1.default.createElement(ui_1.ClickAwayListener, { onClickAway: () => handleSaveEdit({ height, width, top, left, name, type }, name) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "editableAnno", "data-testid": "editable-annotation", onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, style: Object.assign(Object.assign({}, styles), { top,
                    left,
                    height,
                    width }) },
                react_1.default.createElement(icons_1.CircleFilled, { "data-testid": "corner-tl", onPointerDown: (e) => handleCornerPointerDown(e, types_1.corner.TOP_LEFT), onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: '-10px',
                        marginLeft: '-10px',
                        color: 'black',
                    } }),
                react_1.default.createElement(icons_1.CircleFilled, { "data-testid": "corner-tr", onPointerDown: (e) => handleCornerPointerDown(e, types_1.corner.TOP_RIGHT), onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: '-10px',
                        marginLeft: `${(0, utils_1.pixelToNum)(width) - 12}px`,
                        color: 'black',
                    } }),
                react_1.default.createElement(icons_1.CircleFilled, { "data-testid": "corner-bl", onPointerDown: (e) => handleCornerPointerDown(e, types_1.corner.BOTTOM_LEFT), onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: `${(0, utils_1.pixelToNum)(height) - 10}px`,
                        marginLeft: '-10px',
                        color: 'black',
                    } }),
                react_1.default.createElement(icons_1.CircleFilled, { "data-testid": "corner-br", onPointerDown: (e) => handleCornerPointerDown(e, types_1.corner.BOTTOM_RIGHT), onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: `${(0, utils_1.pixelToNum)(height) - 10}px`,
                        marginLeft: `${(0, utils_1.pixelToNum)(width) - 12}px`,
                        color: 'black',
                    } })),
            react_1.default.createElement(Form_1.default, { annotationTypes: annotationTypes, handleCancel: handleCancelEdit, handleDelete: removeAnnotation, handleSave: handleSaveEdit, height: height, labels: options.labels || {}, left: left, name: name, top: top, type: type, width: width }))));
}
exports.default = EditableAnnotation;
//# sourceMappingURL=EditableAnnotation.js.map