import React, { useEffect, useState } from 'react';
import ConfigureTeamModel from '../model/ConfigureTeamModel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function BufferConfigureTeam({ getTeamFlag, team, editTeam, handleRemove, getTeamHandler, modalHandler, modal, handleSearch, searchTerm, handleCheckboxChange, selectedTeams, selectedTeamHandler, selectedTeamsArr, restoreHandler, addOneTeamHandler, configureTeamHandler, getConfigTeamHandler, configureTeam, bufferModal, bufferToggle, deSearchTerm, setDeSearchTerm, setSelectedTeamsArr, teamFLag, setSearchTerm, setTeamFlag, deSelectedTeamsArr }) {

  useEffect(() => {
    getConfigTeamHandler()
  }, [bufferModal])

  const configureTeamModel = () => {
    setSelectedTeamsArr([])
    bufferToggle()
    setSearchTerm('')
    setTeamFlag(false)
    getTeamHandler()

  }

  console.log('-----get configureTeam', configureTeam)
  return (
    <div className='container p-5'>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Configuration Buffer Teams</h2>
        <Button variant="contained" className='bg-success' onClick={configureTeamModel}>Add Buffer Team</Button>
      </div>

      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="buffer team table" className='border'>
            <TableHead>
              <TableRow>
                <TableCell>Challenge Team</TableCell>
                <TableCell>Team Names</TableCell>
                <TableCell>Images</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configureTeam?.map((challenge) => (
                <React.Fragment key={challenge.id}>
                  <TableRow className="table-primary">
                    <TableCell className='fw-bold text-capitalize' colSpan={3}>{challenge.challengeName}</TableCell>
                  </TableRow>
                  {challenge.teams?.map((team, index) => (
                    <TableRow key={index}>
                      <TableCell></TableCell>
                      <TableCell className='text-capitalize'>{team.teamName}</TableCell>
                      <TableCell>
                        <img width={80} height={80} src={team.teamImage} alt="Team" className="rounded" />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ConfigureTeamModel getTeamFlag={getTeamFlag} modals={bufferModal} modal={modal} toggle={bufferToggle} team={team} editTeam={editTeam} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler} configureTeamHandler={configureTeamHandler} deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm} teamFLag={teamFLag} deSelectedTeamsArr={deSelectedTeamsArr} />
    </div>
  )
}
