'use client';

/* Core */
import { Provider } from 'react-redux';
import { reduxStore } from './redux/store';

/* Instruments */

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
