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
interface AnnoBgStylesInterface {
  account_number?: string;
  invoice_number?: string;
  total_due?: string;
  vendor_name?: string;
  contact_email?: string;
  due_date?: string;
  invoice_date?: string;
  tax_amount?: string;
}

const annoBgStyles: AnnoBgStylesInterface = {
  account_number: 'rgba(155, 59, 136, 0.46)',
  contact_email: 'rgba(226, 95, 69, 0.46)',
  due_date: 'rgba(150, 177, 73, 0.46)',
  invoice_date: 'rgba(76, 114, 182, 0.46)',
  invoice_number: 'rgba(0, 94, 70, 0.46)',
  tax_amount: 'rgba(168, 37, 85, 0.46)',
  total_due: 'rgba(16, 197, 173, 0.46)',
  vendor_name: 'rgba(255, 112, 130, 0.46)'
};

const textStyles: AnnoBgStylesInterface = {
  account_number: 'rgba(155, 59, 136, 1)',
  contact_email: 'rgba(226, 95, 69, 1)',
  due_date: 'rgba(150, 177, 73, 1)',
  invoice_date: 'rgba(76, 114, 182, 1)',
  invoice_number: 'rgba(0, 94, 70, 1)',
  tax_amount: 'rgba(168, 37, 85, 1)',
  total_due: 'rgba(16, 197, 173, 1)',
  vendor_name: 'rgba(255, 112, 130, 1)'
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
          style={{ ...styles, height, width, top, left, backgroundColor: `${annoBgStyles[type]}` }}
        >
          <Typography 
            variant="body1" 
            style={{ 
              margin: 0,
              position: 'absolute',
              top: '-17px',
              left: '-50%',
              color: `${textStyles[type]}`
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
