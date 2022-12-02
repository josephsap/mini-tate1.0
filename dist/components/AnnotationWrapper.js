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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const EditableAnnotation_1 = __importDefault(require("./EditableAnnotation"));
const StaticAnnotation_1 = __importDefault(require("./StaticAnnotation"));
const modes_1 = require("../store/reducers/modes");
const hooks_1 = require("../hooks");
const currAnno_1 = require("../store/reducers/currAnno");
const cursor_1 = require("../store/reducers/cursor");
function AnnotationWrapper({ handleEditAnnotation, name, height, width, top, left, handleCancelEdit, handlePointerMove, handleSaveEdit, removeAnnotation, type, annotationTypes, options, }) {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { selectedAnno, updatedCoords } = (0, hooks_1.useAppSelector)(currAnno_1.selectCurrAnno);
    const editMode = name === (selectedAnno === null || selectedAnno === void 0 ? void 0 : selectedAnno.name);
    (0, react_1.useEffect)(() => {
        dispatch((0, currAnno_1.setWidth)(width));
        dispatch((0, currAnno_1.setHeight)(height));
        dispatch((0, currAnno_1.setTop)(top));
        dispatch((0, currAnno_1.setLeft)(left));
    }, [top, left, height, width]);
    const handlePointerDown = (e) => {
        e.preventDefault();
        dispatch((0, modes_1.setDrag)(true));
        dispatch((0, cursor_1.setCoords)([e.clientX, e.clientY]));
    };
    const handlePointerUp = () => {
        dispatch((0, modes_1.setDrag)(false));
    };
    const handleCornerPointerDown = (e, selectedCorner) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch((0, modes_1.setCornerDrag)(true));
        dispatch((0, cursor_1.setCoords)([e.clientX, e.clientY]));
        dispatch((0, currAnno_1.setSelectedCorner)(selectedCorner));
    };
    const handleCornerPointerUp = (e) => {
        e.stopPropagation();
        dispatch((0, modes_1.setCornerDrag)(false));
        dispatch((0, currAnno_1.setSelectedCorner)(''));
    };
    const AnnotationToEdit = react_1.default.forwardRef(() => (react_1.default.createElement(EditableAnnotation_1.default, { annotationTypes: annotationTypes, handleCancelEdit: () => {
            handleCancelEdit();
            dispatch((0, currAnno_1.setTop)(top));
            dispatch((0, currAnno_1.setWidth)(width));
            dispatch((0, currAnno_1.setLeft)(left));
            dispatch((0, currAnno_1.setHeight)(height));
        }, handleCornerPointerDown: handleCornerPointerDown, handleCornerPointerUp: handleCornerPointerUp, handlePointerDown: handlePointerDown, handlePointerMove: handlePointerMove, handlePointerUp: handlePointerUp, handleSaveEdit: (anno, originalName) => {
            handleSaveEdit(Object.assign(Object.assign({}, anno), { height: updatedCoords.height, width: updatedCoords.width, top: updatedCoords.top, left: updatedCoords.left }), originalName);
            dispatch((0, modes_1.setDrag)(false));
            dispatch((0, modes_1.setCornerDrag)(false));
            dispatch((0, currAnno_1.setSelectedCorner)(''));
        }, height: updatedCoords.height, left: updatedCoords.left, name: name, options: options, removeAnnotation: removeAnnotation, top: updatedCoords.top, type: type, width: updatedCoords.width })));
    if (editMode)
        return react_1.default.createElement(AnnotationToEdit, null);
    return (react_1.default.createElement(StaticAnnotation_1.default, { height: height, left: left, onClick: () => handleEditAnnotation(name), options: options, top: top, width: width }));
}
exports.default = AnnotationWrapper;
//# sourceMappingURL=AnnotationWrapper.js.map