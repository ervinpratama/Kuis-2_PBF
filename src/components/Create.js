import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('mahasiswas');
    this.state = {
      nim: '',
      nama: '',
      alamat: '',
      noHP: '',
      thnAngkatan: '',
      statusMhs: '',
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, alamat, noHP, thnAngkatan, statusMhs } = this.state;

    this.ref.add({
      nim,
      nama,
      alamat,
      noHP,
      thnAngkatan,
      statusMhs
    }).then((docRef) => {
      this.setState({
        nim: '',
        nama: '',
        alamat: '',
        noHP: '',
        thnAngkatan: '',
        statusMhs: '',
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { nim, nama, alamat, noHP, thnAngkatan, statusMhs } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">List Mahasiswa</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nim">NIM:</label>
                <input type="text" class="form-control" name="nim" value={nim} onChange={this.onChange} placeholder="NIM" />
              </div>
              <div class="form-group">
                <label for="nama">Nama:</label>
                <input type="text" class="form-control" name="nama" value={nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat:</label>
                <input type="text" class="form-control" name="alamat" value={alamat} onChange={this.onChange} placeholder="Alamat" />
              </div>
              <div class="form-group">
                <label for="noHP">No.HP:</label>
                <input type="text" class="form-control" name="noHP" value={noHP} onChange={this.onChange} placeholder="No.HP" />
              </div>
              <div class="form-group">
                <label for="thnAngkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="thnAngkatan" value={thnAngkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="statusMhs">Status Mahasiswa:</label>
                <input type="text" class="form-control" name="statusMhs" value={statusMhs} onChange={this.onChange} placeholder="Status Mahasiswa" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
