"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentImg = exports.useAppSelector = exports.useAppDispatch = void 0;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const useAppDispatch = () => (0, react_redux_1.useDispatch)();
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
const useCurrentImg = () => {
    const [imgRect, setImgRect] = (0, react_1.useState)({ height: 0, width: 0 });
    (0, react_1.useEffect)(() => {
        const resizeListener = () => {
            let newImgRect = { height: 0, width: 0 };
            if (document.getElementById('anno-img')) {
                const { height, width } = document
                    .getElementById('anno-img')
                    .getBoundingClientRect();
                newImgRect = { height, width };
            }
            setImgRect(newImgRect);
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);
    return imgRect;
};
exports.useCurrentImg = useCurrentImg;
//# sourceMappingURL=hooks.js.map