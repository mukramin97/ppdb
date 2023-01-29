import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Layouts/Pagination';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { tableDataAction, tableHeaderAction, tableHeaderIndex, tableDataIndex } from '@/Style/TableStyles';
import { btn_xs } from '@/Style/TableStyles';

export default function School(props) {
  const [schools, setSchools] = useState([]);
  const [meta, setMeta] = useState([]);

  // Define currentPage with default 1 to get current paginate index
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    // Set listening to API based on currentPage
    const response = await axios.get(`/api/v1/schools?page=${currentPage}`);

    // Set schools data to display on table 
    setSchools(response.data.data);

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

  const handleDelete = (schoolId) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`http://ppdb.test/api/v1/schools/${schoolId}`)
        .then((response) => {
          console.log("Success:", response.data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <MainLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hehe</h2>}
    >
      <Head title="School" />

      <div className='py-12'>
        <div className="mx-auto sm:px-6 lg:px-8">

          {/* Title Page */}
          <h1 className="h3 mb-2 text-gray-800">Tables</h1>
          <p className="mb-4">
            DataTables is a third party plugin that is used to generate the demo table below.
            For more information about DataTables.
          </p>

          {/* Table */}
          <div className="card shadow mb-4">

            {/* Card Header */}
            <div className="card-header py-3">
              <div className="row">
                <div className="col-6">
                  <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div className="col-6">
                  <div className="card-tools float-right">

                    {/* CreateModal */}
                    <CreateModal onDataUpdate={fetchData} setCurrentPage={setCurrentPage} />

                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="card-body">
              <div className="table-responsive " style={{ overflowX: "auto" }}>
                <div id='dataTable_wrapper' className="dataTables_wrapper dt-bootstrap4">
                  <table className='table table-bordered dataTable' id='dataTable' cellSpacing='0' role='grid' width='100%' style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={ tableHeaderIndex } >No</th>
                        <th>School Name</th>
                        <th style={ tableHeaderAction } >Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th style={ tableHeaderIndex }>No</th>
                        <th>School Name</th>
                        <th style={ tableHeaderAction }>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {schools.map((school, index) => (
                        <tr key={school.id}>
                          <td style={ tableDataIndex }> {index + 1 + (currentPage - 1) * 5} </td>
                          <td> {school.school_name} </td>
                          <td style={ tableDataAction }>
                            <div className="row">
                              <div className="col-6">
                                <EditModal school={school} onDataUpdate={fetchData} />
                              </div>
                              <div className="col-6">
                                <div>
                                  <button onClick={() => handleDelete(school.id)} className="btn btn-sm btn-danger btn-icon-split" style={ btn_xs }>
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
