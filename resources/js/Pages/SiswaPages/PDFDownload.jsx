import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PDFDownload = ({ siswa_id, document, onDataUpdate }) => {

  const handleDownload = () => {
    axios.get(`http://ppdb.test/api/v1/file_download/${siswa_id}/${document}`, { responseType: 'blob' })
      .then(response => {
        if (response.status === 404) {
          setError(response.data.error);
        } else {
          // Open the file in a new window
          const newWindow = window.open('', '_blank', 'height=600,width=800');
          if (newWindow) {
            const fileUrl = URL.createObjectURL(response.data);
            newWindow.location.href = fileUrl;
            newWindow.focus();
          } else {
            console.error('Popup blocker may have prevented opening a new window.');
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    <Button onClick={handleDownload}>
      Lihat Berkas
    </Button>
  );
  
};

export default PDFDownload;
