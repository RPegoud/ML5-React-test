import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js'
import 'https://unpkg.com/ml5@0.4.2/dist/ml5.min.js'

let video;
let poseNet;
let pose;
let skeleton;

let brain;
let state = 'waiting';
let targetLabel;

function keyPressed(){
    targetLabel = key;
    /*console.log(targetLabel);
    setTimeout(function(){
        console.log('collecting');
        state='collecting';
    }, 1000);*/
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
 /* let options = {
      inputs: 34,
      outputs: 4,
      task: 'classsification',
      debug: true
  }
  brain = ml5.neuralNetwork(options);*/
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    //brain.addData(inputs, target)
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
  }
}