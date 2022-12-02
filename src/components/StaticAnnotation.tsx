// Copyright (c) 2022 Alteryx, Inc. All rights reserved.

import React from 'react';

import { TOptions } from '../types';

export type Props = {
  top: string;
  left: string;
  height: string;
  width: string;
  onClick: () => void;
  options: TOptions;
  type: string;
};

function StaticAnnotation({
  height,
  width,
  top,
  left,
  onClick,
  options,
  type,
}: Props) {
  console.log('STATIC ANNO JSAP FORK 1212')
  const styles = options.annoStyles || {};
  return (
    <div>
      <p>{type}</p>
      <div
      className="staticAnno"
      data-testid="static-annotation"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      style={{ ...styles, height, width, top, left }}
      />
    </div>
  );
}

export default StaticAnnotation;
