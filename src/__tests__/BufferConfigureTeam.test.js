import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BufferConfigureTeam from "../ui/pages/BufferConfigureTeam";

describe("BufferConfigureTeam Component", () => {
  const mockProps = {
    getTeamFlag: false,
    team: [],
    editTeam: jest.fn(),
    handleRemove: jest.fn(),
    getTeamHandler: jest.fn(),
    modalHandler: jest.fn(),
    modal: false,
    handleSearch: jest.fn(),
    searchTerm: "",
    handleCheckboxChange: jest.fn(),
    selectedTeams: [],
    selectedTeamHandler: jest.fn(),
    selectedTeamsArr: [],
    restoreHandler: jest.fn(),
    addOneTeamHandler: jest.fn(),
    configureTeamHandler: jest.fn(),
    getConfigTeamHandler: jest.fn(),
    configureTeam: [
      {
        id: 1,
        challengeName: "Challenge 1",
        teams: [
          { teamName: "Team A", teamImage: "image-a.png" },
          { teamName: "Team B", teamImage: "image-b.png" },
        ],
      },
      {
        id: 2,
        challengeName: "Challenge 2",
        teams: [
          { teamName: "Team C", teamImage: "image-c.png" },
        ],
      },
    ],
    bufferModal: false,
    bufferToggle: jest.fn(),
    deSearchTerm: "",
    setDeSearchTerm: jest.fn(),
    setSelectedTeamsArr: jest.fn(),
    teamFLag: false,
    setSearchTerm: jest.fn(),
    setTeamFlag: jest.fn(),
    deSelectedTeamsArr: [],
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders the component correctly", () => {
    render(<BufferConfigureTeam {...mockProps} />);

    expect(screen.getByText(/Configuration Buffer Teams/i)).toBeInTheDocument();

    expect(screen.getByText(/Add Buffer Team/i)).toBeInTheDocument();

    expect(screen.getByText(/Challenge Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Names/i)).toBeInTheDocument();
    expect(screen.getByText(/Images/i)).toBeInTheDocument();
  });

  test("renders challenge rows and team rows correctly", () => {
    render(<BufferConfigureTeam {...mockProps} />);

    expect(screen.getByText(/Challenge 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Challenge 2/i)).toBeInTheDocument();

    expect(screen.getByText(/Team A/i)).toBeInTheDocument();
    expect(screen.getByText(/Team B/i)).toBeInTheDocument();
    expect(screen.getByText(/Team C/i)).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("src", "image-a.png");
    expect(images[1]).toHaveAttribute("src", "image-b.png");
    expect(images[2]).toHaveAttribute("src", "image-c.png");
  });

  test("calls getConfigTeamHandler on mount", () => {
    render(<BufferConfigureTeam {...mockProps} />);
    expect(mockProps.getConfigTeamHandler).toHaveBeenCalledTimes(1);
  });

  test("handles 'Add Buffer Team' button click", () => {
    render(<BufferConfigureTeam {...mockProps} />);
    const addBufferTeamButton = screen.getByText(/Add Buffer Team/i);
    fireEvent.click(addBufferTeamButton);

    expect(mockProps.setSelectedTeamsArr).toHaveBeenCalledWith([]);
    expect(mockProps.bufferToggle).toHaveBeenCalledTimes(1);
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith("");
    expect(mockProps.setTeamFlag).toHaveBeenCalledWith(false);
    expect(mockProps.getTeamHandler).toHaveBeenCalledTimes(1);
  });
});
