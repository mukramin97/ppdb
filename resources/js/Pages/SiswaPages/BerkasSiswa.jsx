import SiswaLayout from '@/Layouts/SiswaLayout';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import PDFDownload from './PDFDownload';

import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BerkasSiswa(props) {
  const [errorMessage, setErrorMessage] = useState([])

  const [loading, setLoading] = useState(false);
  const [pasfoto, setPasfoto] = useState(null);
  const [kk, setKartuKeluarga] = useState(null);
  const [akta, setAkta] = useState(null);
  const [ijazah, setIjazah] = useState(null);
  const [sertifikat, setSertifikat] = useState(null);
  const [berkasSiswa, setBerkasSiswa] = useState([]);


  const fetchData = async () => {
    const response = await axios.get(`http://ppdb.test/api/v1/siswa/berkassiswa/${props.auth.user.id}`);

    setBerkasSiswa(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await axios.post(`http://ppdb.test/api/v1/file_upload/${berkasSiswa.id}`, formData);
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
      fetchData();
      setErrorMessage();
      setLoading(false);
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
      setErrorMessage(error.response.data.errors);
    }
  };

  const handleDelete = (document) => {
    setLoading(true);

    Swal.fire({
      title: 'Anda yakin?',
      text: "Anda tidak dapat mengembalikan data yang dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus data!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.value) {
        axios.delete(`http://ppdb.test/api/v1/file_delete/${berkasSiswa.id}/${document}`)
          .then((response) => {
            console.log("Success:", response.data);
            fetchData();
            Swal.fire({
              position: 'top-end',
              timer: 3000,
              toast: true,
              showConfirmButton: false,
              title: response.data.title,
              text: response.data.message,
              icon: response.data.status
            });
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: 'Gagal!',
              text: 'Terdapat kesalahan.',
              icon: 'error'
            });
          });
      }
    });
  }

  return (
    <SiswaLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hehe</h2>}
    >
      <Head title="Berkas Siswa" />

      <div className='py-12'>
        <div className="mx-auto sm:px-6 lg:px-8">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Berkas Siswa
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
                  <h6 className="m-0 font-weight-bold text-primary">Berkas Siswa</h6>
                </div>
                <div className="col-6">
                  <div className="card-tools float-right">
                  </div>
                </div>
              </div>
            </div>
            {/* Card Content */}
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Pasfoto</Form.Label>
                      <Form.Control
                        type='file'
                        accept="jpg"
                        name="pasfoto"
                        onChange={handleChange}
                      >
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.pasfoto}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="text-center align-items-center">
                      <Form.Label>&nbsp;</Form.Label>{
                        berkasSiswa.pasfoto ? (
                          <Form.Text style={{ margin: '0' }}>
                            <PDFDownload siswa_id={berkasSiswa.id} document="pasfoto" onDataUpdate={fetchData} />
                            <Button onClick={() => handleDelete("pasfoto")} className="btn-danger ml-2">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Form.Text>

                        ) :
                          (
                            <Form.Text>File tidak tersedia. Unggah file terlebih dahulu!
                            </Form.Text>
                          )
                      }
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Kartu Keluarga</Form.Label>
                      <Form.Control
                        type='file'
                        accept="pdf"
                        name="dokumen_kk"
                        onChange={handleChange}
                      >
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.dokumen_kk}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="text-center align-items-center">
                      <Form.Label>&nbsp;</Form.Label>{
                        berkasSiswa.dokumen_kk ? (
                          <Form.Text style={{ margin: '0' }}>
                            <PDFDownload siswa_id={berkasSiswa.id} document="dokumen_kk" onDataUpdate={fetchData} />
                            <Button onClick={() => handleDelete("dokumen_kk")} className="btn-danger ml-2">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Form.Text>

                        ) :
                          (
                            <Form.Text>File tidak tersedia. Unggah file terlebih dahulu!
                            </Form.Text>
                          )
                      }
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Akta Lahir</Form.Label>
                      <Form.Control
                        type='file'
                        accept="pdf"
                        name="dokumen_akta"
                        onChange={handleChange}
                      >
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.dokumen_akta}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="text-center align-items-center mb-2">
                      <Form.Label>&nbsp;</Form.Label>{
                        berkasSiswa.dokumen_akta ? (
                          <Form.Text style={{ margin: '0' }}>
                            <PDFDownload siswa_id={berkasSiswa.id} document="dokumen_akta" />
                            <Button onClick={() => handleDelete("dokumen_akta")} className="btn-danger ml-2">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Form.Text>
                        ) :
                          (
                            <Form.Text >File tidak tersedia. Unggah file terlebih dahulu!
                            </Form.Text>
                          )
                      }
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Ijazah</Form.Label>
                      <Form.Control
                        type='file'
                        accept="pdf"
                        name="dokumen_ijazah"
                        onChange={handleChange}
                      >
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.dokumen_ijazah}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="text-center align-items-center mb-2" >
                      <Form.Label>&nbsp;</Form.Label>{
                        berkasSiswa.dokumen_ijazah ? (
                          <Form.Text style={{ margin: '0' }}>
                            <PDFDownload siswa_id={berkasSiswa.id} document="dokumen_ijazah" />
                            <Button onClick={() => handleDelete("dokumen_ijazah")} className="btn-danger ml-2">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Form.Text>
                        ) :
                          (
                            <Form.Text  >File tidak tersedia. Unggah file terlebih dahulu!
                            </Form.Text>
                          )
                      }
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={9}>
                    <Form.Group className="mb-2">
                      <Form.Label >Sertifikat Penghargaan</Form.Label>
                      <Form.Control
                        type='file'
                        accept="pdf"
                        name="dokumen_sertifikat"
                        onChange={handleChange}
                      >
                      </Form.Control>
                      {errorMessage && <Form.Text className="text-danger">{errorMessage.dokumen_sertifikat}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col xs={10} md={3}>
                    <Form.Group className="text-center align-items-center mb-2">
                      <Form.Label>&nbsp;</Form.Label>{
                        berkasSiswa.dokumen_sertifikat ? (
                          <Form.Text style={{ margin: '0' }}>
                            <PDFDownload siswa_id={berkasSiswa.id} document="dokumen_sertifikat" />
                            <Button onClick={() => handleDelete("dokumen_sertifikat")} className="btn-danger ml-2">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Form.Text>
                        ) :
                          (
                            <Form.Text >File tidak tersedia. Unggah file terlebih dahulu!
                            </Form.Text>
                          )
                      }
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <p  >Unggah seluruh file menggunakan format <strong>PDF</strong>.</p>
                </Form.Group>

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
