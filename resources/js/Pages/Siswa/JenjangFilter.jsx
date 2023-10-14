import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function JenjangFilter({ onSelectJenjang }) {
    const [jenjangs, setJenjang] = useState([]);

    useEffect(() => {
        axios.get(`http://ppdb.test/api/v1/jenjang_all`)
            .then(response => setJenjang(response.data.data));
    }, []);

    const handleJenjangChange = (event) => {
         onSelectJenjang(event);
    };

    return (
        <Form.Group>
            <Form.Control
                as="select"
                onChange={handleJenjangChange}
            >
                <option value="">Pilih Jenjang</option>
                {jenjangs.map((jenjang) => (
                    <option key={jenjang.id} value={jenjang.id}>
                        {jenjang.nama_jenjang}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}
