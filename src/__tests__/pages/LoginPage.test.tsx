import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../app/login/page';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    const useAuthMock = require('../../hooks/useAuth').useAuth;
    useAuthMock.mockReturnValue({
      login: jest.fn(),
      loading: false,
    });
  });

  test('debe renderizar el formulario de login correctamente', () => {
    render(<LoginPage />);

    // Verify that form elements are in the document
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingresar/i)).toBeInTheDocument();
  });

  test('debe mostrar error si el formulario no es válido', async () => {
    render(<LoginPage />);

    // Assuming you have a form with role="form"
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      // Verify validation errors are shown
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  test('debe llamar a la función login cuando el formulario sea válido', async () => {
    const loginMock = jest.fn();
    const useAuthMock = require('../../hooks/useAuth').useAuth;
    useAuthMock.mockReturnValue({
      login: loginMock,
      loading: false,
    });

    render(<LoginPage />);

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Ingresar/i));

    // Verify that login function was called
    await waitFor(() => expect(loginMock).toHaveBeenCalledTimes(1));
  });

  test('debe mostrar un icono de carga mientras se hace el login', () => {
    const useAuthMock = require('../../hooks/useAuth').useAuth;
    useAuthMock.mockReturnValue({
      login: jest.fn(),
      loading: true,
    });

    render(<LoginPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();  // CircularProgress
    expect(screen.getByText(/Ingresando.../i)).toBeInTheDocument();
  });
});