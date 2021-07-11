import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route } from 'react-router-dom';

import Context from '../../contexts';
import User from '../../pages/User';

import nick from '../json/nick.json';
import repos from '../json/repos.json';
import stars from '../json/stars.json';

const renderWithRouter = (route: string): any => {
  render(
    <Context>
      <MemoryRouter initialEntries={[`/${route}`]}>
        <Route path="/:name">
          <User />
        </Route>
      </MemoryRouter>
    </Context>,
  );
};

describe('Testing User page', () => {
  it('must successfully load user information', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/users/algab', (req, res, ctx) => {
        return res(ctx.json(nick));
      }),
      rest.get('https://api.github.com/users/algab/repos', (req, res, ctx) => {
        return res(ctx.json(repos));
      }),
      rest.get('https://api.github.com/users/algab/starred', (req, res, ctx) => {
        return res(ctx.json(stars));
      }),
    );
    server.listen();
    renderWithRouter('algab');
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText(/algab/i)).toBeInTheDocument());
    expect(screen.getByText(/álvaro oliveira/i)).toBeInTheDocument();
    expect(screen.getByText(/10\/07\/2017/i)).toBeInTheDocument();
    server.close();
  });
  it('should give error loading user information', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/users/algab', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    server.listen();
    renderWithRouter('algab');
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() =>
      expect(screen.getByRole('img', { name: /github logo/i })).toBeInTheDocument(),
    );
    expect(screen.getByText(/pesquise por um usuário válido do github/i)).toBeInTheDocument();
    server.close();
  });
  it('must load the user information and click on the repositories button', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/users/algab', (req, res, ctx) => {
        return res(ctx.json(nick));
      }),
      rest.get('https://api.github.com/users/algab/repos', (req, res, ctx) => {
        return res(ctx.json(repos));
      }),
      rest.get('https://api.github.com/users/algab/starred', (req, res, ctx) => {
        return res(ctx.json(stars));
      }),
    );
    server.listen();
    renderWithRouter('algab');
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText(/algab/i)).toBeInTheDocument());
    expect(screen.getByText(/álvaro oliveira/i)).toBeInTheDocument();
    expect(screen.getByText(/repositórios/i)).toBeVisible();
    userEvent.click(screen.getByText(/repositórios/i));
    await waitFor(() => expect(screen.getByText(/nome: api\-chat\-socket/i)).toBeInTheDocument());
    server.close();
  });
  it('must load the user information and click the stars button', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/users/algab', (req, res, ctx) => {
        return res(ctx.json(nick));
      }),
      rest.get('https://api.github.com/users/algab/repos', (req, res, ctx) => {
        return res(ctx.json(repos));
      }),
      rest.get('https://api.github.com/users/algab/starred', (req, res, ctx) => {
        return res(ctx.json(stars));
      }),
    );
    server.listen();
    renderWithRouter('algab');
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText(/algab/i)).toBeInTheDocument());
    expect(screen.getByText(/álvaro oliveira/i)).toBeInTheDocument();
    expect(screen.getByText(/stars/i)).toBeVisible();
    userEvent.click(screen.getByText(/stars/i));
    await waitFor(() => expect(screen.getByText(/nome: app\-ideas/i)).toBeInTheDocument());
    server.close();
  });
  it('must load the user information and click the github button', async () => {
    const server = setupServer(
      rest.get('https://api.github.com/users/algab', (req, res, ctx) => {
        return res(ctx.json(nick));
      }),
      rest.get('https://api.github.com/users/algab/repos', (req, res, ctx) => {
        return res(ctx.json(repos));
      }),
      rest.get('https://api.github.com/users/algab/starred', (req, res, ctx) => {
        return res(ctx.json(stars));
      }),
    );
    server.listen();
    renderWithRouter('algab');
    global.open = jest.fn();
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeVisible();
    await waitFor(() => expect(screen.getByText(/algab/i)).toBeInTheDocument());
    expect(screen.getByText(/álvaro oliveira/i)).toBeInTheDocument();
    expect(screen.getByText(/github/i)).toBeVisible();
    userEvent.click(screen.getByText(/github/i));
    server.close();
  });
});
