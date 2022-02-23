import React, {Component} from 'react';
import './App.css';
import * as ml5 from "ml5";
import { createCanvas } from 'canvas';
import p5 from 'p5';

let video;
let poseNet;
let pose;
let skeleton;

function setup(){
  const p = new p5();
  sketch.createCanvas(640,480);
  video = sketch.createCapture(p5.video);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw(){  
  //image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    p5.fill(255, 0, 0);
    p5.ellipse(pose.nose.x, pose.nose.y, d);
    p5.fill(0, 0, 255);
    p5.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    p5.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      p5.fill(0,255,0);
      p5.ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) { 
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      p5.strokeWeight(2);
      p5.stroke(255);
      p5.line(a.position.x, a.position.y,b.position.x,b.position.y);     
    }
  }
}


function App() {
  setup();
  draw();
  return (
    <div>
    </div>
  );
}

export default App;
