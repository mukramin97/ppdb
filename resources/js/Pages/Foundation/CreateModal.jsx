import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { btn_xs } from '@/Style/Style';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateModal({ onDataUpdate, setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ school_name: '', address: '' });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://ppdb.test/api/v1/schools", formData)
      .then((response) => {
        console.log("Success:", response.data);
        setFormData({ school_name: '', address: '' });
        setCurrentPage(1);
        onDataUpdate();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsModalOpen(false);
  }

  return (
    <div>
      <button className="btn btn-sm btn-success btn-icon-split" style={btn_xs} onClick={handleShow}>
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
            <Form.Group className="mb-3">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type='text'
                name="school_name"
                id="school_name"
                placeholder="Enter School Name"
                autoFocus
                value={formData.school_name}
                onChange={handleInputChange}
              />

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                name="address"
                id="address"
                placeholder="Enter School Address"
                value={formData.address}
                onChange={handleInputChange}
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