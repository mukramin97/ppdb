import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { btn_xs } from '@/Style/Style';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditModal({ tahunAjaran, onDataUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nama_tahun_ajaran: tahunAjaran.nama_tahun_ajaran, is_active: tahunAjaran.is_active, kode: tahunAjaran.kode });
  const [errorMessage, setErrorMessage] = useState({ nama_tahun_ajaran: '', is_active: '', kode: '' });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://ppdb.test/api/v1/tahunajaran/${tahunAjaran.id}`, formData)
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
      <button className="btn btn-sm btn-primary btn-icon-split" style={btn_xs} onClick={handleShow}>
        <span className="icon text-white-50">
          <i className="fas fa-edit"></i>
        </span>
        <span className="text">Edit</span>
      </button>

      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tahun Ajaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Tahun Ajaran</Form.Label>
              <Form.Control
                type='text'
                name="nama_tahun_ajaran"
                id="nama_tahun_ajaran"
                placeholder="Masukkan Nama Tahun Ajaran"
                autoFocus
                value={formData.nama_tahun_ajaran}
                onChange={handleInputChange}
              />
              {errorMessage && <Form.Text className="text-danger">{errorMessage.nama_tahun_ajaran}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kode Tahun Ajaran</Form.Label>
              <Form.Control
                type='text'
                name="kode"
                id="kode"
                placeholder="Masukkan Kode Tahun Ajaran"
                value={formData.kode}
                onChange={handleInputChange}
              />
              {errorMessage && <Form.Text className="text-danger">{errorMessage.kode}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control className='custom-select' value={formData.is_active} as="select" name="is_active" onChange={handleInputChange}>
                <option disabled>Status</option>
                <option value="0">Non Aktif</option>
                <option value="1">Aktif</option>
              </Form.Control>
              {errorMessage && <Form.Text className="text-danger">{errorMessage.is_active}</Form.Text>}
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