import React from 'react';
import Bundle from '../utils/Bundle';

const LoginAsync = {
  component: () => import('./Login'),
}

export const Login = (props) => {
  return <Bundle load={LoginAsync}>{(PageComp) => <PageComp {...props} />}</Bundle>
}

