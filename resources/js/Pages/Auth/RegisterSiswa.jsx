import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { text_xs } from '@/Style/Style';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import jsPDF from 'jspdf';



export default function RegisterSiswa() {
    const [jenjangs, setJenjang] = useState([]);

    const [formData, setFormData] = useState({
        nama_siswa: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        jenis_tes: "",
        jenjang_id: "",
        no_hp: ""
    });

    useEffect(() => {
        axios.get(`http://ppdb.test/api/v1/jenjang_all`)
            .then(response => setJenjang(response.data.data));
    }, []);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://ppdb.test/api/v1/siswa`, formData)
            .then((response) => {
                console.log("Success:", response.data);

                const pdf = new jsPDF();
                pdf.setFontSize(20);
                pdf.setFont("helvetica");
                pdf.text("Name: " + response.data.name, 10, 20);
                pdf.text("Email: " + response.data.email, 10, 30);
                pdf.text("Password: " + response.data.password, 10, 40);

                pdf.save("Detail Login.pdf");

                setFormData({
                    nama_siswa: "",
                    tempat_lahir: "",
                    tanggal_lahir: "",
                    jenis_kelamin: "",
                    jenis_tes: "",
                    jenjang_id: "",
                    no_hp: ""
                });
                window.location.replace('http://ppdb.test/login');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <h4 style={{ textAlign: "center" }}><strong>Formulir Pendaftaran</strong></h4>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}
                    >Nama Lengkap</Form.Label>
                    <Form.Control
                        type='text'
                        style={text_xs}
                        name="nama_siswa"
                        id="nama_siswa"
                        placeholder="Masukkan Nama Lengkap"
                        autoFocus
                        value={formData.nama_siswa}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}
                    >Tempat Lahir</Form.Label>
                    <Form.Control
                        type='text'
                        style={text_xs}
                        name="tempat_lahir"
                        id="tempat_lahir"
                        placeholder="Masukkan Tempat Lahir"
                        value={formData.tempat_lahir}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}
                    >Tanggal Lahir</Form.Label>
                    <Form.Control
                        type='date'
                        style={text_xs}
                        name="tanggal_lahir"
                        id="tanggal_lahir"
                        placeholder="Masukkan Tanggal Lahir"
                        value={formData.tanggal_lahir}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}>Jenis Kelamin</Form.Label>
                    <Form.Control
                        className='custom-select'
                        as="select"
                        style={text_xs}
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                        value={formData.jenis_kelamin}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}>Jenis Tes</Form.Label>
                    <Form.Control
                        className='custom-select'
                        as="select"
                        style={text_xs}
                        name="jenis_tes"
                        id="jenis_tes"
                        value={formData.jenis_tes}
                        onChange={handleInputChange}>
                        <option value="" disabled>Pilih Lokasi Tes</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label style={text_xs}>Jenis Tes</Form.Label>
                    <Form.Control
                        className='custom-select'
                        as="select"
                        style={text_xs}
                        name="jenjang_id"
                        id="jenjang_id"
                        value={formData.jenjang_id}
                        onChange={handleInputChange}>
                        <option value="" disabled>Jenjang Pilihan</option>
                        {jenjangs.map((jenjang) => (
                            <option key={jenjang.id} value={jenjang.id}>{jenjang.nama_jenjang}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label style={text_xs}
                    >Nomor Handphone</Form.Label>
                    <Form.Control
                        type='text'
                        style={text_xs}
                        name="no_hp"
                        id="no_hp"
                        value={formData.no_hp}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nomor Handphone"
                    />
                </Form.Group>
                <Link
                    as="Button"
                    style={{
                        fontSize: "12px",
                        padding: "2px 10px",
                        margin: "0px",
                        height: "34px"
                    }}
                    className="ml-2 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 float-right"
                    variant="primary"
                    onClick={onSubmit}>
                    Daftar
                </Link>
                <Link
                    as="Button"
                    style={{
                        fontSize: "12px",
                        padding: "2px 10px",
                        margin: "0px",
                        height: "34px"
                    }}
                    className="ml-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 float-right"
                    variant="secondary"
                    href='/login'
                >
                    Login
                </Link>
            </Form>
        </GuestLayout>
    );
}
