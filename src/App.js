import React,{Component} from 'react';
import HeatMap from './HeatMap';
import request from './request';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    this.getData();
    setInterval(()=>this.getData(),1000);
  }
  async getData(){
    let {data} = await request('./data/currentData.json');
    this.setState({data});
  }
  render(){
    if(this.state.data.length===0){
      return null;
    }
    return (
      <div className="App">
        <h2>24 hour workload on an average week.</h2>
        <HeatMap data={this.state.data}/>
      </div>
    );
  }
}

export default App;
