import SiswaLayout from '@/Layouts/SiswaLayout';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormulirSiswa(props) {
  const [propinsis, setPropinsi] = useState([]);
  const [kotas, setKota] = useState([]);
  const [errorMessage, setErrorMessage] = useState([])

  const [formSiswa, setFormSiswa] = useState({
    id: "",
    nama_siswa: "",
    nomor_formulir: "",
    jenis_tes: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    nisn: "",
    nik: "",
    alamat: "",
    propinsi: "",
    kota: "",
    kode_pos: "",
    no_hp: "",
    nama_sekolah_asal: "",
    alamat_sekolah_asal: "",
    no_ijazah: "",
    no_skhun: "",
    status_keluarga: "",
    status_pendaftaran: "",
    status_seleksi: "",
    nilai_ujian: "",
    nilai_interview: "",
    jenjang_id: "",
    tahun_ajaran_id: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://ppdb.test/api/v1/siswa/${props.auth.user.id}`);
      setFormSiswa({
        id: response.data.data?.id || "",
        nama_siswa: response.data.data?.nama_siswa || "",
        nomor_formulir: response.data.data?.nomor_formulir || "",
        jenis_tes: response.data.data?.jenis_tes || "",
        tempat_lahir: response.data.data?.tempat_lahir || "",
        tanggal_lahir: response.data.data?.tanggal_lahir || "",
        jenis_kelamin: response.data.data?.jenis_kelamin || "",
        agama: response.data.data?.agama || "",
        nisn: response.data.data?.nisn || "",
        nik: response.data.data?.nik || "",
        alamat: response.data.data?.alamat || "",
        propinsi: response.data.data?.propinsi || "",
        kota: response.data.data?.kota || "",
        kode_pos: response.data.data?.kode_pos || "",
        no_hp: response.data.data?.no_hp || "",
        nama_sekolah_asal: response.data.data?.nama_sekolah_asal || "",
        alamat_sekolah_asal: response.data.data?.alamat_sekolah_asal || "",
        no_ijazah: response.data.data?.no_ijazah || "",
        no_skhun: response.data.data?.no_skhun || "",
        status_keluarga: response.data.data?.status_keluarga || "",
        status_pendaftaran: response.data.data?.status_pendaftaran || "",
        status_seleksi: response.data.data?.status_seleksi || "",
        nilai_ujian: response.data.data?.nilai_ujian || "",
        nilai_interview: response.data.data?.nilai_interview || "",
        jenjang_id: response.data.data?.jenjang_id || "",
        tahun_ajaran_id: response.data.data?.tahun_ajaran_id || ""
      });

      if (response.data.data.propinsi) {
        console.log(response.data.data.propinsi);
        axios.get(`http://ppdb.test/api/v1/indoRegionNamaKota/${response.data.data.propinsi}`)
          .then(res => {
            setKota(res.data);
          })
          .catch(err => console.error(err));
      }

    };

    fetchData();

    axios.get(`http://ppdb.test/api/v1/indoRegionPropinsi`)
      .then(response => setPropinsi(response.data));

  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "propinsi") {
      const selectedProvince = propinsis.find(p => p.name === value);
      axios.get(`http://ppdb.test/api/v1/indoRegionKota/${selectedProvince.id}`)
        .then(res => {
          setKota(res.data);
          setFormSiswa({
            ...formSiswa,
            [name]: value,
          });
        })
        .catch(err => console.error(err));
    } else {
      setFormSiswa({
        ...formSiswa,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://ppdb.test/api/v1/siswa/${formSiswa.id}`, formSiswa)
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
        setErrorMessage();
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
        setErrorMessage(error.response.data.errors);
      });
  }

  return (
    <SiswaLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hehe</h2>}
    >
      <Head title="Formulir Siswa" />

      <div className='py-12'>

        <div className="mx-auto sm:px-6 lg:px-8">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Formulir Siswa
            </h1>
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-download fa-sm text-white-50">
              </i>
              Generate Report
            </a>
          </div>

          {/* Table */}
          <div className="card shadow mb-4">

            {/* Card Header */}
            <div className="card-header py-3">
              <div className="row">
                <div className="col-6">
                  <h6 className="m-0 font-weight-bold text-primary">Data Siswa Baru</h6>
                </div>
                <div className="col-6">
                  <div className="card-tools float-right">

                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="card-body">
              <Form>
                <Row>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nama Lengkap Siswa</Form.Label>
                      <Form.Control
                        type='text'
                        name="nama_siswa"
                        placeholder="Masukkan Nama Lengkap Siswa"
                        autoFocus
                        value={formSiswa.nama_siswa}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nama_siswa}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor Handphone</Form.Label>
                      <Form.Control
                        type='text'
                        name="no_hp"
                        placeholder="Masukkan Nomor Handphone"
                        value={formSiswa.no_hp}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.no_hp}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor Formulir</Form.Label>
                      <Form.Control
                        type='text'
                        name="nomor_formulir"
                        placeholder="Masukkan Nomor Formulir"
                        value={formSiswa.nomor_formulir}
                        onChange={handleInputChange}
                        disabled
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nomor_formulir}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Jenis Tes</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="jenis_tes"
                        placeholder="Masukkan Jenis Tes"
                        value={formSiswa.jenis_tes}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Jenis Tes Masuk</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.jenis_tes}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tempat Lahir</Form.Label>
                      <Form.Control
                        type='text'
                        name="tempat_lahir"
                        placeholder="Masukkan Tempat Lahir"
                        value={formSiswa.tempat_lahir}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tempat_lahir}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tanggal Lahir</Form.Label>
                      <Form.Control
                        type='text'
                        name="tanggal_lahir"
                        placeholder="Masukkan Tanggal Lahir"
                        value={formSiswa.tanggal_lahir}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tanggal_lahir}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Jenis Kelamin</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="jenis_kelamin"
                        placeholder="Masukkan Jenis Kelamin"
                        value={formSiswa.jenis_kelamin}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.jenis_kelamin}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label >Agama</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="agama"
                        value={formSiswa.agama}
                        placeholder="Masukkan Agama"
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
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.agama}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label >Status Anak</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="status_keluarga"
                        value={formSiswa.status_keluarga}
                        placeholder="Masukkan Status Anak"
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Status Anak</option>
                        <option value="Anak Kandung">Anak Kandung</option>
                        <option value="Anak Tiri">Anak Tiri</option>
                        <option value="Anak Angkat">Anak Angkat</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.status_keluarga}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >NISN</Form.Label>
                      <Form.Control
                        type='text'
                        name="nisn"
                        placeholder="Masukkan NISN"
                        value={formSiswa.nisn}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nisn}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >NIK</Form.Label>
                      <Form.Control
                        type='text'
                        name="nik"
                        placeholder="Masukkan NIK"
                        value={formSiswa.nik}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nik}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Alamat</Form.Label>
                      <Form.Control
                        type='text'
                        name="alamat"
                        placeholder="Masukkan Alamat"
                        value={formSiswa.alamat}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.alamat}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label >Kode POS</Form.Label>
                      <Form.Control
                        type='text'
                        name="kode_pos"
                        placeholder="Masukkan Kode POS"
                        value={formSiswa.kode_pos}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.kode_pos}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Propinsi</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="propinsi"
                        id="propinsi"
                        placeholder="Masukkan Propinsi"
                        value={formSiswa.propinsi}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Propinsi</option>
                        {propinsis.map(propinsi => (
                          <option key={propinsi.id} value={propinsi.name}>
                            {propinsi.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.propinsi}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Kabupaten/Kota</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="kota"
                        id="kota"
                        placeholder="Masukkan Kota"
                        value={formSiswa.kota}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Kota</option>
                        {kotas.map(kota => (
                          <option key={kota.id} value={kota.name}>
                            {kota.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.kota}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nama Asal Sekolah</Form.Label>
                      <Form.Control
                        type='text'
                        name="nama_sekolah_asal"
                        placeholder="Masukkan Nama Asal Sekolah"
                        value={formSiswa.nama_sekolah_asal}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nama_sekolah_asal}</Form.Text>}
                    </Form.Group>
                  </Col>

                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Alamat Sekolah Asal</Form.Label>
                      <Form.Control
                        type='text'
                        name="alamat_sekolah_asal"
                        placeholder="Masukkan Alamat Sekolah Asal"
                        value={formSiswa.alamat_sekolah_asal}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.alamat_sekolah_asal}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor Ijazah</Form.Label>
                      <Form.Control
                        type='text'
                        name="no_ijazah"
                        placeholder="Nomor Ijazah"
                        value={formSiswa.no_ijazah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.no_ijazah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor SKHUN</Form.Label>
                      <Form.Control
                        type='text'
                        name="no_skhun"
                        placeholder="Masukkan Nomor SKHUN"
                        value={formSiswa.no_skhun}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.no_skhun}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nilai Ujian</Form.Label>
                      <Form.Control
                        disabled
                        type='text'
                        name="nilai_ujian"
                        placeholder="Masukkan Nilai Ujian"
                        value={formSiswa.nilai_ujian}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nilai_ujian}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nilai Interview</Form.Label>
                      <Form.Control
                        disabled
                        type='text'
                        name="nilai_interview"
                        placeholder="Masukkan Nilai Interview"
                        value={formSiswa.nilai_interview}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nilai_interview}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Status Pendaftaran</Form.Label>
                      <Form.Control
                        disabled
                        type='text'
                        name="status_pendaftaran"
                        placeholder="Masukkan Status Pendaftaran"
                        value={formSiswa.status_pendaftaran}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.status_pendaftaran}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Status Seleksi</Form.Label>
                      <Form.Control
                        disabled
                        type='text'
                        name="status_seleksi"
                        placeholder="Masukkan Status Seleksi"
                        value={formSiswa.status_seleksi}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.status_seleksi}</Form.Text>}
                    </Form.Group>
                  </Col>

                </Row>

              </Form>

            </div>
            <div className="card-footer">
              <Button className='float-right' variant="primary" onClick={handleSubmit}>
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SiswaLayout>
  );
}
