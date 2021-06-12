<template>
    <div class="row">
        <div class="column">
            <h2>Camera Main room</h2>
            <p v-if="status1 == 'false'"> Status : <span style="color: green;">Online</span> </p>
            <p v-if="status1 == 'true'" > Status : <span style="color: red;">Offline</span> </p>
        </div>
        <div class="column">
            <h2>Camera Secondary room</h2>
            <p v-if="status2 == 'false'"> Status : <span style="color: green;">Online</span> </p>
            <p v-if="status2 == 'true'" > Status : <span style="color: red;">Offline</span> </p>
        </div>
        <div class="column">
            <h2>Camera Corridor</h2>
            <p v-if="status3 == 'false'"> Status : <span style="color: green;">Online</span> </p>
            <p v-if="status3 == 'true'" > Status : <span style="color: red;">Offline</span> </p>
        </div>
    </div> 
</template>

<script>
import axios from 'axios';
export default {
    name: 'CameraStatus',
    data() {
        return {
            status: {},
            status1: "true",
            status2: "true",
            status3: "true"
        }
    },
    computed: {
    },
    methods: {
        getStatus() {
            console.log("Load status")
            const path = 'http://localhost:9999/status';
            axios.get(path,{ crossdomain: true }).then((res) => {
            this.status = res.data
            this.status1 = res.data.camera1;
            this.status2 = res.data.camera2;
            this.status3 = res.data.camera3;
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        saveStatus(){
            console.log(this.status.camera1)
            this.$store.commit('setCam',this.status);
        }
    },
    created() {
        this.getStatus();
    },
    destroyed() {
        this.saveStatus();
    }
}
</script>