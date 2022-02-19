import React from 'react';
import ReactDOM from 'react-dom';
import * as ml5 from "ml5";
import p5 from 'p5';

const s = ( sketch ) => {

  let video;
  let poseNet;
  let pose;
  let skeleton;

  sketch.setup = () => {
    sketch.createCanvas(640, 480);
    video = sketch.createCapture(p5.video)
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  };

  function modelLoaded() {
    console.log('poseNet ready')
  }

  function gotPoses(poses){
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }

  sketch.draw = () => {
    sketch.image(video, 0, 0);

    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = sketch.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      sketch.fill(255, 0, 0);
      sketch.ellipse(pose.nose.x, pose.nose.y, d);
      sketch.fill(0, 0, 255);
      sketch.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
      sketch.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
      
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        sketch.fill(0,255,0);
        sketch.ellipse(x,y,16,16);
      }
      
      for (let i = 0; i < skeleton.length; i++) { 
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        sketch.strokeWeight(2);
        sketch.stroke(255);
        sketch.line(a.position.x, a.position.y,b.position.x,b.position.y);     
      }
    }

  };
};

let myp5 = new p5(s);

ReactDOM.render(myp5, document.getElementById('root'));