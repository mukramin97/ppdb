import { useState } from 'react';
import { Form, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { btn_xs, text_xs } from '@/Style/Style';
import PDFDownload from "./PDFDownload";
import Swal from 'sweetalert2';

import { Row, Col } from 'react-bootstrap';



function PDFUpload({ siswa_id, dokumen_kk, dokumen_akta, dokumen_ijazah, dokumen_sertifikat, onDataUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const [loading, setLoading] = useState(false);

  const [pasfoto, setPasfoto] = useState(null);
  const [kk, setKartuKeluarga] = useState(null);
  const [akta, setAkta] = useState(null);
  const [ijazah, setIjazah] = useState(null);
  const [sertifikat, setSertifikat] = useState(null);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const file = event.target.files[0];

    if (inputName === 'pasfoto') {
      setPasfoto(file);
    }
    else if (inputName === 'dokumen_kk') {
      setKartuKeluarga(file);
    }
    else if (inputName === 'dokumen_akta') {
      setAkta(file);
    }
    else if (inputName === 'dokumen_ijazah') {
      setIjazah(file);
    }
    else if (inputName === 'dokumen_sertifikat') {
      setSertifikat(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (pasfoto) formData.append("pasfoto", pasfoto);
    if (kk) formData.append("dokumen_kk", kk);
    if (akta) formData.append("dokumen_akta", akta);
    if (ijazah) formData.append("dokumen_ijazah", ijazah);
    if (sertifikat) formData.append("dokumen_sertifikat", sertifikat);

    try {
      const response = await axios.post(`http://ppdb.test/api/v1/file_upload/${siswa_id}`, formData);
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
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: 'top-end',
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        title: 'Gagal!',
        text: 'Terdapat kesalahan.',
        icon: 'error'
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-success btn-icon-split" style={btn_xs} onClick={handleShow}>
        <span className="icon text-white-50">
          <i className="fas fa-info"></i>
        </span>
        <span className="text">Edit Berkas</span>
      </button>
      <Modal show={isModalOpen} onHide={handleClose}>
        <ModalHeader closeButton>
          <Modal.Title>Unggah Berkas</Modal.Title>
        </ModalHeader>
        <ModalBody >
          {/* <Form onSubmit={handleSubmit}> */}
          <Form>
            <Row>
              <Col xs={10} md={8} className="align-items-center justify-content-start">
                <Form.Label style={text_xs}
                >Pas Foto</Form.Label>
                <Form.Group>
                  <Form.Control
                    style={text_xs}
                    type='file'
                    accept="jpg"
                    name="pasfoto"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={4} className="d-flex align-items-end justify-content-end"> {/* Align content to the right */}
                <Form.Group>
                  {pasfoto ? (
                    <PDFDownload siswa_id={siswa_id} document="pasfoto" />
                  ) : (
                    <p style={text_xs}>File tidak tersedia</p>
                  )}
                </Form.Group>
              </Col>

              <Col xs={10} md={8} className="align-items-center justify-content-start">
                <Form.Label style={text_xs}
                >Kartu Keluarga</Form.Label>
                <Form.Group>
                  <Form.Control
                    style={text_xs}
                    type='file'
                    accept="pdf"
                    name="dokumen_kk"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={4} className="d-flex align-items-end justify-content-end"> {/* Align content to the right */}
                <Form.Group>
                  {dokumen_kk ? (
                    <PDFDownload siswa_id={siswa_id} document="dokumen_kk" />
                  ) : (
                    <p style={text_xs}>File tidak tersedia</p>
                  )}
                </Form.Group>
              </Col>


              <Col xs={10} md={8} className="align-items-center justify-content-start">
                <Form.Group>
                  <Form.Label style={text_xs}>Akta Lahir</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='file'
                    accept="pdf"
                    name="dokumen_akta"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={4} className="d-flex align-items-end justify-content-end">
                <Form.Group>
                  {dokumen_akta ? (
                    <PDFDownload siswa_id={siswa_id} document="dokumen_akta" />
                  ) : (
                    <p style={text_xs}>File tidak tersedia</p>
                  )}
                </Form.Group>
              </Col>


              <Col xs={10} md={8} className="align-items-center justify-content-start">
                <Form.Group>
                  <Form.Label style={text_xs}>Ijazah</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='file'
                    accept="pdf"
                    name="dokumen_ijazah"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={4} className="d-flex align-items-end justify-content-end">
                <Form.Group>
                  {dokumen_ijazah ? (
                    <PDFDownload siswa_id={siswa_id} document="dokumen_ijazah" />
                  ) : (
                    <p style={text_xs}>File tidak tersedia</p>
                  )}
                </Form.Group>
              </Col>


              <Col xs={10} md={8} className="align-items-center justify-content-start">
                <Form.Group>
                  <Form.Label style={text_xs}>Sertifikat Penghargaan</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='file'
                    accept="pdf"
                    name="dokumen_sertifikat"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={4} className="d-flex align-items-end justify-content-end">
                <Form.Group>
                  {dokumen_sertifikat ? (
                    <PDFDownload siswa_id={siswa_id} document="dokumen_sertifikat" />
                  ) : (
                    <p style={text_xs}>File tidak tersedia</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <p style={text_xs} >Unggah seluruh file menggunakan format <strong>PDF</strong>.</p>
            </Form.Group>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleSubmit}>
            Unggah
          </Button>
        </ModalFooter>
      </Modal>
    </div>

  );
}

export default PDFUpload;
