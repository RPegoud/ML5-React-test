import React from 'react';
import p5 from 'p5';
import SketchObj from './cv/obj_detect.js';
import SketchPose from './cv/pose_detect.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.cvRef = React.createRef()
  }

  SketchObj = SketchObj;
  SketchPose = SketchPose;

  changeModel = () =>{
    this.cvP5.remove()
    this.cvP5 = new p5(this.SketchPose, this.cvRef.current)
  }
  
  componentDidMount() {
    this.cvP5 = new p5(this.SketchObj, this.cvRef.current)
  }

  render() {
    return (
      <div>
        <div ref={this.cvRef}>
        </div>
        <button
          type="button"
          onClick={this.changeModel}
        >Change Model</button>
      </div>
      
    )
  }
}

export default App;

