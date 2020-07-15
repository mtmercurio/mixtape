<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <div class="content is-medium">
            <h1 class="title">Artists</h1>
            <h2 class="subtitle">In Common</h2>
            <button class="button is-success is-medium" style="margin-bottom: 20px"
                    v-on:click="createArtistsPlaylist"
                    v-bind:class="{ 'is-loading': isArtistsLoading }">
              Create Artists' Top Tracks Playlist
            </button>
            <ul id="our_artists" class="no-bullets-list">
              <li v-for="artist in our_artists" :key="artist.id">
                <a :href="artist.external_urls.spotify" target="_blank">
                  {{ artist.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-half">
          <div class="content is-medium">
            <h1 class="title">Tracks</h1>
            <h2 class="subtitle">In Common</h2>
            <button class="button is-success is-medium" style="margin-bottom: 20px"
                    v-on:click="createSongPlaylist"
                    v-bind:class="{ 'is-loading': isTracksLoading }">
              Create Tracks In Common Playlist
            </button>
            <ul id="our_tracks" class="no-bullets-list">
              <li v-for="track in our_tracks" :key="track.id">
                <a :href="track.external_urls.spotify" target="_blank">
                  {{ track.name }} - {{ track.artists[0].name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mix',
  data() {
    return {
      your_artists: [],
      their_artists: [],
      our_artists: [],
      your_tracks: [],
      their_tracks: [],
      our_tracks: [],
      track_uris: [],
      isArtistsLoading: false,
      isTracksLoading: false,
    };
  },
  async mounted() {
    this.isArtistsLoading = true;
    this.isTracksLoading = true;
    this.your_artists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    this.their_artists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    this.your_tracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    this.their_tracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);

    if (typeof this.your_artists === 'undefined' || typeof this.their_artists === 'undefined') {
      let errorMessage = 'A code was bad';
      if (typeof this.your_artists === 'undefined') {
        errorMessage = 'Your code was bad';
      } else if (typeof this.their_artists === 'undefined') {
        errorMessage = 'Their code was bad';
      }
      this.your_artists = [{
        id: '3q1NKu1dVzFcBfxFos4kE3',
        name: `${errorMessage}. Please get another one.`,
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      }];
      this.your_tracks = [{
        id: '3q1NKu1dVzFcBfxFos4kE3',
        name: errorMessage,
        artists: [{ name: 'Please get another one' }],
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      }];
      this.their_artists = [{
        id: '3q1NKu1dVzFcBfxFos4kE3',
        name: `${errorMessage}. Please get another one.`,
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      }];
      this.their_tracks = [{
        id: '3q1NKu1dVzFcBfxFos4kE3',
        name: errorMessage,
        artists: [{ name: 'Please get another one' }],
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      }];
    }

    this.your_artists.forEach((yourArtist) => {
      this.their_artists.forEach((theirArtist) => {
        if (yourArtist.id === theirArtist.id) {
          this.our_artists.push(yourArtist);
          return true;
        }
        return true;
      });
    });
    this.your_tracks.forEach((yourTracks) => {
      this.their_tracks.forEach((theirTracks) => {
        if (yourTracks.id === theirTracks.id) {
          this.our_tracks.push(yourTracks);
          return true;
        }
        return true;
      });
    });
    if (this.our_artists.length === 0) {
      this.our_artists.push({
        name: 'Britney Spears',
        id: '3E9Wv5hNRwedUjPkkplcx4',
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      });
      this.our_artists.push({
        name: '(jk lol none were found)',
        id: '7ebaLVYxRUfzfEErE49uVQ',
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:7ebaLVYxRUfzfEErE49uVQ',
      });
    }
    if (this.our_tracks.length === 0) {
      this.our_tracks.push({
        name: 'No Matches',
        artists: [{ name: 'None Were Found' }],
        external_urls: { spotify: 'https://open.spotify.com/track/3E9Wv5hNRwedUjPkkplcx4' },
        uri: 'spotify:track:3E9Wv5hNRwedUjPkkplcx4',
      });
    }

    this.our_tracks.forEach((track) => {
      this.track_uris.push(track.uri);
    });

    this.isArtistsLoading = false;
    this.isTracksLoading = false;
  },
  methods: {
    async createSongPlaylist() {
      this.isTracksLoading = true;
      const yourUserID = await fetch('https://api.spotify.com/v1/me', {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => data.id);
      const playlistData = { name: 'Mixtape', public: false, collaborative: true };
      const playlistID = await fetch(`https://api.spotify.com/v1/users/${yourUserID}/playlists`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
        body: JSON.stringify(playlistData),
      })
        .then((response) => response.json())
        .then((data) => data.id);
      await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
        body: JSON.stringify(this.track_uris),
      });
      this.isTracksLoading = false;
      window.location.replace(`https://open.spotify.com/playlist/${playlistID}`);
    },

    async createArtistsPlaylist() {
      this.isArtistsLoading = true;
      const yourUserID = await fetch('https://api.spotify.com/v1/me', {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => data.id);
      const playlistData = { name: 'Mixtape', public: false, collaborative: true };
      const playlistID = await fetch(`https://api.spotify.com/v1/users/${yourUserID}/playlists`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
        body: JSON.stringify(playlistData),
      })
        .then((response) => response.json())
        .then((data) => data.id);

      const fetchingArtistsTopTracks = [];
      this.our_artists.forEach((artist) => {
        fetchingArtistsTopTracks.push(
          fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=from_token`, {
            method: 'get',
            headers: new Headers({
              Authorization: `Bearer ${this.$store.state.your_access_code}`,
            }),
          })
            .then((response) => response.json())
            .then((data) => data.tracks),
        );
      });
      const artistsTopTracks = await Promise.all(fetchingArtistsTopTracks);

      const topTracks = [];
      artistsTopTracks.forEach((artistTopTracks) => {
        artistTopTracks.forEach((topTrack) => {
          // Due to spotify putting a cap on number of added songs on playlist
          if (topTracks.length < 100) {
            topTracks.push(topTrack.uri);
          }
        });
      });

      await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${this.$store.state.your_access_code}`,
        }),
        body: JSON.stringify(topTracks),
      });
      this.isArtistsLoading = false;
      window.location.replace(`https://open.spotify.com/playlist/${playlistID}`);
    },
  },
};
</script>

<style scoped>
  .no-bullets-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: black;
  }

  a:hover {
    color: green;
  }
</style>
