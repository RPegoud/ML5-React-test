import React from 'react';
import ReactDOM from 'react-dom';
import * as ml5 from "ml5";
import p5 from 'p5';

const s = ( sketch ) => {

  let video;
  let poseNet;
  let poses = [];

  sketch.setup = () => {
    sketch.createCanvas(640, 480);
    // sketch.getContext("2d");
    video = sketch.createCapture(p5.VIDEO)
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', function(results) {
      poses = results;
    });

    video.hide();
  };

  function modelLoaded() {
    console.log('poseNet ready')
  }

  sketch.draw = () => {
    sketch.image(video, 0, 0);
    
    drawKeypoints();
    drawSkeleton();
  };

  function drawKeypoints() {
    for (let i = 0; i < poses.length; i += 1) {
      // For each pose detected, loop through all the keypoints
      const pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j += 1) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        const keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          sketch.fill(255, 0, 0);
          sketch.noStroke();
          sketch.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }

  function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i += 1) {
      const skeleton = poses[i].skeleton;
      // For every skeleton, loop through all body connections
      for (let j = 0; j < skeleton.length; j += 1) {
        const partA = skeleton[j][0];
        const partB = skeleton[j][1];
        sketch.stroke(255, 0, 0);
        sketch.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }
};

let myp5 = new p5(s);

ReactDOM.render(myp5, document.getElementById('root'));