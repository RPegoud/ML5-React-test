import React from 'react';
import ReactDOM from 'react-dom';
import * as ml5 from "ml5";
import p5 from 'p5';

const s = ( sketch ) => {

  let video;
  let detector;
  let detections = [];

  sketch.setup = () => {
    sketch.createCanvas(640, 480);
    video = sketch.createCapture(p5.VIDEO, videoReady)
    video.hide();
  };
  
  
  
  function videoReady() {
    // Models available are 'cocossd', 'yolo'
    detector = ml5.objectDetector('cocossd', modelReady);
  }

  function gotDetections(error, results) {
    if (error) {
      console.error(error);
    }
    detections = results;
    detector.detect(video, gotDetections);
  }

  function modelReady() {
    detector.detect(video, gotDetections);
  }

  sketch.draw = () => {
    sketch.image(video, 0, 0);

    
    for (let i = 0; i < detections.length; i += 1) {
      const object = detections[i];
      sketch.stroke(0, 255, 0);
      sketch.strokeWeight(4);
      sketch.noFill();
      sketch.rect(object.x, object.y, object.width, object.height);
      sketch.noStroke();
      sketch.fill(255);
      sketch.textSize(24);
      sketch.text(object.label, object.x + 10, object.y + 24);
    }
  };
};

let myp5 = new p5(s);

ReactDOM.render(myp5, document.getElementById('root'));