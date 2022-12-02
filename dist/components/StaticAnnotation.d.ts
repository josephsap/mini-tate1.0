/// <reference types="react" />
import { TOptions } from '../types';
export declare type Props = {
    top: string;
    left: string;
    height: string;
    width: string;
    onClick: () => void;
    options: TOptions;
};
declare function StaticAnnotation({ height, width, top, left, onClick, options, }: Props): JSX.Element;
export default StaticAnnotation;
