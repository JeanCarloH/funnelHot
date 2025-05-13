import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../../app/dashboard/page';
import ProtectedRoute from '../../components/ProtectedRoute';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

describe('ProtectedRoute in DashboardPage', () => {
  test('debe renderizar el componente hijo si el usuario está autenticado', () => {
    // Set the mock implementation for this test
    const useAuthMock = require('../../hooks/useAuth').useAuth;
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <ProtectedRoute>
        <div>Contenido protegido</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
  });

  test('no debe renderizar el contenido si el usuario no está autenticado', () => {
    // Update the mock implementation for this test
    const useAuthMock = require('../../hooks/useAuth').useAuth;
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <ProtectedRoute>
        <div>Contenido protegido</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
  });
});