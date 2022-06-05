import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nim: '',
      nama: '',
      alamat: '',
      noHP: '',
      thnAngkatan: '',
      statusMhs: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswa = doc.data();
        this.setState({
          key: doc.id,
          nim: mahasiswa.nim,
          nama: mahasiswa.nama,
          alamat: mahasiswa.alamat,
          noHP: mahasiswa.noHP,
          thnAngkatan: mahasiswa.thnAngkatan,
          statusMhs: mahasiswa.statusMhs,
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

    const { nim, nama, alamat, noHP, thnAngkatan, statusMhs } = this.state;

    const updateRef = firebase.firestore().collection('mahasiswas').doc(this.state.key);
    updateRef.set({
      nim,
      nama,
      alamat,
      noHP,
      thnAngkatan,
      statusMhs
    }).then((docRef) => {
      this.setState({
        key: '',
        nim: '',
        nama: '',
        alamat: '',
        noHP: '',
        thnAngkatan: '',
        statusMhs: '',
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
                <input type="text" class="form-control" name="noHP" value={this.state.noHP} onChange={this.onChange} placeholder="No.HP" />
              </div>
              <div class="form-group">
                <label for="thnAngkatan">Tahun Angkatan:</label>
                <input type="text" class="form-control" name="thnAngkatan" value={this.state.thnAngkatan} onChange={this.onChange} placeholder="Tahun Angkatan" />
              </div>
              <div class="form-group">
                <label for="statusMhs">Status Mahasiswa:</label>
                <input type="text" class="form-control" name="statusMhs" value={this.state.statusMhs} onChange={this.onChange} placeholder="Status Mahasiswa" />
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
