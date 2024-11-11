import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function AlertModel({ alertModal, alertToggle, handleRemoveTeam }) {

  return (
    <div>
      <Modal 
        isOpen={alertModal} 
        toggle={alertToggle} 
      >
        <ModalHeader toggle={alertToggle} className="bg-danger text-white">
          <strong>Remove Team</strong>
        </ModalHeader>
        
        <ModalBody className="text-center">
          <p className="fs-5">Are you sure you want to remove this team?</p>
        </ModalBody>
        
        <ModalFooter className="d-flex justify-content-between">
          <Button 
            color="danger" 
            onClick={() => handleRemoveTeam()} 
            className="px-4"
          >
            Remove
          </Button>
          <Button 
            color="secondary" 
            onClick={alertToggle} 
            className="px-4"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
