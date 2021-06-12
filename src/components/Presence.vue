<template>
    <div>
        <div :key = "nameList" v-for="(nameList, name) in nameDict">
            <h3>{{ name }}</h3>
            <li :key = "person"  v-for="person in nameList">{{ person }}</li>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Ping',
    data() {
    return {
        nameDict: {},
    };
    },
    methods: {
        getMessage() {
        const path = 'http://localhost:9999/presence';
        axios.get(path,{ crossdomain: true }).then((res) => {
            console.log(res.data)
            this.nameDict = res.data;
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        intervalFetchData: function () {
            setInterval(() => {    
                this.getMessage();
            }, 2000);    
        }
    },
    mounted () {
        this.getMessage();
        //Run the intervalFetchData function once to set the interval time for later refresh
        this.intervalFetchData();
  },
};
</script>