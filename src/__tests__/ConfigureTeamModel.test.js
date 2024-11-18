import { render, screen, fireEvent } from '@testing-library/react';
import ConfigureTeamModel from './../ui/model/ConfigureTeamModel';

describe('ConfigureTeamModel Component', () => {
  const mockToggle = jest.fn();
  const mockConfigureTeamHandler = jest.fn();
  const mockHandleRemove = jest.fn();
  const mockGetTeamHandler = jest.fn();
  const mockModalHandler = jest.fn();
  const mockSearchTerm = 'Team';
  const mockHandleSearch = jest.fn();
  const mockHandleCheckboxChange = jest.fn();
  const mockSelectedTeams = [];
  const mockSelectedTeamHandler = jest.fn();
  const mockSelectedTeamsArr = [];
  const mockRestoreHandler = jest.fn();
  const mockAddOneTeamHandler = jest.fn();
  const mockDeSearchTerm = '';
  const mockSetDeSearchTerm = jest.fn();
  const mockTeamFlag = false;
  const mockGetTeamFlag = jest.fn();
  const mockDeSelectedTeamsArr = [];

  test('renders the modal and all its elements', () => {
    render(
      <ConfigureTeamModel
        modals={true}
        toggle={mockToggle}
        handleRemove={mockHandleRemove}
        getTeamHandler={mockGetTeamHandler}
        modalHandler={mockModalHandler}
        searchTerm={mockSearchTerm}
        handleSearch={mockHandleSearch}
        handleCheckboxChange={mockHandleCheckboxChange}
        selectedTeams={mockSelectedTeams}
        selectedTeamHandler={mockSelectedTeamHandler}
        selectedTeamsArr={mockSelectedTeamsArr}
        restoreHandler={mockRestoreHandler}
        addOneTeamHandler={mockAddOneTeamHandler}
        configureTeamHandler={mockConfigureTeamHandler}
        deSearchTerm={mockDeSearchTerm}
        setDeSearchTerm={mockSetDeSearchTerm}
        teamFLag={mockTeamFlag}
        getTeamFlag={mockGetTeamFlag}
        deSelectedTeamsArr={mockDeSelectedTeamsArr}
      />
    );

    expect(screen.getByText('Buffer Teams')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('calls configureTeamHandler when Save button is clicked', () => {
    render(
      <ConfigureTeamModel
        modals={true}
        toggle={mockToggle}
        handleRemove={mockHandleRemove}
        getTeamHandler={mockGetTeamHandler}
        modalHandler={mockModalHandler}
        searchTerm={mockSearchTerm}
        handleSearch={mockHandleSearch}
        handleCheckboxChange={mockHandleCheckboxChange}
        selectedTeams={mockSelectedTeams}
        selectedTeamHandler={mockSelectedTeamHandler}
        selectedTeamsArr={mockSelectedTeamsArr}
        restoreHandler={mockRestoreHandler}
        addOneTeamHandler={mockAddOneTeamHandler}
        configureTeamHandler={mockConfigureTeamHandler}
        deSearchTerm={mockDeSearchTerm}
        setDeSearchTerm={mockSetDeSearchTerm}
        teamFLag={mockTeamFlag}
        getTeamFlag={mockGetTeamFlag}
        deSelectedTeamsArr={mockDeSelectedTeamsArr}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(mockConfigureTeamHandler).toHaveBeenCalled();
  });

  test('calls toggle when Cancel button is clicked', () => {
    render(
      <ConfigureTeamModel
        modals={true}
        toggle={mockToggle}
        handleRemove={mockHandleRemove}
        getTeamHandler={mockGetTeamHandler}
        modalHandler={mockModalHandler}
        searchTerm={mockSearchTerm}
        handleSearch={mockHandleSearch}
        handleCheckboxChange={mockHandleCheckboxChange}
        selectedTeams={mockSelectedTeams}
        selectedTeamHandler={mockSelectedTeamHandler}
        selectedTeamsArr={mockSelectedTeamsArr}
        restoreHandler={mockRestoreHandler}
        addOneTeamHandler={mockAddOneTeamHandler}
        configureTeamHandler={mockConfigureTeamHandler}
        deSearchTerm={mockDeSearchTerm}
        setDeSearchTerm={mockSetDeSearchTerm}
        teamFLag={mockTeamFlag}
        getTeamFlag={mockGetTeamFlag}
        deSelectedTeamsArr={mockDeSelectedTeamsArr}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockToggle).toHaveBeenCalled();
  });
});
