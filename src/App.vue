<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Network status</router-link> |
      <router-link to="/about">Video</router-link> |
      <router-link to="/connection">Presence</router-link> |
      <router-link to="/newperson">New Person</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
