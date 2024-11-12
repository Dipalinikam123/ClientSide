import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import ConfigureTeamModel from '../model/ConfigureTeamModel';

export default function BufferConfigureTeam({getTeamFlag, team, editTeam, handleRemove, getTeamHandler, modalHandler, modal, handleSearch, searchTerm, handleCheckboxChange, selectedTeams, selectedTeamHandler, selectedTeamsArr, restoreHandler, addOneTeamHandler,configureTeamHandler,getConfigTeamHandler,configureTeam,bufferModal,bufferToggle,deSearchTerm, setDeSearchTerm,setSelectedTeamsArr,teamFLag,setSearchTerm,setTeamFlag, deSelectedTeamsArr}) {

  useEffect(() => {
    getConfigTeamHandler()
  }, [bufferModal])

  const configureTeamModel=()=>{
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
        <Button color='success' onClick={configureTeamModel}>Add Buffer Team</Button>
      </div>

      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Table hover bordered striped className='w-100'>
          <thead className="table-dark">
            <tr>
              <th>Challenge Team</th>
              <th>Team Names</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {configureTeam?.map((challenge) => (
              <React.Fragment key={challenge.id}>
                <tr className="table-primary">
                  <td className='fw-bold text-capitalize' colSpan={3}>{challenge.challengeName}</td>
                </tr>
                {challenge.teams?.map((team, index) => (
                  <tr key={index}>
                    <td></td>
                    <td className='text-capitalize'>{team.teamName}</td>
                    <td>
                      <img width={80} height={80} src={team.teamImage} alt="Team" className="rounded" />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
      <ConfigureTeamModel getTeamFlag={getTeamFlag} modals={bufferModal} modal={modal} toggle={bufferToggle} team={team} editTeam={editTeam} handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} addOneTeamHandler={addOneTeamHandler} configureTeamHandler={configureTeamHandler} deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm} teamFLag={teamFLag} deSelectedTeamsArr={deSelectedTeamsArr}/>

    </div>
  )
}
