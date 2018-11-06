// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
LSTM Generator example with p5.js
This uses a pre-trained model on a corpus of Virginia Woolf
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/lstm
=== */


let lstm;
let textInput;
let lengthSlider;
let tempSlider;
let button;
let song;
let bgm;

window.addEventListener("keypress", generate, false);

function preload() {
  bgm = loadSound('waterfall.mp3');
}

function setup() {
    song = loadSound('sans.mp3');
    song.playMode('restart');
    bgm.play();
    bgm.loop();
    noCanvas();

    // Create the LSTM Generator passing it the model directory
    lstm = ml5.LSTMGenerator('./data/', modelReady);

    // Grab the DOM elements
    textInput = select('#textInput');
    lengthSlider = select('#lenSlider');
    tempSlider = select('#tempSlider');
    button = select('#generate');

    // DOM element events
//        button.mousePressed(generate);
        
    //    lengthSlider.input(updateSliders);
    //    tempSlider.input(updateSliders);
}


// Update the slider values
function updateSliders() {
    select('#length').html(lengthSlider.value());
    select('#temperature').html(tempSlider.value());
}

function modelReady() {
    console.log("model loaded");
}

// Generate new text
function generate() {
//    if ( song.isPlaying() ) { // .isPlaying() returns a boolean
//    song.stop();
//  } else {
//    song.play();
//  }
    song.play();
    
    document.getElementById('result').innerHTML = '';
    // Update the status log
    //select('#status').html('Generating...');

    // Grab the original text
    //let original = textInput.value();
    // Make it to lower case
    //    let txt = original.toLowerCase();
    let txt = "*";

    // Check if there's something to send
    if (txt.length > 0) {
        // This is what the LSTM generator needs
        // Seed text, temperature, length to outputs
        // TODO: What are the defaults?
        let data = {
            seed: txt,
            //            temperature: tempSlider.value(),
            temperature: 0.7,
            //            length: lengthSlider.value()
            length: 124
        };

        // Generate text with the lstm
        lstm.generate(data, gotData);

        // When it's done
        function gotData(err, result) {
            // Update the status log
            //select('#status').html('Ready!');
            //select('#result').html(result);
            var options = {
                showCursor: false,
                loop: false,
                strings: [result],
                typeSpeed: 8
            }

            var typed = new Typed("#result", options);
        }
    }
}
