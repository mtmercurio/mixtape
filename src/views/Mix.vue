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
    const yourShortTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirShortTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const yourShortTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirShortTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);

    const yourMediumTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirMediumTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const yourMediumTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirMediumTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);

    const yourLongTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirLongTermArtists = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const yourLongTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.your_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);
    const theirLongTermTracks = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${this.$store.state.their_access_code}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.items);

    if (typeof yourShortTermArtists !== 'undefined' && typeof theirShortTermArtists !== 'undefined') {
      this.your_artists = yourShortTermArtists.concat(yourMediumTermArtists)
        .concat(yourLongTermArtists);

      this.their_artists = theirShortTermArtists.concat(theirMediumTermArtists)
        .concat(theirLongTermArtists);

      this.your_tracks = yourShortTermTracks
        .concat(yourMediumTermTracks).concat(yourLongTermTracks);

      this.their_tracks = theirShortTermTracks.concat(theirMediumTermTracks)
        .concat(theirLongTermTracks);
    } else {
      let errorMessage = 'A code was bad';
      if (typeof yourShortTermArtists === 'undefined') {
        errorMessage = 'Your code was bad';
      } else if (typeof theirShortTermArtists === 'undefined') {
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
          let isInOurArtists = false;
          this.our_artists.forEach((ourArtists) => {
            if (yourArtist.id === ourArtists.id) {
              isInOurArtists = true;
            }
          });
          if (!isInOurArtists) {
            this.our_artists.push(yourArtist);
          }
        }
      });
    });
    this.your_tracks.forEach((yourTracks) => {
      this.their_tracks.forEach((theirTracks) => {
        if (yourTracks.id === theirTracks.id) {
          let isInOurTracks = false;
          this.our_tracks.forEach((ourTrack) => {
            if (yourTracks.id === ourTrack.id) {
              isInOurTracks = true;
            }
          });
          if (!isInOurTracks) {
            this.our_tracks.push(yourTracks);
          }
        }
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
