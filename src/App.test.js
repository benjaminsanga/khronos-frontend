import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MyButton from '../components/MyButton'; // Adjust path as needed

test('button click changes text', () => {
  render(<MyButton />);
  const buttonElement = screen.getByRole('button');
  
  expect(buttonElement).toHaveTextContent('Click me');
  
  fireEvent.click(buttonElement);
  
  expect(buttonElement).toHaveTextContent('Clicked!');
});
