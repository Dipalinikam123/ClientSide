import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "../ui/model/ForgotPassword";

describe('ForgotPassword components', () => {

  const mockToggle = jest.fn();
  const mockSetPwdModal = jest.fn();
  const mockForgetPassword = jest.fn();

  test('render all elements', () => {
    render(<ForgotPassword modal={true}
      toggle={mockToggle}
      setPwdModal={mockSetPwdModal}
      forgetPassword={mockForgetPassword} />)
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Send link/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('calls forgetPassword with email when "Send link" is clicked', () => {
    render(
      <ForgotPassword
        modal={true}
        toggle={mockToggle}
        setPwdModal={mockSetPwdModal}
        forgetPassword={mockForgetPassword}
      />
    );
    const emailInput = screen.getByLabelText(/Enter your email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Send link/i }));

    expect(mockSetPwdModal).toHaveBeenCalledWith(false);

    expect(mockForgetPassword).toHaveBeenCalledWith('test@example.com');
  });

  test('calls setPwdModal when "Cancel" is clicked', () => {
    render(
      <ForgotPassword
        modal={true}
        toggle={mockToggle}
        setPwdModal={mockSetPwdModal}
        forgetPassword={mockForgetPassword}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockSetPwdModal).toHaveBeenCalledWith(false);
  });

  // test('does not call forgotPassword if email is empty', () => {
  //   render(
  //     <ForgotPassword
  //       modal={true}
  //       toggle={mockToggle}
  //       setPwdModal={mockSetPwdModal}
  //       forgetPassword={mockForgetPassword}
  //     />
  //   );
  //   const emailInput = screen.getByLabelText(/Enter your email/i);
  //   fireEvent.change(emailInput, { target: { value: '' } });

  //   fireEvent.click(screen.getByRole('button', { name: /Send link/i }));
  //   expect(mockForgetPassword).not.toHaveBeenCalled();
  // });
});