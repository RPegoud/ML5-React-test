import React from 'react';
import p5 from 'p5';
import SketchObj from './cv/obj_detect.js';
import SketchPose from './cv/pose_detect.js';
import SketchFace from './cv/face_detect.js';
import SketchHand from './cv/hand_detect.js';
import First from './First.js';


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
        <First></First>
        <div></div>
        <h2 class='title1'>Module découverte</h2>
        <h2 class='at1'>Atelier n'2</h2>

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

        <div class='rect1'>

          <div ref={this.cvRef} class='rect2'>
          </div>
        </div>
      </div>
    )
  }
}

export default App;