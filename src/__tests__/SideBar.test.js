import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SideBar from '../ui/model/SideBar';

describe('SideBar Component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>
    );

  test('renders sidebar with header and navigation links', () => {
    renderComponent();

    expect(screen.getByText(/Sidebar/i)).toBeInTheDocument();
    expect(screen.getByText(/Configure Buffer Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Master Buffer Team/i)).toBeInTheDocument();
  });

  test('renders links with correct styles', () => {
    renderComponent();

    const configureLink = screen.getByText(/Configure Buffer Team/i);
    const masterLink = screen.getByText(/Master Buffer Team/i);

    expect(configureLink).toHaveStyle('color: white');
    expect(masterLink).toHaveStyle('color: white');
  });

  test('applies active styles to the active link', () => {
    render(
      <MemoryRouter initialEntries={['/configuration-buffer-team']}>
        <SideBar />
      </MemoryRouter>
    );

    const configureLink = screen.getByText(/Configure Buffer Team/i);
    const masterLink = screen.getByText(/Master Buffer Team/i);

    expect(configureLink).toHaveStyle('color: #61dafb');

    expect(masterLink).toHaveStyle('color: white');
  });
});
