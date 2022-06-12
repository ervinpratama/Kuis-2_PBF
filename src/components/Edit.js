import React, { Component } from 'react';
import app from "../base";
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nim: '',
      nama: '',
      alamat: '',
      hpP: '',
      angkatan: '',
      status: '',
    };
  }

  componentDidMount() {
    const ref = app.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswa = doc.data();
        this.setState({
          key: doc.id,
          nim: mahasiswa.nim,
          nama: mahasiswa.nama,
          alamat: mahasiswa.alamat,
          hP: mahasiswa.hP,
          angkatan: mahasiswa.angkatan,
          status: mahasiswa.status,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ mahasiswa: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, alamat, hP, angkatan, status } = this.state;

    const updateRef = app.firestore().collection('mahasiswas').doc(this.state.key);
    updateRef.set({
      nim,
      nama,
      alamat,
      hP,
      angkatan,
      status
    }).then((docRef) => {
      this.setState({
        key: '',
        nim: '',
        nama: '',
        alamat: '',
        hP: '',
        angkatan: '',
        status: '',
      });
      this.props.history.push("/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Mahasiswa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">List Mahasiswa</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="nim">NIM:</label>
                <input type="text" class="form-control" name="nim" value={this.state.nim} onChange={this.onChange} placeholder="NIM" />
              </div>
              <div class="form-group">
                <label for="nama">Nama:</label>
                <input type="text" class="form-control" name="nama" value={this.state.nama} onChange={this.onChange} placeholder="Nama" />
              </div>
              <div class="form-group">
                <label for="alamat">Alamat:</label>
                <input type="text" class="form-control" name="alamat" value={this.state.alamat} onChange={this.onChange} placeholder="Alamat" />
              </div>
              <div class="form-group">
                <label for="noHP">No.HP:</label>
                <input type="text" class="form-control" name="hP" value={this.state.hP} onChange={this.onChange} placeholder="No.HP" />
              </div>
              <div class="form-group">
                <label for="angkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="angkatan" value={this.state.angkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="status">Status Mahasiswa:</label>
                <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status Mahasiswa" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
