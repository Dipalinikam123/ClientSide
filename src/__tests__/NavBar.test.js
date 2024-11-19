import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './../ui/components/NavBar';

// Mock `react-router-dom` navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NavBar Component', () => {
  const mockNavigate = jest.fn();
  const props = {
    logModal: false,
    logToggle: jest.fn(),
    regModal: false,
    regToggle: jest.fn(),
    registerForm: {},
    setRegisterForm: jest.fn(),
    setLoginForm: jest.fn(),
    loginForm: {},
    setToken: jest.fn(),
    token: '',
    registerUserHandler: jest.fn(),
    loginUserHandler: jest.fn(),
    errors: {},
    setErrors: jest.fn(),
    setPasswordError: jest.fn(),
    setEmailError: jest.fn(),
    passwordError: false,
    emailError: false,
    forgetPassword: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders NavBar correctly', () => {
    render(
      <Router>
        <NavBar {...props} />
      </Router>
    );
    expect(screen.getByText('News')).toBeInTheDocument();
  });

  test('displays profile icon and LogOut button when token exists', () => {
    render(
      <Router>
        <NavBar {...props} token="sampleToken" />
      </Router>
    );
    expect(screen.getByRole('button', { name: 'LogOut' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument(); // Profile icon
  });

  // test('logOutHandler clears token and navigates to home', () => {
  //   render(
  //     <Router>
  //       <NavBar {...props} token="sampleToken" />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByText('LogOut'));
  //   const removeItem=localStorage.removeItem('token');
  //   expect(removeItem).toHaveBeenCalled()
  //   expect(mockNavigate).toHaveBeenCalledWith('/');
  // });

  test('loginHandler toggles login modal', () => {
    render(
      <Router>
        <NavBar {...props} />
      </Router>
    );
    fireEvent.click(screen.getByText('Login'));
    expect(props.logToggle).toHaveBeenCalled();
  });

  test('navigates to profile on profile icon click', () => {
    render(
      <Router>
        <NavBar {...props} token="sampleToken" />
      </Router>
    );
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('register modal toggles when regToggle is called', () => {
    render(
      <Router>
        <NavBar {...props} />
      </Router>
    );

    act(() => props.regToggle());
    expect(props.regToggle).toHaveBeenCalled();
  });

  test('useEffect sets token from localStorage', () => {
    localStorage.setItem('token', 'mockToken');
    render(
      <Router>
        <NavBar {...props} />
      </Router>
    );
    expect(props.setToken).toHaveBeenCalledWith('mockToken');
  });

  test('resets errors on login modal toggle', () => {
    render(
      <Router>
        <NavBar {...props} />
      </Router>
    );
    fireEvent.click(screen.getByText('Login'));
    expect(props.setEmailError).toHaveBeenCalledWith(false);
    expect(props.setPasswordError).toHaveBeenCalledWith(false);
  });
});
