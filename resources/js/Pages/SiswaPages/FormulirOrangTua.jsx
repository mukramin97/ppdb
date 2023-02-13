import SiswaLayout from '@/Layouts/SiswaLayout';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormulirOrangTua(props) {
  const [propinsis, setPropinsi] = useState([]);
  const [kotaAyah, setKotaAyah] = useState([]);
  const [kotaIbu, setKotaIbu] = useState([]);
  const [errorMessage, setErrorMessage] = useState([])

  const [formOrangTua, setFormOrangTua] = useState({
    id: "",
    status_ayah: "",
    nama_ayah: "",
    tempat_lahir_ayah: "",
    tanggal_lahir_ayah: "",
    agama_ayah: "",
    alamat_rumah_ayah: "",
    propinsi_ayah: "",
    kota_ayah: "",
    no_hp_ayah: "",
    pend_terakhir_ayah: "",
    pekerjaan_ayah: "",
    penghasilan_ayah: "",
    status_ibu: "",
    nama_ibu: "",
    tempat_lahir_ibu: "",
    tanggal_lahir_ibu: "",
    agama_ibu: "",
    alamat_rumah_ibu: "",
    propinsi_ibu: "",
    kota_ibu: "",
    no_hp_ibu: "",
    pend_terakhir_ibu: "",
    pekerjaan_ibu: "",
    penghasilan_ibu: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://ppdb.test/api/v1/keluarga/${props.auth.user.id}`);
      setFormOrangTua({
        siswa_id: response.data.data?.siswa_id || "",
        id: response.data.data?.id || "",
        status_ayah: response.data.data?.status_ayah || "",
        nama_ayah: response.data.data?.nama_ayah || "",
        tempat_lahir_ayah: response.data.data?.tempat_lahir_ayah || "",
        tanggal_lahir_ayah: response.data.data?.tanggal_lahir_ayah || "",
        agama_ayah: response.data.data?.agama_ayah || "",
        alamat_rumah_ayah: response.data.data?.alamat_rumah_ayah || "",
        propinsi_ayah: response.data.data?.propinsi_ayah || "",
        kota_ayah: response.data.data?.kota_ayah || "",
        no_hp_ayah: response.data.data?.no_hp_ayah || "",
        pend_terakhir_ayah: response.data.data?.pend_terakhir_ayah || "",
        pekerjaan_ayah: response.data.data?.pekerjaan_ayah || "",
        penghasilan_ayah: response.data.data?.penghasilan_ayah || "",
        status_ibu: response.data.data?.status_ibu || "",
        nama_ibu: response.data.data?.nama_ibu || "",
        tempat_lahir_ibu: response.data.data?.tempat_lahir_ibu || "",
        tanggal_lahir_ibu: response.data.data?.tanggal_lahir_ibu || "",
        agama_ibu: response.data.data?.agama_ibu || "",
        alamat_rumah_ibu: response.data.data?.alamat_rumah_ibu || "",
        propinsi_ibu: response.data.data?.propinsi_ibu || "",
        kota_ibu: response.data.data?.kota_ibu || "",
        no_hp_ibu: response.data.data?.no_hp_ibu || "",
        pend_terakhir_ibu: response.data.data?.pend_terakhir_ibu || "",
        pekerjaan_ibu: response.data.data?.pekerjaan_ibu || "",
        penghasilan_ibu: response.data.data?.penghasilan_ibu || "",

      });

      if (response.data.data.propinsi_ayah) {
        console.log(response.data.data.propinsi_ayah);
        axios.get(`http://ppdb.test/api/v1/indoRegionNamaKota/${response.data.data.propinsi_ayah}`)
          .then(res => {
            setKotaAyah(res.data);
          })
          .catch(err => console.error(err));
      }
      if (response.data.data.propinsi_ibu) {
        console.log(response.data.data.propinsi_ibu);
        axios.get(`http://ppdb.test/api/v1/indoRegionNamaKota/${response.data.data.propinsi_ibu}`)
          .then(res => {
            setKotaIbu(res.data);
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
    if (name === "propinsi_ayah") {
      const selectedProvince = propinsis.find(p => p.name === value);
      axios.get(`http://ppdb.test/api/v1/indoRegionKota/${selectedProvince.id}`)
        .then(res => {
          setKotaAyah(res.data);
          setFormOrangTua({
            ...formOrangTua,
            [name]: value,
          });
        })
        .catch(err => console.error(err));
    }
    else if (name === "propinsi_ibu") {
      const selectedProvince = propinsis.find(p => p.name === value);
      axios.get(`http://ppdb.test/api/v1/indoRegionKota/${selectedProvince.id}`)
        .then(res => {
          setKotaIbu(res.data);
          setFormOrangTua({
            ...formOrangTua,
            [name]: value,
          });
        })
        .catch(err => console.error(err));
    }
    else {
      setFormOrangTua({
        ...formOrangTua,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://ppdb.test/api/v1/keluarga/${formOrangTua.id}`, formOrangTua)
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
      <Head title="Formulir Orang Tua" />

      <div className='py-12'>
        <div className="mx-auto sm:px-6 lg:px-8">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Formulir Orang Tua Siswa
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
                  <h6 className="m-0 font-weight-bold text-primary">Data Orang Tua Siswa</h6>
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
                  {/* DATA AYAH */}
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nama Lengkap Ayah</Form.Label>
                      <Form.Control
                        type='text'
                        name="nama_ayah"
                        placeholder="Masukkan Nama Lengkap Ayah"
                        autoFocus
                        value={formOrangTua.nama_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nama_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor HP Ayah</Form.Label>
                      <Form.Control
                        type='text'
                        name="no_hp_ayah"
                        placeholder="Masukkan Nomor Handphone Ayah"
                        value={formOrangTua.no_hp_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.no_hp_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tempat Lahir</Form.Label>
                      <Form.Control
                        type='text'
                        name="tempat_lahir_ayah"
                        placeholder="Masukkan Nama Lengkap Ayah"
                        value={formOrangTua.tempat_lahir_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tempat_lahir_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tanggal Lahir</Form.Label>
                      <Form.Control
                        type='date'
                        name="tanggal_lahir_ayah"
                        placeholder="Masukkan Tanggal Lahir Ayah"
                        value={formOrangTua.tanggal_lahir_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tanggal_lahir_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Agama</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="agama_ayah"
                        value={formOrangTua.agama_ayah}
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
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.agama_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Pendidikan Terakhir</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="pend_terakhir_ayah"
                        value={formOrangTua.pend_terakhir_ayah}
                        placeholder="Masukkan Agama"
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Pendidikan Terakhir</option>
                        <option value="SD">SD / Sederajat</option>
                        <option value="SMP">SMP / Sederajat</option>
                        <option value="SMA">SMA / Sederajat</option>
                        <option value="S1">Sarjana / Sederajat</option>
                        <option value="S2">Pascasarjana / Sederajat</option>
                        <option value="S3">Doktor / Sederajat</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.pend_terakhir_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Alamat Rumah</Form.Label>
                      <Form.Control
                        type='text'
                        name="alamat_rumah_ayah"
                        placeholder="Masukkan Alamat Rumah Ayah"
                        value={formOrangTua.alamat_rumah_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.alamat_rumah_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label >Status</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="status_ayah"
                        value={formOrangTua.status_ayah}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Status Ayah</option>
                        <option value="Hidup">Hidup</option>
                        <option value="Meninggal Dunia">Meninggal Dunia</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.status_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>

                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Propinsi</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="propinsi_ayah"
                        placeholder="Masukkan Propinsi"
                        value={formOrangTua.propinsi_ayah}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Propinsi</option>
                        {propinsis.map(propinsi => (
                          <option key={propinsi.id} value={propinsi.name}>
                            {propinsi.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.propinsi_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Kabupaten/Kota</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="kota_ayah"
                        placeholder="Masukkan Kota"
                        value={formOrangTua.kota_ayah}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Kota</option>
                        {kotaAyah.map(kota => (
                          <option key={kota.id} value={kota.name}>
                            {kota.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.kota_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Pekerjaan</Form.Label>
                      <Form.Control
                        type='text'
                        name="pekerjaan_ayah"
                        placeholder="Masukkan Pekerjaan Ayah"
                        value={formOrangTua.pekerjaan_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.pekerjaan_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Penghasilan</Form.Label>
                      <Form.Control
                        type='number'
                        name="penghasilan_ayah"
                        placeholder="Masukkan Penghasilan Ayah"
                        value={formOrangTua.penghasilan_ayah}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.penghasilan_ayah}</Form.Text>}
                    </Form.Group>
                  </Col>

                  {/* DATA IBU */}
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nama Lengkap Ibu</Form.Label>
                      <Form.Control
                        type='text'
                        name="nama_ibu"
                        placeholder="Masukkan Nama Lengkap Ibu"
                        value={formOrangTua.nama_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.nama_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Nomor HP Ibu</Form.Label>
                      <Form.Control
                        type='text'
                        name="no_hp_ibu"
                        placeholder="Masukkan Nomor Handphone Ibu"
                        value={formOrangTua.no_hp_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.no_hp_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tempat Lahir</Form.Label>
                      <Form.Control
                        type='text'
                        name="tempat_lahir_ibu"
                        placeholder="Masukkan Nama Lengkap Ibu"
                        value={formOrangTua.tempat_lahir_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tempat_lahir_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Tanggal Lahir</Form.Label>
                      <Form.Control
                        type='date'
                        name="tanggal_lahir_ibu"
                        placeholder="Masukkan Tanggal Lahir Ibu"
                        value={formOrangTua.tanggal_lahir_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.tanggal_lahir_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Agama</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="agama_ibu"
                        value={formOrangTua.agama_ibu}
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
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.agama_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Pendidikan Terakhir</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="pend_terakhir_ibu"
                        value={formOrangTua.pend_terakhir_ibu}
                        placeholder="Masukkan Agama"
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Pendidikan Terakhir</option>
                        <option value="SD">SD / Sederajat</option>
                        <option value="SMP">SMP / Sederajat</option>
                        <option value="SMA">SMA / Sederajat</option>
                        <option value="S1">Sarjana / Sederajat</option>
                        <option value="S2">Pascasarjana / Sederajat</option>
                        <option value="S3">Doktor / Sederajat</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.pend_terakhir_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Alamat Rumah</Form.Label>
                      <Form.Control
                        type='text'
                        name="alamat_rumah_ibu"
                        placeholder="Masukkan Alamat Rumah Ibu"
                        value={formOrangTua.alamat_rumah_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.alamat_rumah_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label >Status</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="status_ibu"
                        value={formOrangTua.status_ibu}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Status Ibu</option>
                        <option value="Hidup">Hidup</option>
                        <option value="Meninggal Dunia">Meninggal Dunia</option>
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.status_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>

                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Propinsi</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="propinsi_ibu"
                        placeholder="Masukkan Propinsi"
                        value={formOrangTua.propinsi_ibu}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Propinsi</option>
                        {propinsis.map(propinsi => (
                          <option key={propinsi.id} value={propinsi.name}>
                            {propinsi.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.propinsi_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Kabupaten/Kota</Form.Label>
                      <Form.Control
                        className='custom-select'
                        as="select"
                        type='text'
                        name="kota_ibu"
                        placeholder="Masukkan Kota"
                        value={formOrangTua.kota_ibu}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Pilih Kota</option>
                        {kotaIbu.map(kota => (
                          <option key={kota.id} value={kota.name}>
                            {kota.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.kota_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Pekerjaan</Form.Label>
                      <Form.Control
                        type='text'
                        name="pekerjaan_ibu"
                        placeholder="Masukkan Pekerjaan Ibu"
                        value={formOrangTua.pekerjaan_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.pekerjaan_ibu}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label >Penghasilan</Form.Label>
                      <Form.Control
                        type='number'
                        name="penghasilan_ibu"
                        placeholder="Masukkan Penghasilan Ibu"
                        value={formOrangTua.penghasilan_ibu}
                        onChange={handleInputChange}
                      />
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.penghasilan_ibu}</Form.Text>}
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
