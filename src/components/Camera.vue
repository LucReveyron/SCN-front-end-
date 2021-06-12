<template>
    <div>
        <h2> Camera </h2>
        <div>
            <div>
                <img id="streamer-image" ng-src="">
            </div>
            <div>
                <p>Camera: Main room</p>
                <button :disabled="loadStatus(1) == 'true'" v-on:click="sendPressButton(1)"> Start </button>
            </div>
            <div>
                <p>Camera: Secondary room</p>
                <button :disabled="loadStatus(2) == 'true'" v-on:click="sendPressButton(2)"> Start </button>
            </div>
            <div>
                <p>Camera: Coridor</p>
                <button :disabled="loadStatus(3) == 'true'" v-on:click="sendPressButton(3)"> Start </button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: 'Camera',
    data() {
        return {
            ws: ""
        }
    },
    computed: {
    },
    methods: {
        loadStatus(cameraID){
            if(cameraID == 1){
                return this.$store.state.cam1;
            }
            if(cameraID == 2){
                return this.$store.state.cam2;
            }
            if(cameraID == 3){
                return this.$store.state.cam3;
            } 
        },
        sendPressButton(cameraID){
            axios.post('http://localhost:9999/choice', {id: cameraID})
            .then(response => (console.log(response.url)));

            var path = 'ws://localhost:9999/ws/stream/' + cameraID;
            this.ws = new WebSocket(path);
            var vm = this;

            setTimeout(function(){
                vm.ws.send('1');
                vm.ws.onmessage = function(event){
                    console.log(event.data);
                    const image_elem = document.getElementById("streamer-image");
                    image_elem.src = URL.createObjectURL(event.data);
                    vm.ws.send('1');
            }},500);
        },
    },
    beforeDestroy(){
        console.log("Close websocket");
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send('0');
            this.ws.close();
        }
    }
}
</script>
