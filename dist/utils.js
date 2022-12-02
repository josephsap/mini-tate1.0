"use strict";
// Copyright (c) 2022 Alteryx, Inc. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssToRawAnno = exports.rawToCSSAnno = exports.pixelToNum = void 0;
const pixelToNum = (pixelStr) => +pixelStr.substring(0, pixelStr.length - 2);
exports.pixelToNum = pixelToNum;
const rawToCSSAnno = (rawAnnos, imgHeight, imgWidth) => rawAnnos.map((anno) => ({
    left: `${anno.x * imgWidth}px`,
    top: `${anno.y * imgHeight}px`,
    width: `${anno.w * imgWidth}px`,
    height: `${anno.h * imgHeight}px`,
    name: anno.name,
    type: anno.type,
}));
exports.rawToCSSAnno = rawToCSSAnno;
const cssToRawAnno = (cssAnnos, imgHeight, imgWidth) => cssAnnos.map((anno) => ({
    x: (0, exports.pixelToNum)(anno.left) / imgWidth,
    y: (0, exports.pixelToNum)(anno.top) / imgHeight,
    w: (0, exports.pixelToNum)(anno.width) / imgWidth,
    h: (0, exports.pixelToNum)(anno.height) / imgHeight,
    name: anno.name,
    type: anno.type,
}));
exports.cssToRawAnno = cssToRawAnno;
//# sourceMappingURL=utils.js.map