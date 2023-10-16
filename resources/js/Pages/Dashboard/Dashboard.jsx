import MainLayout from '@/Layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { cardStyles } from '@/Style/Style';


export default function School(props) {

  const [jumlahPendaftar, setJumlahPendaftar] = useState([]);
  const [jumlahPendaftarJenjang, setJumlahPendaftarJenjang] = useState([]);

  useEffect(() => {
    axios.get(`http://ppdb.test/api/v1/dashboard`)
      .then(response => {
        setJumlahPendaftar(response.data.jumlah_pendaftar);
        setJumlahPendaftarJenjang(response.data.jumlah_pendaftar_jenjang);
      });
  }, []);

  return (
    <MainLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hehe</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1">
            {jumlahPendaftar !== null && (
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <div style={cardStyles.highlightedNumber}>{jumlahPendaftar}</div>
                  <h2 className="text-xl font-semibold mb-4">Total Jumlah Pendaftar</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jumlahPendaftarJenjang.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <div style={cardStyles.highlightedNumber}>{item.jumlah_pendaftar}</div>
                  <h2 className="text-xl font-semibold mb-4">{item.nama}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



    </MainLayout>
  );
}
