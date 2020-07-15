<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <label class="label is-medium " for="yourCode">Your Code</label>
            <div class="field has-addons has-addons-centered">
              <div class="control is-expanded">
                <input class="input is-medium" id="yourCode" type="text" readonly
                       :value="access_code"/>
              </div>
              <div class="control">
                <a class="button is-success is-medium" v-on:click="copyText">
                  <span v-if="this.copied">
                    Copied
                  </span>
                  <span v-else>
                    Copy
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-one-third">
            <label class="label is-medium" for="theirCode">Their Code</label>
            <div class="field">
              <div class="control">
                <input class="input is-medium" id="theirCode" type="text"/>
              </div>
            </div>
          </div>
        </div>
        <button class="button is-large is-success" v-on:click="submitCodes">
          Compare Favorites
        </button>
      </div>
      <br/>
      <div class="content is-medium">
        <p>
          Now exchange codes and input your friend's code above.
        </p>
        <p>
          <strong>Note:</strong> codes expire in one hour.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Codes',
  data() {
    return {
      access_code: '',
      copied: false,
    };
  },
  methods: {
    copyText() {
      /* Get the text field */
      const copyText = document.getElementById('yourCode');

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand('copy');
      this.copied = true;
    },
    submitCodes() {
      let code = document.getElementById('yourCode').value;
      this.$store.commit('updateYourAccessCode', code);
      code = document.getElementById('theirCode').value;
      this.$store.commit('updateTheirAccessCode', code);
      this.$router.push('mix');
    },

  },
  created() {
    const { hash } = this.$router.currentRoute;
    this.access_code = hash.split('&')[0].split('=')[1].valueOf();
  },
};
</script>

<style scoped/>
