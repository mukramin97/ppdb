import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PDFDownload = ({ siswa_id, document, onDataUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleDownload = () => {
    setLoading(true);
    axios.get(`http://ppdb.test/api/v1/file_download/${siswa_id}/${document}`, { responseType: 'blob' })
      .then(response => {
        if (response.status === 404) {
          setError(response.data.error);
        } else {
          setPdfBlob(response.data);
          const fileUrl = URL.createObjectURL(response.data);
          window.open(fileUrl, '_blank');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }



  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pdfBlob) {
    return (
      <Button onClick={handleDownload}>
        Unduh Berkas
      </Button>
    );
  }
};

export default PDFDownload;
