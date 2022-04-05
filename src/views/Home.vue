<template>
  <div>
    <div class="section">
      <div class="container" style="max-width: 700px">
        <div class="content is-medium">
          <h1 class="title is-1">Mixtape</h1>
          <p>
            An app to see if you and someone else have similar taste in music.
          </p>
          <br/>
          <p>

            <a
              :href="`https://accounts.spotify.com/authorize?client_id=${this.client_ID}&redirect_uri=${this.redirect_uri}&scope=user-top-read+playlist-modify-public+playlist-modify-private&response_type=token`"
            >
              <button class="button is-large is-success">
                Start Mixing
              </button>
            </a>
          </p>
          <br/>
          <p>
            Each person needs to click the above button on their own devices.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  data() {
    return {
      redirect_uri: process.env.VUE_APP_REDIRECT_URI,
      client_ID: process.env.VUE_APP_CLIENT_ID,
    };
  },
};
</script>
