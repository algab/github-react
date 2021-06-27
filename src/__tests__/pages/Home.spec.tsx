import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '../../pages/Home';

describe('Testing Home page', () => {
  it('should show a load when user submits survey', async () => {
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeInTheDocument();
  });
  it('should show the list of users from the typed name', async () => {
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'algab');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('algab')).toBeInTheDocument());
    expect(screen.getAllByAltText('Profile Photo').length).toBe(8);
  });
  it('should show a message stating that it cannot find the desired user', async () => {
    render(<Home />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'asasaszazasas');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(document.querySelector('.MuiCircularProgress-svg')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Pesquise por um usuário válido do Github')).toBeInTheDocument();
    });
  });
});
