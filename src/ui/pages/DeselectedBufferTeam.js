import { Button, Paper, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

export default function DeselectedBufferTeam({
  getTeam,
  modalHandler,
  searchTerm,
  handleSearch,
  handleCheckboxChange,
  selectedTeams,
  selectedTeamHandler,
  addOneTeamHandler,
  deSelectedTeamsArr,
  getTeamFlag,
}) {
  const [index, setIndex] = useState(null);
  useEffect(() => {
    getTeam();
  }, [getTeamFlag]);

  const handleCheckboxChange1 = (id) => {
    setIndex(id);
    handleCheckboxChange(id);
  };
  console.log('------id index', index)
  console.log('------id selectedTeams', selectedTeams)
  console.log('------id deSelectedTeamsArr', deSelectedTeamsArr)
  console.log('------deSelectedTeamsArr?.includes(index)', deSelectedTeamsArr?.includes(index))

  // const deselectedTeams = team.filter((e) => !selectedTeamsArr.includes(e.id));
  // console.log('****deselectedTeams****',deselectedTeams)

  return (
    <>
      <div className="pb-2 d-flex justify-content-between border border-top-0 border-start-0 border-end-0 py-3 px-2">
        <TextField
          type="search"
          id="outlined-basic"
          label='Search here...'
          variant="outlined"
          size="small"
          // className="rounded px-2 border-1 "
          value={searchTerm}
          onChange={handleSearch}
        />
        {selectedTeams?.includes(index) && (
          <Button variant="contained" color="success" size="small"
            onClick={selectedTeamHandler}
          >
            Add Selected Team {selectedTeams?.length}{" "}
          </Button>
        )}
        <Button variant="contained" size="small" color="success"
          onClick={() => modalHandler()}
        >
          Create Team
        </Button>
      </div>
      <div>
        <p className="fw-bold p-2 border border-top-0 border-start-0 border-end-0">
          Master Buffer Team
        </p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {
                deSelectedTeamsArr?.map((e, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedTeams?.includes(e?.id)}
                          onChange={() => handleCheckboxChange1(e?.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <img src={e?.teamImage} alt="not found" width={60} height={50} />
                      </TableCell>
                      <TableCell className='text-capitalize'>{e.teamName}</TableCell>
                      <TableCell>
                        {!selectedTeams?.includes(e?.id) && (
                          <Button variant="contained"
                            color="primary"
                            // className="me-2"
                            size="small"
                            onClick={() => addOneTeamHandler(e.id)}
                          >
                            Add
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
