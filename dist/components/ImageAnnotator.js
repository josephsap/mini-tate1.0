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
exports.ImageAnnotator = void 0;
const ui_1 = require("@alteryx/ui");
const react_1 = __importStar(require("react"));
const hooks_1 = require("../hooks");
const currAnno_1 = require("../store/reducers/currAnno");
const cursor_1 = require("../store/reducers/cursor");
const modes_1 = require("../store/reducers/modes");
const types_1 = require("../types");
const utils_1 = require("../utils");
const AnnotationWrapper_1 = __importDefault(require("./AnnotationWrapper"));
const Form_1 = __importDefault(require("./Form"));
require("./styles.css");
function ImageAnnotator({ imageSrc, annos, onChange, onError, annotationTypes, options = {}, }) {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const imgRect = (0, hooks_1.useCurrentImg)();
    const { edit, drag, cornerDrag } = (0, hooks_1.useAppSelector)(modes_1.selectMode);
    const { selectedAnno, selectedCorner, updatedCoords } = (0, hooks_1.useAppSelector)(currAnno_1.selectCurrAnno);
    const { coords } = (0, hooks_1.useAppSelector)(cursor_1.selectCursor);
    const [drawingMode, setDrawingMode] = (0, react_1.useState)(false);
    const [boundary, setBoundary] = (0, react_1.useState)(null);
    const [origin, setOrigin] = (0, react_1.useState)([0, 0]);
    const [displayForm, setDisplayForm] = (0, react_1.useState)(false);
    const [annotations, setAnnotations] = (0, react_1.useState)([]);
    const [imgRatio, setImgRatio] = (0, react_1.useState)(imgRect);
    const [imgLoaded, setImgLoaded] = (0, react_1.useState)(false);
    const [rawAnnos, setRawAnnos] = (0, react_1.useState)(annos || []);
    (0, react_1.useEffect)(() => {
        setImgRatio(imgRect);
    }, [imgRect]);
    (0, react_1.useEffect)(() => {
        if (imgLoaded)
            setAnnotations((0, utils_1.rawToCSSAnno)(rawAnnos, imgRatio.height, imgRatio.width));
    }, [rawAnnos, imgLoaded, imgRatio.height, imgRatio.width]);
    (0, react_1.useEffect)(() => {
        const img = document.getElementById('anno-img');
        if (options.imgStyles && img) {
            const { height, width } = img.getBoundingClientRect();
            setImgRatio({ height, width });
        }
    }, [options.imgStyles]);
    (0, react_1.useEffect)(() => {
        if (annos)
            setRawAnnos(annos);
        dispatch((0, currAnno_1.clearSelectedAnno)());
        dispatch((0, modes_1.setEdit)(false));
    }, [annos]);
    const createNewBoundary = (x, y) => {
        const newBoundary = document.createElement('div');
        const image = document.getElementById('anno-img').getBoundingClientRect();
        newBoundary.style.top = `${y - image.y}px`;
        newBoundary.style.left = `${x - image.x}px`;
        newBoundary.style.borderWidth = '3px';
        newBoundary.style.borderStyle = 'solid';
        newBoundary.style.position = 'absolute';
        newBoundary.style.boxSizing = 'border-box';
        newBoundary.style.backgroundColor = 'rgba(255, 112, 130, .4)';
        newBoundary.setAttribute('data-testid', 'new-annotation');
        if (options.annoStyles) {
            Object.keys(options.annoStyles).forEach((key) => {
                newBoundary.style[key] = options.annoStyles[key];
            });
        }
        document.getElementById('anno-container').appendChild(newBoundary);
        setOrigin([x, y]);
        setBoundary(newBoundary);
        setDrawingMode(true);
        newBoundary.addEventListener('pointerup', () => {
            if (newBoundary.style.width === '') {
                newBoundary.remove();
                setDrawingMode(false);
                return;
            }
            setDrawingMode(false);
            setDisplayForm(true);
        });
    };
    const handleEditAnnotation = (name) => {
        const newSelectedAnno = annotations.find((a) => a.name === name);
        if (selectedAnno !== null && selectedAnno !== newSelectedAnno) {
            dispatch((0, currAnno_1.clearSelectedAnno)());
            dispatch((0, modes_1.setEdit)(false));
            return;
        }
        dispatch((0, modes_1.setEdit)(true));
        dispatch((0, currAnno_1.setSelectedAnno)(newSelectedAnno));
    };
    // expects screen coordinates (clientX and clientY from the event)
    // calculates if those screen coordinates are within the bounds of the visible image
    const pointOutOfBounds = (x, y) => {
        const imgBounds = document
            .getElementById('anno-img')
            .getBoundingClientRect();
        const containerBounds = document.getElementById('anno-container').parentNode.getBoundingClientRect();
        const top = Math.max(imgBounds.top, containerBounds.top);
        const bottom = Math.min(imgBounds.bottom, containerBounds.bottom);
        const right = Math.min(imgBounds.right, containerBounds.right);
        const left = Math.max(imgBounds.left, containerBounds.left);
        return x < left || x > right || y < top || y > bottom;
    };
    const dragBoundary = (x, y) => {
        if (pointOutOfBounds(x, y))
            return;
        const image = document.getElementById('anno-img').getBoundingClientRect();
        if (boundary) {
            if (x < origin[0]) {
                boundary.style.left = `${x - image.x}px`;
                boundary.style.width = `${origin[0] - x}px`;
            }
            else {
                boundary.style.width = `${x - origin[0]}px`;
            }
            if (y < origin[1]) {
                boundary.style.top = `${y - image.y}px`;
                boundary.style.height = `${origin[1] - y}px`;
            }
            else {
                boundary.style.height = `${y - origin[1]}px`;
            }
        }
    };
    const addAnnotation = (annotation, { name, type }) => {
        const newAnnotation = {
            height: annotation.style.height,
            width: annotation.style.width,
            top: annotation.style.top,
            left: annotation.style.left,
            name,
            type,
        };
        if (annotations.find((a) => a.name === name)) {
            annotation.remove();
            if (onError)
                onError(types_1.errorTypes.DUPLICATE);
            return;
        }
        if (name === '') {
            annotation.remove();
            if (onError)
                onError(types_1.errorTypes.BLANK);
            return;
        }
        if (onChange)
            onChange((0, utils_1.cssToRawAnno)([...annotations, newAnnotation], imgRatio.height, imgRatio.width));
        setRawAnnos((0, utils_1.cssToRawAnno)([...annotations, newAnnotation], imgRatio.height, imgRatio.width));
        setAnnotations([...annotations, newAnnotation]);
        annotation.remove();
    };
    const removeAnnotation = (name) => {
        const newAnnotations = annotations.filter((a) => a.name !== name);
        setRawAnnos((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
        setAnnotations(newAnnotations);
        dispatch((0, modes_1.setEdit)(false));
        dispatch((0, currAnno_1.clearSelectedAnno)());
        if (onChange)
            onChange((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
    };
    const handleCancelEdit = () => {
        dispatch((0, modes_1.setEdit)(false));
        dispatch((0, currAnno_1.clearSelectedAnno)());
    };
    const handleSaveEdit = ({ height, width, top, left, name, type }, originalName) => {
        if (name !== originalName && annotations.find((a) => a.name === name)) {
            if (onError)
                onError(types_1.errorTypes.DUPLICATE);
        }
        else if (name === '') {
            if (onError)
                onError(types_1.errorTypes.BLANK);
        }
        else {
            const updatedAnno = { height, width, top, left, name, type };
            const newAnnotations = annotations.map((a) => {
                if (a.name === selectedAnno.name)
                    return updatedAnno;
                return a;
            });
            setAnnotations(newAnnotations);
            setRawAnnos((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
            if (onChange)
                onChange((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
        }
        dispatch((0, modes_1.setEdit)(false));
        dispatch((0, currAnno_1.clearSelectedAnno)());
    };
    const handleCornerPointerMove = (e) => {
        if (!cornerDrag)
            return;
        const { clientX, clientY } = e;
        let newWidth;
        let newHeight;
        switch (selectedCorner) {
            case types_1.corner.TOP_LEFT:
                newWidth = coords[0] - clientX + (0, utils_1.pixelToNum)(updatedCoords.width);
                newHeight = coords[1] - clientY + (0, utils_1.pixelToNum)(updatedCoords.height);
                if (newWidth <= 0 || newHeight <= 0)
                    return;
                dispatch((0, currAnno_1.setLeft)(`${(0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0])}px`));
                dispatch((0, currAnno_1.setTop)(`${(0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1])}px`));
                break;
            case types_1.corner.TOP_RIGHT:
                newWidth = clientX - coords[0] + (0, utils_1.pixelToNum)(updatedCoords.width);
                newHeight = coords[1] - clientY + (0, utils_1.pixelToNum)(updatedCoords.height);
                if (newWidth <= 0 || newHeight <= 0)
                    return;
                dispatch((0, currAnno_1.setTop)(`${(0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1])}px`));
                break;
            case types_1.corner.BOTTOM_LEFT:
                newWidth = coords[0] - clientX + (0, utils_1.pixelToNum)(updatedCoords.width);
                newHeight = clientY - coords[1] + (0, utils_1.pixelToNum)(updatedCoords.height);
                if (newWidth <= 0 || newHeight <= 0)
                    return;
                dispatch((0, currAnno_1.setLeft)(`${(0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0])}px`));
                break;
            case types_1.corner.BOTTOM_RIGHT:
                newWidth = clientX - coords[0] + (0, utils_1.pixelToNum)(updatedCoords.width);
                newHeight = clientY - coords[1] + (0, utils_1.pixelToNum)(updatedCoords.height);
                if (newWidth <= 0 || newHeight <= 0)
                    return;
                break;
            default:
                return;
        }
        dispatch((0, currAnno_1.setWidth)(`${newWidth}px`));
        dispatch((0, currAnno_1.setHeight)(`${newHeight}px`));
        dispatch((0, cursor_1.setCoords)([clientX, clientY]));
    };
    const handleDrag = (e) => {
        if (drag) {
            const { clientX, clientY } = e;
            const imgBounds = document
                .getElementById('anno-img')
                .getBoundingClientRect();
            const newLeft = (0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0]);
            const newTop = (0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1]);
            const screenX = newLeft + imgBounds.x;
            const screenY = newTop + imgBounds.y;
            if (pointOutOfBounds(screenX, screenY))
                return;
            if (pointOutOfBounds(screenX + (0, utils_1.pixelToNum)(updatedCoords.width), screenY + (0, utils_1.pixelToNum)(updatedCoords.height)))
                return;
            dispatch((0, currAnno_1.setLeft)(`${newLeft}px`));
            dispatch((0, currAnno_1.setTop)(`${newTop}px`));
            dispatch((0, cursor_1.setCoords)([clientX, clientY]));
        }
    };
    const handlePointerMove = (e) => {
        const { clientX, clientY } = e;
        if (!cornerDrag && !drag)
            return;
        if (Number.isNaN(+clientX) || Number.isNaN(+clientY))
            return;
        if (pointOutOfBounds(+clientX, +clientY))
            return;
        if (cornerDrag)
            handleCornerPointerMove(e);
        if (drag)
            handleDrag(e);
    };
    return (react_1.default.createElement(ui_1.AyxAppWrapper, null,
        react_1.default.createElement("div", { "data-testid": "container", id: "anno-container", onPointerDown: (e) => {
                if (drawingMode || edit || displayForm)
                    return;
                setDrawingMode(true);
                createNewBoundary(e.clientX, e.clientY);
            }, onPointerMove: (e) => {
                if (drawingMode)
                    dragBoundary(e.clientX, e.clientY);
            }, onPointerUp: () => {
                if (drawingMode) {
                    setDrawingMode(false);
                    setDisplayForm(true);
                }
            }, style: {
                touchAction: 'none',
                display: 'inline-block',
                position: 'relative',
            } },
            react_1.default.createElement("img", { alt: "", draggable: "false", id: "anno-img", onLoad: (e) => {
                    const { height, width } = e.target.getBoundingClientRect();
                    setImgRatio({ height, width });
                    setImgLoaded(true);
                }, onPointerMove: handlePointerMove, src: imageSrc, style: options.imgStyles ? options.imgStyles : {} }),
            annotations.map((annotation) => (react_1.default.createElement(AnnotationWrapper_1.default, Object.assign({ annotationTypes: annotationTypes, handleCancelEdit: handleCancelEdit, handleEditAnnotation: handleEditAnnotation, handlePointerMove: handlePointerMove, handleSaveEdit: handleSaveEdit, key: annotation.name, options: options, removeAnnotation: removeAnnotation }, annotation)))),
            displayForm && (react_1.default.createElement(Form_1.default, { annotationTypes: annotationTypes, handleCancel: () => {
                    boundary.remove();
                    setDisplayForm(false);
                }, handleDelete: null, handleSave: (newAnnotation) => {
                    setDisplayForm(false);
                    addAnnotation(boundary, newAnnotation);
                }, height: boundary.style.height, labels: options.labels || {}, left: boundary.style.left, name: "", top: boundary.style.top, type: annotationTypes.length ? annotationTypes[0] : '', width: boundary.style.width })))));
}
exports.ImageAnnotator = ImageAnnotator;
ImageAnnotator.defaultProps = {
    annos: null,
    annotationTypes: ['string', 'image', 'table'],
    onChange: null,
    onError: null,
    options: [],
};
//# sourceMappingURL=ImageAnnotator.js.map