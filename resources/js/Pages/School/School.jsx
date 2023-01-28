import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Layouts/Pagination';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function School(props) {
  const [schools, setSchools] = useState([]);
  const [meta, setMeta] = useState([]);

  // Define currentPage wiith default 1 to get current paginate index
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      // Set listening to API based on currentPage
      const response = await axios.get(`/api/v1/schools?page=${currentPage}`);

      // Set schools data to display on table 
      setSchools(response.data.data);

      // Set meta data to use it on pagination
      setMeta(response.data.meta);
    }

    fetchData();
  }, [currentPage]);

  // Listening if pagination is changing to another page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

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
              <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>

            {/* Card Content */}
            <div className="card-body">
              <div className="table-responsive " style={{ overflowX: "auto" }}>
                <div id='dataTable_wrapper' className="dataTables_wrapper dt-bootstrap4">
                  <table className='table table-bordered dataTable' id='dataTable' cellSpacing='0' role='grid' width='100%' style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>School Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>No</th>
                        <th>School Name</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {schools.map((school, index) => (
                        <tr key={school.id}>
                          <td> {index + 1}</td>
                          <td>{school.school_name}</td>
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">School!</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
