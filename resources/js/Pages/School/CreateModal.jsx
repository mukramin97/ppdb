import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { btn_xs } from '@/Style/TableStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateModal( onDataUpdate ) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [school_name, setSchoolName] = useState('');

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://ppdb.test/api/v1/schools", {
        school_name: school_name
      })
        .then((response) => {
          console.log("Success:", response.data);
          setSchoolName('');
          onDataUpdate();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    setIsModalOpen(false);
  }

  return (
    <div>
      <button className="btn btn-sm btn-success btn-icon-split" style={ btn_xs } onClick={handleShow}>
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
        <span className="text">Add School</span>
      </button>

      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New School</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter School Name"
                autoFocus
                value={school_name}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}