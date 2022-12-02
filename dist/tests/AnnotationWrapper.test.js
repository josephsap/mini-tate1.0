"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const AnnotationWrapper_1 = __importDefault(require("../components/AnnotationWrapper"));
require("@testing-library/jest-dom/extend-expect");
const testUtils_1 = require("../testUtils");
describe('<AnnotationWrapper />', () => {
    test('renders static annotation if not selected', () => {
        const { getByTestId } = (0, testUtils_1.render)(react_2.default.createElement(AnnotationWrapper_1.default, { annotationTypes: ['cat', 'dog'], handleCancelEdit: jest.fn(), handleEditAnnotation: jest.fn(), handlePointerMove: jest.fn(), handleSaveEdit: jest.fn(), height: "20px", left: "20px", name: "annotation of dog", options: {}, removeAnnotation: jest.fn(), top: "20px", type: "cat", width: "20px" }));
        expect(getByTestId('static-annotation')).toBeDefined();
    });
    test('renders annotation in edit mode if selected', () => {
        (0, testUtils_1.renderEditableAnno)();
        expect(react_1.screen.getByTestId('editable-annotation')).toBeDefined();
    });
});
//# sourceMappingURL=AnnotationWrapper.test.js.map