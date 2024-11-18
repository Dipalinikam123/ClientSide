import { render, screen, fireEvent } from "@testing-library/react";
import RegisterModel from "../ui/model/RegisterModel";

describe('RegisterModel component', () => {
  const mockToggle = jest.fn();
  const mockLogToggle = jest.fn();
  const mockSetRegisterForm = jest.fn();
  const mockRegisterUserHandler = jest.fn()
  const mockErrors = {};

  const registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: ''
  };

  test('render elements', () => {
    render(<RegisterModel modal={true} toggle={mockToggle} logToggle={mockLogToggle} setRegisterForm={mockSetRegisterForm} registerForm={registerForm} registerUserHandler={mockRegisterUserHandler} errors={mockErrors} />)

    expect(screen.getByText(/Register Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();

  });

  test('updates input fields correctly', () => {
    render(
      <RegisterModel modal={true} toggle={mockToggle} logToggle={mockLogToggle} setRegisterForm={mockSetRegisterForm} registerForm={registerForm} registerUserHandler={mockRegisterUserHandler} errors={mockErrors} />
    );

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const maleRadio = screen.getByLabelText('Male');


    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'doe' } });
    fireEvent.change(emailInput, { target: { value: 'Johndoe@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456789' } });
    fireEvent.click(maleRadio);

    expect(mockSetRegisterForm).toHaveBeenNthCalledWith(1, {
      ...registerForm,
      firstName: 'John',
    });
    expect(mockSetRegisterForm).toHaveBeenNthCalledWith(2, {
      ...registerForm,
      lastName: 'doe',
    });
    expect(mockSetRegisterForm).toHaveBeenNthCalledWith(3, {
      ...registerForm,
      email: 'Johndoe@gmail.com',
    });
    expect(mockSetRegisterForm).toHaveBeenNthCalledWith(4, {
      ...registerForm,
      password: '123456789',
    });
    expect(mockSetRegisterForm).toHaveBeenNthCalledWith(5, {
      ...registerForm,
      gender: 'Male',
    });

  });

  test('calls toggle and logToggle when clicking Login', () => {
    render(
      <RegisterModel
        modal={true}
        toggle={mockToggle}
        logToggle={mockLogToggle}
        setRegisterForm={mockSetRegisterForm}
        registerForm={registerForm}
        registerUserHandler={mockRegisterUserHandler}
        errors={mockErrors}
      />
    );

    fireEvent.click(screen.getByText(/Login/i));
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockLogToggle).toHaveBeenCalledTimes(1);
  });

  test('already have account', () => {
    render(<RegisterModel modal={true} toggle={mockToggle} logToggle={mockLogToggle} setRegisterForm={mockSetRegisterForm} registerForm={registerForm} registerUserHandler={mockRegisterUserHandler} errors={mockErrors} />)

    expect(screen.getByText('Already have an account?')).toBeInTheDocument();

    const loginBtn = screen.getByText(/Login/);
    fireEvent.click(loginBtn);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockLogToggle).toHaveBeenCalledTimes(1);
  });


  test('click on register button', () => {
    render(<RegisterModel modal={true} toggle={mockToggle} logToggle={mockLogToggle} setRegisterForm={mockSetRegisterForm} registerForm={registerForm} registerUserHandler={mockRegisterUserHandler} errors={mockErrors} />)

    const registerBtn = screen.getByRole('button', { name: 'Register' })
    expect(registerBtn).toBeInTheDocument();
    fireEvent.click(registerBtn)
    expect(mockRegisterUserHandler).toHaveBeenCalledTimes(1)

  });
  test('click on cancle button', () => {
    render(<RegisterModel modal={true} toggle={mockToggle} logToggle={mockLogToggle} setRegisterForm={mockSetRegisterForm} registerForm={registerForm} registerUserHandler={mockRegisterUserHandler} errors={mockErrors} />)

    const cancleBtn = screen.getByRole('button', { name: 'Cancel' })
    expect(cancleBtn).toBeInTheDocument();
    fireEvent.click(cancleBtn)
    expect(mockToggle).toHaveBeenCalledTimes(1)
  });
  test('displays error messages for invalid inputs', () => {
    const errors = {
      nameError: true,
      emailError: true,
      passwordError: true,
    };

    render(
      <RegisterModel
        modal={true}
        toggle={mockToggle}
        logToggle={mockLogToggle}
        setRegisterForm={mockSetRegisterForm}
        registerForm={registerForm}
        registerUserHandler={mockRegisterUserHandler}
        errors={errors}
      />
    );
    
    const errorMsg= screen.getAllByText('Name is required.')
    expect(errorMsg[0]).toBeInTheDocument();
    expect(errorMsg[1]).toBeInTheDocument();
    expect(screen.getByText('Email is invalid.')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
  });
});