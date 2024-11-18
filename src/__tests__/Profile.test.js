import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../ui/pages/Profile';

describe('Profile Component', () => {
  const mockGetUserProfile = jest.fn();
  const mockUserProfile = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders Profile component without crashing', () => {
    render(
      <Profile getUserProfile={mockGetUserProfile} userProfile={mockUserProfile} />
    );

    expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();

    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();

    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
  });

  test('calls getUserProfile on mount', () => {
    render(
      <Profile getUserProfile={mockGetUserProfile} userProfile={mockUserProfile} />
    );

    expect(mockGetUserProfile).toHaveBeenCalledTimes(1);
  });

  test('renders empty state gracefully', () => {
    render(<Profile getUserProfile={mockGetUserProfile} userProfile={{}} />);

    expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();

    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();

    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/john.doe@example.com/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Male/i)).not.toBeInTheDocument();
  });
});
