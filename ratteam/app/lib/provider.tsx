'use client';

/* Core */
import { PropsWithChildren } from 'react';

import { reduxStore } from './redux/store';
import { Provider } from 'react-redux';
import React from 'react';

/* Instruments */

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
