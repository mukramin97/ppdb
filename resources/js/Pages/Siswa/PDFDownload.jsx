import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { text_xs } from '@/Style/Style';

const PDFDownload = ({ siswa_id, document }) => {
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
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  if (loading) {
    return <p style={{ ...text_xs, marginTop: '10px' }}>Loading...</p>;
  }

  if (!pdfBlob) {
    return (
      <Button style={{ ...text_xs, marginTop: '10px' }} onClick={handleDownload}>
        Download File
      </Button>
    );
  }
};

export default PDFDownload;
