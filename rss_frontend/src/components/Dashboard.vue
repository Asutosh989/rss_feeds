<template>
  <div>
    <v-app-bar
      color="#fcb69f"
      dense
      src="https://picsum.photos/1920/1080?random"
      dark
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>RSS feeds</v-toolbar-title>

      <v-spacer></v-spacer>

      <span style="cursor: pointer" @click="logout">Logout</span>
    </v-app-bar>
    <v-card v-if="!showRssFeeds" width="80vw" class="mt-6">
      <v-card-title>Choose</v-card-title>
      <v-card-text>
        <v-radio-group
          v-model="selectedOption"
          :mandatory="false"
          v-for="(dataItems, i) of dataToList"
          :key="i"
          row
        >
          <v-radio row :label="dataItems.name" :value="dataItems.name"></v-radio>
        </v-radio-group>
        <v-btn
          :disabled="selectedOption.length === 0"
          @click="fetchData"
          color="primary"
          :loading="showLoading"
        >
          Go
        </v-btn>
      </v-card-text>
    </v-card>

    <ShowFeeds
      v-else
      :title="selectedOption"
      :rssFeeds="rssFeeds"
      @hide-feeds="showRssFeeds = false"
    />

        <v-snackbar :color="color" v-model="showSnackbar">{{
      this.snackbarMsg
    }}</v-snackbar>
  </div>
</template>

<script>
import ShowFeeds from "@/components/ShowFeeds";
import Api from "@/api";

export default {
  name: "Dashboard",
  components: {
    ShowFeeds,
  },
  data: () => ({
    dataToList: [],
    rssFeeds: [],
    selectedOption: "",
    valid: true,
    show: false,
    showRssFeeds: false,
    showLoading: false,
    activeIndex: -1,
        snackbarMsg: "",
    color: "",
    showSnackbar: false,
  }),

  methods: {
    logout() {
      this.$router.push("/");
    },
    populateData() {
      Api.populate()
        .then((response) => {
          this.dataToList = response.data;
          this.color = "success";
          this.snackbarMsg = "Data fetched successfully!";
          this.showSnackbar = true;
        })
        .catch(() => {
          this.color = "error";
          this.snackbarMsg = "Could not populate data";
          this.showSnackbar = true;
        });
    },
    fetchData() {
      this.showLoading = true;
      Api.fetchData({
        siteoption: this.selectedOption,
      })
        .then((response) => {
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
  },

  mounted() {
    this.populateData();
  },
};
</script>
