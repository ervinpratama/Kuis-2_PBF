import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('mahasiswas');
    this.unsubscribe = null;
    this.state = {
      mahasiswas: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const mahasiswas = [];
    querySnapshot.forEach((doc) => {
      const { nim, nama, alamat, noHP, thnAngkatan, statusMhs } = doc.data();
      mahasiswas.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nim,
        nama,
        alamat,
        noHP,
        thnAngkatan,
        statusMhs
      });
    });
    this.setState({
      mahasiswas
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              List Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Add Mahasiswa</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>No.HP</th>
                  <th>Tahun Angkatan</th>
                  <th>Status Mahasiswa</th>
                </tr>
              </thead>
              <tbody>
                {this.state.mahasiswas.map(mahasiswa =>
                  <tr>
                    <td><Link to={`/show/${mahasiswa.key}`}>{mahasiswa.nim}</Link></td>
                    <td>{mahasiswa.nama}</td>
                    <td>{mahasiswa.alamat}</td>
                    <td>{mahasiswa.noHP}</td>
                    <td>{mahasiswa.thnAngkatan}</td>
                    <td>{mahasiswa.statusMhs}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
