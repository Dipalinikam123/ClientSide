import { render, screen, fireEvent } from '@testing-library/react';
import LoginModel from '../ui/model/LoginModel';

jest.mock('../ui/model/ForgotPassword', () => () => <div>Mock ForgotPassword</div>); 
describe('LoginModel', () => {
  const mockToggle = jest.fn();
  const mockRegToggle = jest.fn();
  const mockSetLoginForm = jest.fn();
  const mockLoginUserHandler = jest.fn();
  const mockSetErrors = jest.fn();
  const mockForgetPassword = jest.fn();

  const loginForm = {
    email: '',
    password: ''
  };

  test('opens and closes the modal correctly', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    expect(screen.getByText('Login Form')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('updates email input correctly', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter Your Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockSetLoginForm).toHaveBeenCalledWith({ email: 'test@example.com', password: '' });
  });

  test('updates password input correctly', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    const passwordInput = screen.getByPlaceholderText('Enter Your Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(mockSetLoginForm).toHaveBeenCalledWith({ email: '', password: 'password123' });
  });

  test('clicking Register toggles registration form', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    fireEvent.click(screen.getByText(/Register/i));

    expect(mockRegToggle).toHaveBeenCalledTimes(1);
  });

  test('clicking Forgot Password toggles the password modal', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    fireEvent.click(screen.getByText(/Forgot Password\?/i));

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('triggers loginUserHandler when clicking the Login button', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(mockLoginUserHandler).toHaveBeenCalledTimes(1);
  });

  test('shows error for invalid email input', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={false}
        emailError={true}
        forgetPassword={mockForgetPassword}
      />
    );

    expect(screen.getByText('Email is invalid.')).toBeInTheDocument();
  });

  test('shows error for invalid password input', () => {
    render(
      <LoginModel
        modal={true}
        toggle={mockToggle}
        regToggle={mockRegToggle}
        setLoginForm={mockSetLoginForm}
        loginForm={loginForm}
        loginUserHandler={mockLoginUserHandler}
        setErrors={mockSetErrors}
        passwordError={true}
        emailError={false}
        forgetPassword={mockForgetPassword}
      />
    );

    expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
  });
});
