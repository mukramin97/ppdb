import SiswaLayout from '@/Layouts/SiswaLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { form_dashboard, label_dashboard } from '@/Style/Style';
import { tableDataAction, tableHeaderAction, tableHeaderIndex, tableDataIndex, btn_xs } from '@/Style/Style';


export default function DashboardSiswa(props) {
  const [imageUrl, setImageUrl] = useState([]);
  const [siswa, setSiswa] = useState([]);

  const [pengumumans, setPengumumans] = useState([]);

  useEffect(() => {
    axios.get(`http://ppdb.test/api/v1/preview_pasfoto/${props.auth.user.id}`, { responseType: 'blob' })
      .then(response => {
        setImageUrl(URL.createObjectURL(response.data));
      });

    axios.get(`http://ppdb.test/api/v1/siswa/dashboard/${props.auth.user.id}`)
      .then(response => {
        setSiswa(response.data.data);
      });

    axios.get(`http://ppdb.test/api/v1/pengumuman_all`)
      .then(response => {
        setPengumumans(response.data.data);
      });


  }, []);


  return (
    <SiswaLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hehe</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
              Dashboard
            </h1>
          </div>

          <div className="row">
            <div className="col-xl-9 col-lg-8" >
              <div className="card shadow mb-4" >
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Selamat datang, {siswa.nama_siswa}!
                  </h6>
                </div>
                <div className="card-body" >
                  <div className='table table-sm table-responsive' style={{ margin: '0' }}>
                    <table style={{ width: '100%' }}>
                      <tbody>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Nomor Formulir</td>
                          <td style={form_dashboard}>{siswa.nomor_formulir}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Jalur Tes</td>
                          <td style={form_dashboard}>{siswa.jenis_tes}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Nama Lengkap</td>
                          <td style={form_dashboard}>{siswa.nama_siswa}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Tempat / Tanggal Lahir</td>
                          <td style={form_dashboard}>{siswa.tempat_lahir}, {new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Jenis Kelamin</td>
                          <td style={form_dashboard}>Laki-laki</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Nomor Handphone</td>
                          <td style={form_dashboard}>{siswa.no_hp}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Status Pendaftaran</td>
                          <td style={form_dashboard}>{siswa.status_pendaftaran}</td>
                        </tr>
                        <tr style={{ border: '0' }}>
                          <td style={label_dashboard}>Status Seleksi</td>
                          <td style={form_dashboard}>{siswa.status_seleksi}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4" >
              <div className="card shadow mb-4" >
                <div className="card-header py-3">
                  <h6 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="m-0 font-weight-bold text-primary">
                    Pasfoto
                  </h6>
                </div>

                <div className="card-body" >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" style={{ width: '160px', height: '240px', objectFit: 'cover' }} />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="col-xl-12 col-lg-12" >
              <div className="card shadow mb-4" >
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Pengumuman
                  </h6>
                </div>
                <div className="card-body" >
                  <div className='table table-responsive table-bordered'>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th style={tableHeaderIndex} >No</th>
                          <th>Pengumuman</th>

                        </tr>
                      </thead>
                      <tbody>
                        {pengumumans.map((pengumuman, index) => (
                          <tr key={pengumuman.id}>
                            <td style={tableDataIndex}> {index + 1} </td>
                            <td> {pengumuman.content} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SiswaLayout>
  );
}
