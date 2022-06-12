import React, { Component } from 'react';
import app from "../base.js";
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = app.firestore().collection('mahasiswas');
    this.state = {
      nim: '',
      nama: '',
      alamat: '',
      hP: '',
      angkatan: '',
      status: '',
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, alamat, hP, angkatan, status } = this.state;

    this.ref.add({
      nim,
      nama,
      alamat,
      hP,
      angkatan,
      status
    }).then((docRef) => {
      this.setState({
        nim: '',
        nama: '',
        alamat: '',
        hP: '',
        angkatan: '',
        status: '',
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { nim, nama, alamat, hP, angkatan, status } = this.state;
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
                <label for="hP">No.HP:</label>
                <input type="text" class="form-control" name="hP" value={hP} onChange={this.onChange} placeholder="No.HP" />
              </div>
              <div class="form-group">
                <label for="angkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="angkatan" value={angkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="status">Status Mahasiswa:</label>
                <input type="text" class="form-control" name="status" value={status} onChange={this.onChange} placeholder="Status Mahasiswa" />
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
