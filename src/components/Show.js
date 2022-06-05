import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mahasiswa: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          mahasiswa: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('mahasiswas').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h3><Link to="/">List Mahasiswa</Link></h3>
            <h4 class="panel-title">
              {this.state.mahasiswa.nim} {this.state.mahasiswa.nama}
            </h4>
          </div>
          <div class="panel-body">
            <dl>
              <dt>NIM:</dt>
              <dd>{this.state.mahasiswa.nim}</dd>
              <dt>Nama:</dt>
              <dd>{this.state.mahasiswa.nama}</dd>
              <dt>Alamat:</dt>
              <dd>{this.state.mahasiswa.alamat}</dd>
              <dt>No.HP:</dt>
              <dd>{this.state.mahasiswa.noHP}</dd>
              <dt>Tahun Angkatan:</dt>
              <dd>{this.state.mahasiswa.thnAngkatan}</dd>
              <dt>Status Mahasiswa:</dt>
              <dd>{this.state.mahasiswa.statusMhs}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
