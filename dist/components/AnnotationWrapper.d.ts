/// <reference types="react" />
import { TAnnotation, TOptions } from '../types';
declare type Props = {
    name: string;
    type: string;
    top: string;
    left: string;
    height: string;
    width: string;
    handleEditAnnotation: (name: string) => void;
    handleCancelEdit: () => void;
    handlePointerMove: (event: any) => void;
    handleSaveEdit: (annotation: TAnnotation, originalName: string) => void;
    removeAnnotation: (name: string) => void;
    annotationTypes: string[];
    options: TOptions;
};
declare function AnnotationWrapper({ handleEditAnnotation, name, height, width, top, left, handleCancelEdit, handlePointerMove, handleSaveEdit, removeAnnotation, type, annotationTypes, options, }: Props): JSX.Element;
export default AnnotationWrapper;
