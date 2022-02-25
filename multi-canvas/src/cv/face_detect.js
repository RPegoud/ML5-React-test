import * as ml5 from "ml5";
import p5 from 'p5';

const SketchFace = (p) => {

    let facemesh;
    let video;
    let predictions = [];
    
    p.setup = () => {
        p.createCanvas(640, 480);
        video = p.createCapture(p5.VIDEO)
        facemesh = ml5.facemesh(video, modelReady);
    
        // This sets up an event that fills the global variable "predictions"
        // with an array every time new predictions are made
        facemesh.on("face", results => {
            predictions = results;
        });

        // Hide the video element, and just show the canvas
        video.hide();
    };
    
    function modelReady() {
        console.log("Model ready!");
    }

    p.draw = () => {
        p.image(video, 0, 0);
        
        // We call function to draw all keypoints
        drawKeypoints();
    };

    // A function to draw ellipses over the detected keypoints
    function drawKeypoints() {
        for (let i = 0; i < predictions.length; i += 1) {
            const keypoints = predictions[i].scaledMesh;
  
          // Draw facial keypoints.
            for (let j = 0; j < keypoints.length; j += 1) {
                const [x, y] = keypoints[j];
                
                p.fill(0, 255, 0);
                p.ellipse(x, y, 5, 5);
            }
        }
    }   
}

export default SketchFace;