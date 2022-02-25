import React from 'react';
import p5 from 'p5';
import SketchObj from './cv/obj_detect.js';
import SketchPose from './cv/pose_detect.js';
import SketchFace from './cv/face_detect.js';
import SketchHand from './cv/hand_detect.js';
import logo from './image1.png';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.cvRef = React.createRef()
  }

  SketchObj = SketchObj;
  SketchPose = SketchPose;
  SketchFace = SketchFace;
  SketchHand = SketchHand;

  start = () =>{
    this.cvP5 = new p5(this.SketchObj, this.cvRef.current)
  }

  objDetector = () =>{
    this.cvP5.remove()
    this.cvP5 = new p5(this.SketchObj, this.cvRef.current)
  }

  PoseNet = () =>{
    this.cvP5.remove()
    this.cvP5 = new p5(this.SketchPose, this.cvRef.current)
  }

  Facemesh = () =>{
    this.cvP5.remove()
    this.cvP5 = new p5(this.SketchFace, this.cvRef.current)
  }

  HandPose = () =>{
    this.cvP5.remove()
    this.cvP5 = new p5(this.SketchHand, this.cvRef.current)
  }

  stopModel = () =>{
    this.cvP5.remove()
  }

  render() {
    return (
      <div class="center">
        <img src={logo} alt="logo"></img>
        <h1>   </h1>
        <div></div>
        <h2>Premier kit: Vision par Ordinateur</h2>

        <button class='button button1'
          type="button"
          onClick={this.start}
        >Start</button>

        <button class='button button0'
          type="button"
          onClick={this.objDetector}
        >Object Detector</button>

        <button class='button button0'
          type="button"
          onClick={this.PoseNet}
        >PoseNet</button>

        <button class='button button0'
          type="button"
          onClick={this.Facemesh}
        >Facemesh</button>

        <button class='button button0'
          type="button"
          onClick={this.HandPose}
        >HandPose</button>

        <button class='button button2'
          type="button"
          onClick={this.stopModel}
        >Stop</button>

        <div ref={this.cvRef}>
        </div>
      </div>
    )
  }
}

export default App;