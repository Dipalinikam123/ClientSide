import React, { act } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import BufferTeam from '../ui/pages/BufferTeam';
import '@testing-library/jest-dom/extend-expect'; // For jest-dom matchers


// "BufferTeam"
const mockGetTeam = jest.fn();
const mockModalHandler = jest.fn();
const mockHandleSearch = jest.fn();
const mockEditTeam = jest.fn();
const mockHandleRemove = jest.fn();

const mockMasterBufferTeamsArr = [
  {
    id: 1,
    teamName: 'Team A',
    teamImage: 'image-a-url',
  },
  {
    id: 2,
    teamName: 'Team B',
    teamImage: 'image-b-url',
  },
];

describe('BufferTeam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with the correct UI elements', () => {

    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm=""
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    expect(screen.getByText('Create Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Search here...')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Team Name')).toBeInTheDocument();

    const testAction = screen.getAllByText('Action');
    expect(testAction[0]).toBeInTheDocument();
    expect(testAction[1]).toBeInTheDocument();

    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();

    const images = screen.getAllByAltText('Team');
    expect(images.length).toBe(2);
    expect(images[0].src).toContain('image-a-url');
    expect(images[1].src).toContain('image-b-url');
  });

  test('calls handleSearch when the search input value changes', async () => {
    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm="Test"
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    const searchInput = screen.getByLabelText('Search here...');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'New Search Term' } });
    });

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith(expect.anything());
  });

  test('calls handleRemove with the correct team ID when the "Remove" button is clicked', async () => {
    render(
      <BufferTeam
        getTeam={mockGetTeam}
        editTeam={mockEditTeam}
        handleRemove={mockHandleRemove}
        searchTerm=""
        handleSearch={mockHandleSearch}
        modalHandler={mockModalHandler}
        masterBufferTeamsArr={mockMasterBufferTeamsArr}
      />
    );

    const removeButtons = await screen.findAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockHandleRemove).toHaveBeenCalledWith(mockMasterBufferTeamsArr[0].id);
  });
});
