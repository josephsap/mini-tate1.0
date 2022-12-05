// Copyright (c) 2022 Alteryx, Inc. All rights reserved.

import React from 'react';
import { Typography } from '@alteryx/ui';
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
interface TypeStylesInterface {
  account_number?: string;
  invoice_number?: string;
  total_due?: string;
  vendor_name?: string;
  contact_email?: string;
  due_date?: string;
  invoice_date?: string;
  tax_amount?: string;
}

const typeStyles: TypeStylesInterface = {
  account_number: `rgb(155, 59, 136)`,
  contact_email: 'rgb(226, 95, 69)',
  due_date: 'rgb(150, 177, 73)',
  invoice_date: 'rgb(76, 114, 182)',
  invoice_number: 'rgb(0, 94, 70)',
  tax_amount: 'rgb(168, 37, 85)',
  total_due: 'rgb(16, 197, 173)',
  vendor_name: 'rgb(255, 112, 130)'
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

  const styles = options.annoStyles || {};

  return (
    <>
      {type !== 'other' ? (
        <div
          className="staticAnno"
          data-testid="static-annotation"
          onClick={onClick}
          onPointerDown={(e) => e.stopPropagation()}
          style={{ ...styles, height: height + '15px', width: width + '15px', top, left, backgroundColor: `${typeStyles[type]}` }}
        >
          <Typography 
            variant="body1" 
            style={{ 
              margin: 0,
              position: 'absolute',
              top: '-17px',
              left: '-50%',
              color: `${typeStyles[type]}`
            }}
          >
            {type}
          </Typography>
        </div>
      ): null}
    </>
  );
}

export default StaticAnnotation;
