import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { btn_xs } from '@/Style/Style';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateModal({ onDataUpdate, setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ content: '' });
  const [errorMessage, setErrorMessage] = useState({ content: ''});

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://ppdb.test/api/v1/pengumuman", formData)
      .then((response) => {
        console.log("Success:", response.data);
        Swal.fire({
          position: 'top-end',
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          title: response.data.title,
          text: response.data.message,
          icon: response.data.status
        });
        setFormData({ content: '' });
        setCurrentPage(1);
        onDataUpdate();
        setErrorMessage();
        setIsModalOpen(false);
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          title: 'Gagal!',
          text: 'Terdapat kesalahan.',
          icon: 'error'
        });
        setErrorMessage(error.response.data.errors);
      });
  }

  return (
    <div>
      <button className="btn btn-sm btn-success btn-icon-split" style={btn_xs} onClick={handleShow}>
        <span className="icon text-white-50">
          <i className="fas fa-plus"></i>
        </span>
        <span className="text">Tambah Pengumuman</span>
      </button>

      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pengumuman</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Isi Pengumuman</Form.Label>
              <Form.Control
                as='textarea'
                rows='10'
                name="content"
                id="content"
                placeholder="Masukkan Isi Pengumuman"
                autoFocus
                value={formData.content}
                onChange={handleInputChange}
              />
              {errorMessage && <Form.Text className="text-danger">{errorMessage.content}</Form.Text>}
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