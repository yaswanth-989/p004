import React, { Component, use } from 'react';
import {APIURL, callApi } from './lib';
import './App.css';

class App extends Component {
  constructor()
  {
    super();
    this.state = {data: [], showpopup: null, userdata: null};
    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }

  componentDidMount()
  {
    callApi("GET", APIURL, "", this.getData);
  }

  getData(res)
  {
    this.setState({data: res});
  }

  showUserInfo(user){
    this.setState({showpopup: true, userdata: user});
  }

  closeUserInfo(){
    this.setState({showpopup: null});
  }

  render() {
    const {data, showpopup, userdata} = this.state;
    const IMGURL = import.meta.env.BASE_URL;
    return (
      <div className='app'>
        <div className='header'>View Users</div>
        <div className='section'>
          <table>
            <thead>
              <tr>
                <th style={{'width':'50px'}}>ID</th>
                <th style={{'width':'200px'}}>Name</th>
                <th style={{'width':'150px'}}>Username</th>
                <th style={{'width':'300px'}}>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user)=>(
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><img src={IMGURL + "user.png"} alt='' onClick={()=>this.showUserInfo(user)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='footer'>Copyright @ 2026. All rights reserved.</div>

        {showpopup && <div className='overlay'>
          <div className='popup'>
            <button onClick={()=>this.closeUserInfo()}>X</button>
            <p>
              <span>ID</span>
              <span>{userdata.id}</span>
            </p>
            <p>
              <span>Name</span>
              <span>{userdata.name}</span>
            </p>
            <p>
              <span>Username</span>
              <span>{userdata.username}</span>
            </p>
            <p>
              <span>Email ID</span>
              <span>{userdata.email}</span>
            </p>
            <p>
              <span>Address</span>
              <span>{userdata.address.street}, {userdata.address.city} - {userdata.address.zipcode}</span>
            </p>
            <p>
              <span>Phone</span>
              <span>{userdata.phone}</span>
            </p>
            <p>
              <span>Website</span>
              <span>{userdata.website}</span>
            </p>
          </div>
        </div>}    
      </div>      
    );
  }
}

export default App;