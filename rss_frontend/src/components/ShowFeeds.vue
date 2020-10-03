<template>
  <div class="d-flex justify-center">
    <v-card flat width="90vw" class="mt-6">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ rssFeeds[0] }}
        <v-row>
          <v-col v-for="(data, index) of rssFeeds" :key="index" cols="auto">
            <v-card width="300">
              <v-img
                v-if="Object.keys(data).includes('enclosure')"
                :src="data.enclosure.url || null"
                height="200px"
              ></v-img>

              <v-card-text>
                <div class="subtitle-1">
                  {{ data.title }}
                </div>
                <div class="body-2 orange--text">
                  {{ getFormatedDate(data.isoDate) }}
                  <v-btn target="_blank" :href="data.link" icon color='accent'>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange lighten-2" text> Expand </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  v-show="activeIndex === index"
                  icon
                  @click="activeIndex = -1"
                >
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-btn
                  v-show="activeIndex !== index"
                  icon
                  @click="activeIndex = index"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="activeIndex === index">
                  <v-divider></v-divider>

                  <v-card-text v-html="data.content"> </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-btn @click="$emit('hide-feeds')" color="primary"> Back </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Api from "@/api";
import * as moment from "moment";

export default {
  name: "ShowFeeds",

  props: {
    rssFeeds: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    activeIndex: -1,
  }),
  methods: {
    signIn() {
      Api.login(this.user)
        .then((response) => {
          this.color = "success";
          this.snackbarMsg = response.data;
          this.showSnackbar = true;
          this.showLoading = true;
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push("/dashboard");
          }, 2000);
        })
        .catch((error) => {
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
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    getFormatedDate(dateString) {
      return moment(dateString).format("MMMM Do YYYY hh:mm A");
    },
  },
};
</script>
