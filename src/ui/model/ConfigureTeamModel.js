import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectedBufferTeam from '../pages/SelectedBufferTeam';
import DeselectedBufferTeam from '../pages/DeselectedBufferTeam';


export default function ConfigureTeamModel({ modals, toggle,  handleRemove, getTeamHandler, modalHandler, searchTerm, handleSearch, handleCheckboxChange, selectedTeams, selectedTeamHandler, selectedTeamsArr, restoreHandler, addOneTeamHandler, configureTeamHandler, deSearchTerm, setDeSearchTerm, teamFLag, getTeamFlag,deSelectedTeamsArr }) {
  return (
    <div className=''>
      <Modal isOpen={modals} toggle={toggle} size='xl' >
        <ModalHeader toggle={toggle}>Buffer Teams</ModalHeader>
        <ModalBody>
          <div className='d-flex w-100'>
            <div className='w-50 border'>
              <DeselectedBufferTeam handleRemove={handleRemove} getTeam={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} addOneTeamHandler={addOneTeamHandler} selectedTeamsArr={selectedTeamsArr} teamFLag={teamFLag} getTeamFlag={getTeamFlag} deSelectedTeamsArr={deSelectedTeamsArr}/>
            </div>
            <div className='w-50 border'>
              <SelectedBufferTeam selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler}  deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={configureTeamHandler}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
