<template>
    <div>
        <div >
            <button @click="loginType = !loginType; sendUser()">
                Enter
            </button>
        </div>
        <ul>
        </ul>
        <template v-if="loginType === true">
            <label>Username</label>
            <input v-model="name" placeholder="Enter your username" key="username-input">
        </template>
        <template v-else>
            <p>Hello {{ name }}</p>
            <ul>
            </ul>
            <div class="camera">
                <video id="video">Video stream not available.</video>
                <button id="startbutton" @click="sendPicture()">Take photo</button> 
            </div>
            <canvas id="canvas">
            </canvas>
            <div class="output">
                <img id="photo" alt="The screen capture will appear in this box."> 
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TakePicture',
  data() {
    return {
      loginType: true,
      name: "",
      picture: null
    };
  },
  methods: {
    sendUser(){
        if(this.loginType === false){
            console.log("send user");
            axios.post('http://localhost:9999/username', {user: this.name})
            .then(response => (console.log(response.url)));
        }

    },
    sendPicture(){
        console.log("send picture");
        console.log(typeof this.picture);
        // now upload
        axios.post('http://localhost:9999/picture', {url: this.picture}).then(response => {
            console.log(response.data)
        });
    },
    takepicture() {
        //Mostly take from : https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/capture.js
            // The width and height of the captured photo. We will set the
            // width to the value defined here, but the height will be
            // calculated based on the aspect ratio of the input stream.

            var width = 320;    // We will scale the photo width to this
            var height = 0;     // This will be computed based on the input stream

            // |streaming| indicates whether or not we're currently streaming
            // video from the camera. Obviously, we start at false.

            var streaming = false;

            // The various HTML elements we need to configure or control. These
            // will be set by the startup() function.

            var video = null;
            var canvas = null;
            var photo = null;
            var startbutton = null;

            function startup() {
                console.log("in!!!!")

                video = document.getElementById('video');
                canvas = document.getElementById('canvas');
                photo = document.getElementById('photo');
                startbutton = document.getElementById('startbutton');

                navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then(function(stream) {
                video.srcObject = stream;
                video.play();
                })
                .catch(function(err) {
                console.log("An error occurred: " + err);
                });

                video.addEventListener('canplay', function(ev){
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth/width);
                
                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.
                
                    if (isNaN(height)) {
                    height = width / (4/3);
                    }
                
                    video.setAttribute('width', width);
                    video.setAttribute('height', height);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    streaming = true;
                }
                }, false);

                startbutton.addEventListener('click', function(ev){
                takepicture();
                ev.preventDefault();
                }, false);
                
                clearphoto();
            }

            // Fill the photo with an indication that none has been
            // captured.

            function clearphoto() {
                var context = canvas.getContext('2d');
                context.fillStyle = "#AAA";
                context.fillRect(0, 0, canvas.width, canvas.height);

                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
            }
            
            // Capture a photo by fetching the current contents of the video
            // and drawing it into a canvas, then converting that to a PNG
            // format data URL. By drawing it on an offscreen canvas and then
            // drawing that to the screen, we can change its size and/or apply
            // other changes before drawing it.
            var vm = this;
            function takepicture() {
                var context = canvas.getContext('2d');
                if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
                vm.picture = data;
                } else {
                clearphoto();
                }
            }
            function stopWebcam(){
                console.log("Stop webcam");
                const stream = video.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(function(track) {
                    track.stop();
                });
                video = null;
                canvas = null;
            }
            // Set up our event listener to run the startup process
            // once loading is complete.
            //window.addEventListener('keydown', startup(e), false);
            window.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    startup();
                }
                if(e.key === 's'){
                    stopWebcam();
                }
            });
    },
  },
  mounted() {
    this.takepicture();
  }
};
</script>

<style scoped>
#video {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width:320px;
  height:240px;
}

#photo {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width:320px;
  height:240px;
}

#canvas {
  display:none;
}

.camera {
  width: 340px;
  display:inline-block;
}

.output {
  width: 340px;
  display:inline-block;
}

#startbutton {
  display:block;
  position:relative;
  margin-left:auto;
  margin-right:auto;
  bottom:32px;
  background-color: rgba(0, 153, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  color: rgba(255, 255, 255, 1.0);
}

.contentarea {
  font-size: 16px;
  font-family: "Lucida Grande", "Arial", sans-serif;
  width: 760px;
}

</style>
