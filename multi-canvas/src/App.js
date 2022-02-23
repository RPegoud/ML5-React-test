import React from 'react';
import p5 from 'p5';
import SketchObj from './cv/obj_detect.js';
import SketchPose from './cv/pose_detect.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.objRef = React.createRef()
    this.poseRef = React.createRef()
  }

  SketchObj = SketchObj;
  SketchPose = SketchPose;

  componentDidMount() {
    this.objP5 = new p5(this.SketchObj, this.objRef.current)
    this.poseP5 = new p5(this.SketchPose, this.poseRef.current)
  }

  render() {
    return (
      <div>
        <div ref={this.objRef}>
      
        </div>
        <div ref={this.poseRef}>
      
        </div>
      </div>
      
    )
  }
}

export default App;

