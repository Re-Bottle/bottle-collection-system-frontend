import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

test('website renders and required items are present in home page', () => {
  act(()=>{
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  })

  const linkElement = screen.getByText("Re-Bottle");
  expect(linkElement).toBeTruthy();

  const goHomeLink = screen.getByText("Login");
  expect(goHomeLink).toBeTruthy();
});

test('Onclick Login moves to Login page', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  const goLoginLink = screen.getByText("Login");
  expect(goLoginLink).toBeTruthy();

  await act(async () => {
    userEvent.click(goLoginLink);
  });

  const loginScreenUniqueText = screen.getByText("Don't have an account? Sign up");
  expect(loginScreenUniqueText).toBeTruthy();
});
