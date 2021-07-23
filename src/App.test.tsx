import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert,{ BaseAlertProps } from './components/Alert/alert';


const AlertProps:BaseAlertProps = {
  type:'success',
  title:'Success',
  desc: 'Success Description',
}
test('renders learn react link', () => {
  render(<Alert {...AlertProps} />);
  const AlertElement = screen.getByText('Success');
  expect(AlertElement).toBeInTheDocument();
});
