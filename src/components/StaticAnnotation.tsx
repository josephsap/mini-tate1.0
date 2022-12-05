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
  account_number: 'rgba(155, 59, 136, 0.4)',
  contact_email: 'rgba(226, 95, 69, 0.4)',
  due_date: 'rgba(150, 177, 73, 0.4)',
  invoice_date: 'rgba(76, 114, 182, 0.4)',
  invoice_number: 'rgba(0, 94, 70, 0.4)',
  tax_amount: 'rgba(168, 37, 85, 0.4)',
  total_due: 'rgba(16, 197, 173, 0.4)',
  vendor_name: 'rgba(255, 112, 130, 0.4)'
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
      <div
      className="staticAnno"
      data-testid="static-annotation"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      style={{ ...styles, height, width, top, left, padding: '10px',  backgroundColor: `${typeStyles[type]}` }}
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
  );
}

export default StaticAnnotation;
