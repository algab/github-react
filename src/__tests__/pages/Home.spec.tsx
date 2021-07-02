import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Context from '../../contexts';
import Home from '../../pages/Home';

import users from '../json/users.json';

describe('Testing Home page', () => {
  it('must load component successfully', async () => {
    render(<Home />);
    expect(screen.getByRole('img', { name: /github logo/i })).toBeInTheDocument();
    expect(screen.getByText(/pesquise por um usuário válido do github/i)).toBeInTheDocument();
  });
  it('should show a load when user submits survey', () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
      }),
    );
    server.listen();
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    server.close();
  });
  it('should show the list of users with the typed name when pressing the enter key', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
      }),
    );
    server.listen();
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText('algab')).toBeInTheDocument());
    expect(screen.getAllByAltText('Profile Photo').length).toBe(1);
    expect(screen.getByText('Visualizar')).toBeVisible();
    server.close();
  });
  it('should show the list of users with the typed name when pressing the button', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
      }),
    );
    server.listen();
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    userEvent.click(screen.getByRole('button', { hidden: true }));
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText('algab')).toBeInTheDocument());
    expect(screen.getAllByAltText('Profile Photo').length).toBe(1);
    expect(screen.getByText('Visualizar')).toBeVisible();
    server.close();
  });
  it('should show a message stating that it cannot find the desired user', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ items: [] }));
      }),
    );
    server.listen();
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'nick test');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByText(/pesquise por um usuário válido do github/i)).toBeInTheDocument();
    });
    server.close();
  });
  it('should show a message stating that there was an error', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => res(ctx.status(500))),
    );
    server.listen();
    render(
      <Context>
        <Home />
      </Context>,
    );
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'nick test');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByText(/pesquise por um usuário válido do github/i)).toBeInTheDocument();
    });
    server.close();
  });
  it('should show user lists and select the desired user', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
      }),
    );
    server.listen();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>,
    );
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText('algab')).toBeInTheDocument());
    expect(screen.getAllByAltText('Profile Photo').length).toBe(1);
    userEvent.click(screen.getByText('Visualizar'));
    server.close();
  });
});
