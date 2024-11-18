import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTeam from '../ui/model/AddTeam';

describe('AddTeam Component', () => {
  const mockToggle = jest.fn();
  const mockHandleNameChange = jest.fn();
  const mockHandleImageChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockHandleUpdate = jest.fn();

  const defaultProps = {
    toggle: mockToggle,
    modal: true,
    createTeams: {
      teamName: '',
      teamImage: null,
    },
    handleNameChange: mockHandleNameChange,
    handleImageChange: mockHandleImageChange,
    handleSubmit: mockHandleSubmit,
    buttonFlag: false,
    handleUpdate: mockHandleUpdate,
  };

  test('renders correctly when modal is open', () => {
    render(<AddTeam {...defaultProps} />);

    expect(screen.getByText(/Create Team/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Team Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('renders correctly in update mode', () => {
    render(<AddTeam {...defaultProps} buttonFlag={true} />);

    expect(screen.getByText(/Update Team/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  test('calls handleNameChange when team name is entered', () => {
    render(<AddTeam {...defaultProps} />);

    const teamNameInput = screen.getByLabelText(/Team Name/i);
    fireEvent.change(teamNameInput, { target: { value: 'Team Alpha' } });

    expect(mockHandleNameChange).toHaveBeenCalledTimes(1);
  });

  test('calls handleImageChange when an image is uploaded', () => {
    render(<AddTeam {...defaultProps} />);

    const file = new File(['dummy image'], 'team.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Upload Image/i);

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockHandleImageChange).toHaveBeenCalledTimes(1);
  });

  test('calls handleSubmit when Add button is clicked', () => {
    render(<AddTeam {...defaultProps} />);

    fireEvent.click(screen.getByText(/Add/i));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls handleUpdate when Update button is clicked', () => {
    render(<AddTeam {...defaultProps} buttonFlag={true} />);
    const updateBtn = screen.getByRole('button', { name: /update/i });
    expect(updateBtn).toBeInTheDocument()
    fireEvent.click(updateBtn);
    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
  });

  test('calls toggle when Cancel button is clicked', () => {
    render(<AddTeam {...defaultProps} />);

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  // test('displays preview image when an image is uploaded', () => {
  //   const imageFile = new File(['dummy image'], 'team.jpg', { type: 'image/jpeg' });
  //   const props = {
  //     ...defaultProps,
  //     createTeams: {
  //       teamName: '',
  //       teamImage: imageFile,
  //     },
  //   };

  //   render(<AddTeam {...props} />);
  //   const previewImage = screen.getByAltText('Team');
  //   expect(previewImage).toBeInTheDocument();
  // });
});
