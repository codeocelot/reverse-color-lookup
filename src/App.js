import React, { Component } from 'react';
// import logo from './logo.svg';
import ghLogo from './github-logo.png';
import './App.css';
import {Map} from 'immutable';

import {hexToName as toName, nameToHex as toHex} from './colors/hex';

const makeMap = (obj) => {
    const map = new Map().withMutations((map) => {
      Object.keys(obj).forEach(key => {
          map.set(key, obj[key]);
      });
    });
    return map;
}

const hexToName = makeMap(toName);
const nameToHex = makeMap(toHex);

const HexResultEntry = ({hex,name}) => <div>
  <svg width="20" height="20">
    <circle r="10" fill={hex} cx="10" cy="10"/>
  </svg>
  <span>{name}</span><span> {hex}</span>
</div>

const NameResultEntry = ({hex,name}) => <div>
  <svg width="20" height="20">
    <circle r="10" fill={hex} cx="10" cy="10"/>
  </svg>
  <span>{name}</span><span> {hex}</span>
</div>

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hex : '#',
      name: '',
    }
  }
  setHex = (event) => {
    let value = event.target.value;
    if(value[0] !== '#'){
      value = `#${value}`;
    };
    this.setState({hex:value.toLowerCase()})
  }
  setName = (event) => {
    this.setState({name: event.target.value.toLowerCase()})
  }
  makePossibleNames = () => {
    const names = hexToName.filter((val,key) => key.includes(this.state.hex))
    return names
      .sort((a,b) => a > b ? 1 : -1 )
      .map((n, h) => NameResultEntry({name: n, hex: h}));
  }
  makePossibleHex = () => {
    const hex = nameToHex.filter((val,key) => key.toLowerCase().includes(this.state.name))
    return hex
      .sort((a,b) => a > b ? 1 : -1)
      .map((h,n) => HexResultEntry({hex:h,name:n}))
  }
  render() {
    const possibleNames = this.makePossibleNames();
    const possibleHex = this.makePossibleHex();
    return (
      <div className="App">
        <div style={{width: '50%', display: 'inline-block'}}>
          <h3>Hex</h3>
          <input type="text" name="hex" onChange={this.setHex} value={this.state.hex} />
          <div className="list">
            <span>Possible Names</span>
            {possibleNames}
          </div>
        </div>
        <div style={{width: '50%', float: 'right', display:'inline-block'}}>
          <h3>Name</h3>
          <input type="text" name="name-to-hex"
            onChange={this.setName}
            value={this.state.name}/>
          <div className="list">
            <span>Possible Hex</span>
            {possibleHex}
          </div>
        </div>
        <footer>
            <p>Made with ☕️ & </p>

          <a href="https://github.com/codeocelot/reverse-color-lookup">
            <img src={ghLogo} width="32" height="32"/>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
