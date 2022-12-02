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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.renderEditableAnno = exports.testAnno = exports.genCustomEvt = void 0;
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const react_3 = require("@testing-library/react");
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const modes_1 = __importDefault(require("./store/reducers/modes"));
const currAnno_1 = __importDefault(require("./store/reducers/currAnno"));
const cursor_1 = __importDefault(require("./store/reducers/cursor"));
const AnnotationWrapper_1 = __importDefault(require("./components/AnnotationWrapper"));
const genCustomEvt = (target, eventType, x, y) => {
    let evt;
    switch (eventType) {
        case 'pointerDown':
            evt = react_1.createEvent.pointerDown(target);
            break;
        case 'pointerMove':
            evt = react_1.createEvent.pointerMove(target);
            break;
        case 'pointerUp':
            evt = react_1.createEvent.pointerUp(target);
            break;
        default:
            throw Error('eventType not supported');
    }
    Object.defineProperties(evt, {
        clientX: {
            value: x,
        },
        clientY: {
            value: y,
        },
    });
    return evt;
};
exports.genCustomEvt = genCustomEvt;
exports.testAnno = {
    name: 'test',
    type: 'cat',
    top: '20px',
    left: '20px',
    width: '20px',
    height: '20px',
};
const renderEditableAnno = () => (0, exports.render)(react_2.default.createElement(AnnotationWrapper_1.default, { annotationTypes: ['cat', 'dog'], handleCancelEdit: jest.fn(), handleEditAnnotation: jest.fn(), handlePointerMove: jest.fn(), handleSaveEdit: jest.fn(), height: "20px", left: "20px", name: exports.testAnno.name, options: {}, removeAnnotation: jest.fn(), top: "20px", type: "cat", width: "20px" }), {
    preloadedState: {
        currAnno: {
            selectedAnno: exports.testAnno,
            updatedCoords: {
                width: exports.testAnno.width,
                height: exports.testAnno.height,
                top: exports.testAnno.top,
                left: exports.testAnno.left,
            },
        },
    },
});
exports.renderEditableAnno = renderEditableAnno;
const render = (ui, _a = {}) => {
    var { preloadedState = {}, store = (0, toolkit_1.configureStore)({
        reducer: {
            mode: modes_1.default,
            currAnno: currAnno_1.default,
            cursor: cursor_1.default,
        },
        preloadedState,
    }) } = _a, renderOptions = __rest(_a, ["preloadedState", "store"]);
    function Wrapper({ children }) {
        return react_2.default.createElement(react_redux_1.Provider, { store: store }, children);
    }
    return (0, react_3.render)(ui, Object.assign({ wrapper: Wrapper }, renderOptions));
};
exports.render = render;
__exportStar(require("@testing-library/react"), exports);
//# sourceMappingURL=testUtils.js.map