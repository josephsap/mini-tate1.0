import { PayloadAction } from '@reduxjs/toolkit';
import { TAnnotation } from '../../types';
import type { RootState } from '../store';
export interface ICurrAnnoState {
    selectedAnno: TAnnotation | null;
    selectedCorner: string;
    updatedCoords: {
        width?: string;
        height?: string;
        top?: string;
        left?: string;
    };
}
export declare const currAnnoSlice: import("@reduxjs/toolkit").Slice<ICurrAnnoState, {
    setSelectedAnno: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<TAnnotation>) => void;
    clearSelectedAnno: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>) => void;
    setSelectedCorner: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setWidth: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setHeight: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setTop: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
    setLeft: (state: import("immer/dist/internal").WritableDraft<ICurrAnnoState>, action: PayloadAction<string>) => void;
}, "currAnno">;
export declare const setSelectedAnno: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<TAnnotation, string>, setSelectedCorner: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, setWidth: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, setHeight: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, setTop: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, setLeft: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, clearSelectedAnno: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const selectCurrAnno: (state: RootState) => ICurrAnnoState;
declare const _default: import("redux").Reducer<ICurrAnnoState, import("redux").AnyAction>;
export default _default;
