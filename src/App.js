import React,{Component} from 'react';
import HeatMap from './HeatMap';
import request from './request';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    setInterval(()=>{this.getData();},5000);
  }
  async getData(){
    let data = await request('./data/currentData.json');
    this.setState({data});
  }
  render(){
    return (
      <div className="App">
      <HeatMap/>
      </div>
    );
  }
}

export default App;
