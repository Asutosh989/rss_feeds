<template>
  <div class="d-flex justify-center">
    <v-card flat width="90vw" class="mt-6">
      <v-card-title>
        {{ title }}
        <v-btn class="ml-5" @click="$router.push('/dashboard')" color="secondary" icon>
          <v-icon medium>mdi-arrow-left-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(data, index) of rssFeeds" :key="index" cols="auto">
            <v-card width="300">
              <v-img
                v-if="Object.keys(data).includes('enclosure')"
                :src="data.enclosure.url || null"
                height="200px"
              ></v-img>

              <v-card-text>
                <div class="subtitle-1">{{ data.title }}</div>
                <div class="body-2 orange--text">
                  {{ getFormatedDate(data.isoDate) }}
                  <v-btn target="_blank" :href="data.link" icon color="accent">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>Expand</v-btn>

                <v-spacer></v-spacer>

                <v-btn v-show="activeIndex === index" icon @click="activeIndex = -1">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-btn v-show="activeIndex !== index" icon @click="activeIndex = index">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="activeIndex === index">
                  <v-divider></v-divider>

                  <v-card-text v-html="data.content"></v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-btn @click="$router.push('/dashboard')" color="primary">Back</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Api from "@/api";
import * as moment from "moment";

export default {
  name: "ShowFeeds",
  data: () => ({
    activeIndex: -1,
    title: '',
    siteName: '',
    rssFeeds: {},
  }),
  mounted() {
    this.siteName = this.$route.params.rssSiteName;
    this.fetchData(this.siteName);
  },
  methods: {
    signIn() {
      Api.login(this.user)
        .then(response => {
          this.color = "success";
          this.snackbarMsg = response.data;
          this.showSnackbar = true;
          this.showLoading = true;
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push("/dashboard");
          }, 2000);
        })
        .catch(error => {
          // const errorStatusCode = error.response.status;
          this.color = "error";
          this.snackbarMsg = error.response.data;
          this.showSnackbar = true;
          this.showLoading = true;
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push("/");
          }, 1500);
        });
    },
    fetchData(selectedOption) {
      this.showLoading = true;
      Api.fetchData({
        siteoption: selectedOption
      })
        .then(response => {
          this.title = this.siteName;
          this.rssFeeds = response.data;
          this.color = "success";
          this.snackbarMsg = "RSS feed fetched successfully!";
          this.showSnackbar = true;
          this.showRssFeeds = true;
          this.showLoading = false;
        })
        .catch(() => {
          this.color = "error";
          this.snackbarMsg = "Could not fetch data";
          this.showSnackbar = true;
          this.showRssFeeds = false;
          this.showLoading = false;
        });
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    getFormatedDate(dateString) {
      return moment(dateString).format("MMMM Do YYYY hh:mm A");
    }
  }
};
</script>
