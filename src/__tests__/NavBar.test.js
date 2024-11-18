import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../ui/components/NavBar";
import { BrowserRouter } from "react-router-dom";

const mockLogToggle = jest.fn();
const mockRegToggle = jest.fn();
const mockSetRegisterForm = jest.fn();
const mockSetLoginForm = jest.fn();
const mockSetToken = jest.fn();
const mockRegisterUserHandler = jest.fn();
const mockLoginUserHandler = jest.fn();
const mockSetErrors = jest.fn();
const mockSetPasswordError = jest.fn();
const mockSetEmailError = jest.fn()
const mockForgetPassword = jest.fn();

const defaultProps = {
  logModal: false,
  logToggle: mockLogToggle,
  regModal: false,
  regToggle: mockRegToggle,
  registerForm: { firstName: "", lastName: "", email: "", password: "", gender: "" },
  setRegisterForm: mockSetRegisterForm,
  loginForm: { email: "", password: "" },
  setLoginForm: mockSetLoginForm,
  setToken: mockSetToken,
  token: "",
  registerUserHandler: mockRegisterUserHandler,
  loginUserHandler: mockLoginUserHandler,
  errors: {},
  setErrors: mockSetErrors,
  setPasswordError: mockSetPasswordError,
  setEmailError: mockSetEmailError,
  passwordError: false,
  emailError: false,
  forgetPassword: mockForgetPassword,
};

const renderNavBar = () => {
  render(
    <BrowserRouter>
      <NavBar {...defaultProps} />
    </BrowserRouter>
  );
};

describe('NavBar component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render element', () => {
    renderNavBar()
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
    expect(screen.getByText(/News/i)).toBeInTheDocument();
  });
});