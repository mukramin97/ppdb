import { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { btn_xs, text_xs } from '@/Style/Style';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditModal({ siswa, onDataUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_siswa: siswa?.nama_siswa || "",
    nomor_formulir: siswa?.nomor_formulir || "",
    jenis_tes: siswa?.jenis_tes || "",
    tempat_lahir: siswa?.tempat_lahir || "",
    tanggal_lahir: siswa?.tanggal_lahir || "",
    jenis_kelamin: siswa?.jenis_kelamin || "",
    agama: siswa?.agama || "",
    nisn: siswa?.nisn || "",
    nik: siswa?.nik || "",
    alamat: siswa?.alamat || "",
    propinsi: siswa?.propinsi || "",
    kota: siswa?.kota || "",
    kode_pos: siswa?.kode_pos || "",
    no_hp: siswa?.no_hp || "",
    nama_sekolah_asal: siswa?.nama_sekolah_asal || "",
    alamat_sekolah_asal: siswa?.alamat_sekolah_asal || "",
    no_ijazah: siswa?.no_ijazah || "",
    no_skhun: siswa?.no_skhun || "",
    status_keluarga: siswa?.status_keluarga || "",
    status_pendaftaran: siswa?.status_pendaftaran || "",
    status_seleksi: siswa?.status_seleksi || "",
    nilai_ujian: siswa?.nilai_ujian || "",
    nilai_interview: siswa?.nilai_interview || "",
    jenjang_id: siswa?.jenjang_id || "",
    tahun_ajaran_id: siswa?.tahun_ajaran_id || ""
  });

  const [propinsis, setPropinsi] = useState([]);
  const [kotas, setKota] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      axios.get(`http://ppdb.test/api/v1/indoRegionPropinsi`)
        .then(response => setPropinsi(response.data));

      if (formData.propinsi) {
        console.log(formData.propinsi);
        axios.get(`http://ppdb.test/api/v1/indoRegionNamaKota/${formData.propinsi}`)
          .then(res => {
            setKota(res.data);
            setFormData({
              ...formData,
            });
          })
          .catch(err => console.error(err));
      }
    }
  }, [isModalOpen]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "propinsi") {
      const selectedProvince = propinsis.find(p => p.name === value);
      axios.get(`http://ppdb.test/api/v1/indoRegionKota/${selectedProvince.id}`)
        .then(res => {
          setKota(res.data);
          setFormData({
            ...formData,
            [name]: value,
          });
        })
        .catch(err => console.error(err));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://ppdb.test/api/v1/siswa/${siswa.id}`, formData)
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
      })
      .catch((error) => {
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
      });

    setIsModalOpen(false);
  }

  return (
    <div>
      <button className="btn btn-sm btn-primary btn-icon-split" style={btn_xs} onClick={handleShow}>
        <span className="icon text-white-50">
          <i className="fas fa-edit"></i>
        </span>
        <span className="text">Edit</span>
      </button>

      <Modal show={isModalOpen} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Siswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nama Lengkap Siswa</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nama_siswa"
                    id="nama_siswa"
                    placeholder="Masukkan Nama Lengkap Siswa"
                    autoFocus
                    value={formData.nama_siswa}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nomor Handphone</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="no_hp"
                    id="no_hp"
                    placeholder="Masukkan Nomor Handphone"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nomor Formulir</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nomor_formulir"
                    id="nomor_formulir"
                    placeholder="Masukkan Nomor Formulir"
                    value={formData.nomor_formulir}
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Jenis Tes</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="jenis_tes"
                    id="jenis_tes"
                    placeholder="Masukkan Jenis Tes"
                    value={formData.jenis_tes}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Pilih Jenis Tes Masuk</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </Form.Control>

                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Tempat Lahir</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="tempat_lahir"
                    id="tempat_lahir"
                    placeholder="Masukkan Tempat Lahir"
                    value={formData.tempat_lahir}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Tanggal Lahir</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="tanggal_lahir"
                    id="tanggal_lahir"
                    placeholder="Masukkan Tanggal Lahir"
                    value={formData.tanggal_lahir}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Jenis Kelamin</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="jenis_kelamin"
                    id="jenis_kelamin"
                    placeholder="Masukkan Jenis Kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} md={3}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Agama</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="agama"
                    id="agama"
                    placeholder="Masukkan Agama"
                    value={formData.agama}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Protestan">Protestan</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                    <option value="Kong Hu Cu">Kong Hu Cu</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} md={3}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Status Anak</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="status_keluarga"
                    placeholder="Masukkan Status Anak"
                    value={formData.status_keluarga}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Status Anak</option>
                    <option value="Anak Kandung">Anak Kandung</option>
                    <option value="Anak Tiri">Anak Tiri</option>
                    <option value="Anak Angkat">Anak Angkat</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>NISN</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nisn"
                    id="nisn"
                    placeholder="Masukkan NISN"
                    value={formData.nisn}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>NIK</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nik"
                    id="nik"
                    placeholder="Masukkan NIK"
                    value={formData.nik}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={9}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Alamat</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="alamat"
                    id="alamat"
                    placeholder="Masukkan Alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={3}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Kode POS</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="kode_pos"
                    id="kode_pos"
                    placeholder="Masukkan Kode POS"
                    value={formData.kode_pos}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Propinsi</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="propinsi"
                    id="propinsi"
                    placeholder="Masukkan Propinsi"
                    value={formData.propinsi}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Pilih Propinsi</option>
                    {propinsis.map(propinsi => (
                      <option key={propinsi.id} value={propinsi.name}>
                        {propinsi.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Kabupaten/Kota</Form.Label>
                  <Form.Control
                    className='custom-select'
                    as="select"
                    style={text_xs}
                    type='text'
                    name="kota"
                    id="kota"
                    placeholder="Masukkan Kota"
                    value={formData.kota}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Pilih Kota</option>
                    {kotas.map(kota => (
                      <option key={kota.id} value={kota.name}>
                        {kota.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nama Asal Sekolah</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nama_sekolah_asal"
                    id="nama_sekolah_asal"
                    placeholder="Masukkan Nama Asal Sekolah"
                    value={formData.nama_sekolah_asal}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Alamat Sekolah Asal</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="alamat_sekolah_asal"
                    id="alamat_sekolah_asal"
                    placeholder="Masukkan Alamat Sekolah Asal"
                    value={formData.alamat_sekolah_asal}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nomor Ijazah</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="no_ijazah"
                    id="no_ijazah"
                    placeholder="Nomor Ijazah"
                    value={formData.no_ijazah}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nomor SKHUN</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="no_skhun"
                    id="no_skhun"
                    placeholder="Masukkan Nomor SKHUN"
                    value={formData.no_skhun}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nilai Ujian</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nilai_ujian"
                    id="nilai_ujian"
                    placeholder="Masukkan Nilai Ujian"
                    value={formData.nilai_ujian}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Nilai Interview</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="nilai_interview"
                    id="nilai_interview"
                    placeholder="Masukkan Nilai Interview"
                    value={formData.nilai_interview}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Status Pendaftaran</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="status_pendaftaran"
                    id="status_pendaftaran"
                    placeholder="Masukkan Status Pendaftaran"
                    value={formData.status_pendaftaran}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={10} md={6}>
                <Form.Group className="mb-2">
                  <Form.Label style={text_xs}>Status Seleksi</Form.Label>
                  <Form.Control
                    style={text_xs}
                    type='text'
                    name="status_seleksi"
                    id="status_seleksi"
                    placeholder="Masukkan Status Seleksi"
                    value={formData.status_seleksi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}