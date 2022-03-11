import * as ml5 from "ml5";
import p5 from 'p5';

const SketchObj = (p) => {

    let video;
    let detector;
    let detections = [];

    p.setup = () => {
      p.createCanvas(1280, 720, p5.WEBGL);
      video = p.createCapture(p5.VIDEO, videoReady)
      video.size(1280, 720);
      video.volume(0);
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
  
    p.draw = () => {
      p.image(video, 0, 0, 1280, 720);
  
      
      for (let i = 0; i < detections.length; i += 1) {
        const object = detections[i];
        p.stroke(0, 255, 0);
        p.strokeWeight(4);
        p.noFill();
        p.rect(object.x, object.y, object.width, object.height);
        p.noStroke();
        p.fill(255);
        p.textSize(24);
        p.text(object.label, object.x + 10, object.y + 24);
      }
    };
  }
export default SketchObj;