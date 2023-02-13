import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Layouts/Pagination';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { tableDataAction, tableHeaderAction, tableHeaderIndex, tableDataIndex, btn_xs } from '@/Style/Style';
import Swal from 'sweetalert2';

export default function Jenjang(props) {
  const [jenjangs, setJenjangs] = useState([]);
  const [meta, setMeta] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(`/api/v1/jenjang?page=${currentPage}`);

    setJenjangs(response.data.data);

    // Set meta data to use it on pagination
    setMeta(response.data.meta);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Listening if pagination is changing to another page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const handleDelete = (jenjangId) => {
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
        axios.delete(`http://ppdb.test/api/v1/jenjang/${jenjangId}`)
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
  };

  return (
    <MainLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Jenjang Pendidikan</h2>}
    >
      <Head title="Jenjang Pendidikan" />


      <div className='py-12'>
        <div className="mx-auto sm:px-6 lg:px-8">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Jenjang Pendidikan
            </h1>
            <CreateModal onDataUpdate={fetchData} setCurrentPage={setCurrentPage} />
          </div>

          {/* Table */}
          <div className="card shadow mb-4">

            {/* Card Header */}
            <div className="card-header py-3">
              <div className="row">
                <div className="col-6">
                  <h6 className="m-0 font-weight-bold text-primary">Data Jenjang Pendidikan</h6>
                </div>
                <div className="col-6">
                  <div className="card-tools float-right">
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="card-body">
              <div className="table-responsive">
                <div>
                  <table className='table table-sm table-bordered' style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={tableHeaderIndex} >No</th>
                        <th>Nama Jenjang Pendidikan</th>
                        <th>Kode Jenjang Pendidikan</th>
                        <th style={tableHeaderAction} >Aksi</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th style={tableHeaderIndex}>No</th>
                        <th>Nama Jenjang Pendidikan</th>
                        <th>Kode Jenjang Pendidikan</th>
                        <th style={tableHeaderAction}>Aksi</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {jenjangs.map((jenjang, index) => (
                        <tr key={jenjang.id}>
                          <td style={tableDataIndex}> {index + 1 + (currentPage - 1) * 5} </td>
                          <td> {jenjang.nama_jenjang} </td>
                          <td> {jenjang.kode} </td>
                          <td style={tableDataAction}>
                            <div className="row" style={{ margin: "0" }}>
                              <div className="col-6">
                                <EditModal jenjang={jenjang} onDataUpdate={fetchData} />
                              </div>
                              <div className="col-6">
                                <div>
                                  <button onClick={() => handleDelete(jenjang.id)} className="btn btn-sm btn-danger btn-icon-split" style={btn_xs}>
                                    <span className="icon text-white-50">
                                      <i className="fas fa-trash"></i>
                                    </span>
                                    <span className="text">Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination || Sending with meta and handlePageChange */}
                  {meta && <Pagination meta={meta} handlePageChange={handlePageChange} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
