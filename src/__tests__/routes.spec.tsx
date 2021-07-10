import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import '@testing-library/jest-dom/extend-expect';

import nick from './json/nick.json';
import repos from './json/repos.json';
import stars from './json/stars.json';

import Routes from '../routes';

describe('Testing routes component', () => {
  it('must load component successfully', async () => {
    render(<Routes />);
    expect(document.querySelector('.MuiLinearProgress-bar')).toBeVisible();
  });
  it('render component Home', async () => {
    render(<Routes />);
    await waitFor(() =>
      expect(screen.getByRole('img', { name: /github logo/i })).toBeInTheDocument(),
    );
    expect(screen.getByText(/pesquise por um usuário válido do github/i)).toBeInTheDocument();
  });
  it('render component User', async () => {
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
    window.history.pushState({}, 'Route Component User', '/algab');
    render(<Routes />);
    await waitFor(() => expect(screen.getByText(/algab/i)).toBeInTheDocument());
    expect(screen.getByText(/álvaro oliveira/i)).toBeInTheDocument();
    expect(screen.getByText(/10\/07\/2017/i)).toBeInTheDocument();
    server.close();
  });
  it('render route default', async () => {
    window.history.pushState({}, 'Route Default', '/test/test/react');
    render(<Routes />);
    await waitFor(() =>
      expect(screen.getByRole('img', { name: /github logo/i })).toBeInTheDocument(),
    );
  });
});
