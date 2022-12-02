/// <reference types="react" />
import { TAnnotationRaw, TOptions } from '../types';
import './styles.css';
export declare type TProps = {
    imageSrc: string;
    annos?: TAnnotationRaw[];
    onChange?: (annos: TAnnotationRaw[]) => any;
    onError?: (error: string) => any;
    annotationTypes?: string[];
    options?: TOptions;
};
export declare function ImageAnnotator({ imageSrc, annos, onChange, onError, annotationTypes, options, }: TProps): JSX.Element;
export declare namespace ImageAnnotator {
    var defaultProps: {
        annos: any;
        annotationTypes: string[];
        onChange: any;
        onError: any;
        options: any[];
    };
}
