"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom/extend-expect");
const react_2 = __importDefault(require("react"));
const testUtils_1 = require("../testUtils");
const ImageAnnotator_1 = require("../components/ImageAnnotator");
const testAnnos = [
    {
        name: 'test',
        type: 'string',
        x: 0.2,
        y: 0.2,
        w: 0.2,
        h: 0.2,
    },
    {
        name: 'test2',
        type: 'string',
        x: 0.007936507936507936,
        y: 0.20422004521477016,
        w: 0.23412698412698413,
        h: 0.08590806330067823,
    },
];
const renderAnnoAndSelect = () => {
    (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "fake.png" }), {});
    react_1.screen.getByRole('img').getBoundingClientRect = () => ({
        width: 100,
        height: 100,
        bottom: 100,
        left: 0,
        top: 0,
        right: 100,
        x: 0,
        y: 0,
        toJSON: null,
    });
    react_1.screen.getByTestId('container').parentNode.getBoundingClientRect = () => ({
        width: 100,
        height: 100,
        bottom: 100,
        left: 0,
        top: 0,
        right: 100,
        x: 0,
        y: 0,
        toJSON: null,
    });
    react_1.fireEvent.load(react_1.screen.getByRole('img'));
    react_1.fireEvent.click(react_1.screen.getByTestId('static-annotation'));
};
describe('<ImmageAnnotator />', () => {
    test('renders image', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.getByRole('img')).toBeDefined();
    });
    test('has no annotations to start', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.queryByTestId('new-annotation')).toBeNull();
    });
    test('pointerDown creates new annotation', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        const el = react_1.screen.getByTestId('new-annotation');
        expect(el).not.toBeNull();
    });
    test('creating new annotation brings up form', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (let i = 1; i <= 20; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        expect(react_1.screen.getAllByRole('button')).toHaveLength(2);
    });
    test('form is hidden by default', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.queryAllByRole('button')).toHaveLength(0);
    });
    test('renders annotations if initialized with annos', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: testAnnos, imageSrc: "" }));
        react_1.fireEvent.load(react_1.screen.getByRole('img'));
        expect(react_1.screen.queryAllByTestId('static-annotation')).toHaveLength(2);
    });
    test('filling out form creates new static annotation', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (let i = 1; i <= 100; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.type(textBox, 'ANNOTATION NAME');
        react_1.fireEvent.click(react_1.screen.getByText('Save'));
        expect(react_1.screen.queryAllByTestId('static-annotation')).toHaveLength(1);
    });
    test('saving new annotation triggers onChange function', () => {
        const mockOnChange = jest.fn();
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "", onChange: mockOnChange }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (let i = 1; i <= 100; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.type(textBox, 'ANNOTATION NAME');
        react_1.fireEvent.click(react_1.screen.getByText('Save'));
        expect(mockOnChange).toBeCalled();
    });
    test('form dropdown defaults to first entry in type array', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        expect(react_1.screen.getByText('string')).not.toBeNull();
    });
    test('form dropdown defaults to first entry in type array even when passed custom options', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annotationTypes: ['cat', 'dog', 'banana'], imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        expect(react_1.screen.getByText('cat')).not.toBeNull();
    });
    test('clicking on static annotation puts it into edit mode', () => {
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (let i = 1; i <= 100; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.type(textBox, 'ANNOTATION NAME');
        react_1.fireEvent.click(react_1.screen.getByText('Save'));
        const staticAnno = react_1.screen.getByTestId('static-annotation');
        user_event_1.default.click(staticAnno);
        expect(react_1.screen.getByTestId('editable-annotation')).toBeDefined();
    });
    test('editing name of created annotation updates the annotation name', () => {
        const mockOnChange = jest.fn();
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
        react_1.fireEvent.load(react_1.screen.getByRole('img'));
        const staticAnno = react_1.screen.getByTestId('static-annotation');
        user_event_1.default.click(staticAnno);
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.clear(textBox);
        user_event_1.default.type(textBox, 'UPDATED NAME');
        user_event_1.default.click(react_1.screen.getByText('Save'));
        const newAnno = Object.assign(Object.assign({}, testAnnos[0]), { name: 'UPDATED NAME', h: NaN, w: NaN, x: NaN, y: NaN });
        expect(mockOnChange).toHaveBeenNthCalledWith(1, [newAnno]);
    });
    test('deleting annotation removes it from list', () => {
        const mockOnChange = jest.fn();
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
        react_1.fireEvent.load(react_1.screen.getByRole('img'));
        const staticAnno = react_1.screen.getByTestId('static-annotation');
        user_event_1.default.click(staticAnno);
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.clear(textBox);
        user_event_1.default.type(textBox, 'UPDATED NAME');
        user_event_1.default.click(react_1.screen.getByText('Delete'));
        expect(mockOnChange).toHaveBeenNthCalledWith(1, []);
    });
    test('editing name of created annotation then cancelling does not update the annotation', () => {
        const mockOnChange = jest.fn();
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
        react_1.fireEvent.load(react_1.screen.getByRole('img'));
        const staticAnno = react_1.screen.getByTestId('static-annotation');
        user_event_1.default.click(staticAnno);
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.clear(textBox);
        user_event_1.default.type(textBox, 'UPDATED NAME');
        user_event_1.default.click(react_1.screen.getByText('Cancel'));
        expect(mockOnChange).toHaveBeenCalledTimes(0);
    });
    test('reusing name calls onError function and does not create new annotation', () => {
        const mockOnError = jest.fn();
        (0, testUtils_1.render)(react_2.default.createElement(ImageAnnotator_1.ImageAnnotator, { annos: testAnnos, imageSrc: "", onError: mockOnError }));
        react_1.fireEvent.load(react_1.screen.getByRole('img'));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (let i = 1; i <= 20; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        const inputs = react_1.screen.getAllByRole('textbox');
        const textBox = inputs.find((input) => input.id === 'annotation-name');
        user_event_1.default.clear(textBox);
        user_event_1.default.type(textBox, 'test');
        react_1.fireEvent.click(react_1.screen.getByText('Save'));
        expect(react_1.screen.getAllByTestId('static-annotation')).toHaveLength(2);
        expect(mockOnError).toBeCalled();
    });
    test('dragging annotation moves the coordinates', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerDownEvt);
        for (let i = 20; i <= 50; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', i, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId('editable-annotation')).toHaveStyle(`left: 50px`);
    });
    test('dragging corner of annotation adjusts the width', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-tl';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        for (let i = 20; i >= 0; i--) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', i, 20);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`width: 40px`);
    });
    test('dragging top left corner of annotation adjusts the height', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-tl';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        for (let i = 20; i >= 0; i--) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', 20, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`height: 40px`);
    });
    test('dragging top right corner of annotation adjusts the width', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-tr';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        for (let i = 20; i <= 50; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', i, 20);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`width: 50px`);
    });
    test('dragging bottom right corner of annotation adjusts the height', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-br';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        for (let i = 20; i <= 50; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', 20, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`height: 50px`);
    });
    test('dragging bottom left corner of annotation adjusts the height', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-bl';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        for (let i = 20; i <= 60; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', 20, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`height: 60px`);
    });
    test('pointerUp on annotation stops drag event', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerDownEvt);
        const pointerUpEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerUp', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerUpEvt);
        for (let i = 20; i <= 50; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', i, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId('editable-annotation')).toHaveStyle(`left: 20px`);
    });
    test('pointerUp on corner stops corner drag event', () => {
        renderAnnoAndSelect();
        const ANNO = 'editable-annotation';
        const CORNER = 'corner-bl';
        const pointerDownEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerDown', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerDownEvt);
        const pointerUpEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(CORNER), 'pointerUp', 20, 20);
        (0, react_1.fireEvent)(react_1.screen.getByTestId(CORNER), pointerUpEvt);
        for (let i = 20; i <= 60; i++) {
            const pointerMoveEvt = (0, testUtils_1.genCustomEvt)(react_1.screen.getByTestId(ANNO), 'pointerMove', 20, i);
            (0, react_1.fireEvent)(react_1.screen.getByTestId(ANNO), pointerMoveEvt);
        }
        expect(react_1.screen.getByTestId(ANNO)).toHaveStyle(`height: 20px`);
    });
});
//# sourceMappingURL=ImageAnnotator.test.js.map