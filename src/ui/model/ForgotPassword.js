import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

function ForgotPassword({ toggle, modal,setPwdModal,forgetPassword }) {

  const [email,setEmail]=useState('')

  const forgotPwd=()=>{
    setPwdModal(false)
    forgetPassword(email)
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Input
            type="email"
            placeholder="Enter your email"
          value={email} 
          onChange={(e)=>setEmail(e?.target?.value)} 
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={forgotPwd}>
            Send link
          </Button>{' '}
          <Button color="secondary" onClick={()=>setPwdModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ForgotPassword;