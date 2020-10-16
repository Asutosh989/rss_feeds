<template>
  <div>
    <v-app-bar color="#fcb69f" dense src="https://picsum.photos/1920/1080?random" dark>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>RSS feeds</v-toolbar-title>

      <v-spacer></v-spacer>

      <span style="cursor: pointer" @click="logout">Logout</span>
    </v-app-bar>
    <div class="d-flex justify-center">
      <v-card width="80vw" class="mt-6">
        <v-card-text>
          <v-text-field
            @click:append="searchFeeds"
            append-icon="mdi-magnify"
            v-model="searchQuery"
            outlined
            @keydown.enter="searchFeeds"
            label="Search"
          />
        </v-card-text>
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
            @click="$router.push(`/dashboard/${selectedOption}`)"
            color="primary"
            :loading="showLoading"
          >Go</v-btn>
        </v-card-text>
      </v-card>
    </div>

    <v-snackbar :color="color" v-model="showSnackbar">
      {{
      this.snackbarMsg
      }}
    </v-snackbar>
  </div>
</template>

<script>
import Api from "@/api";

export default {
  name: "Dashboard",
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
    searchQuery: "",
    searchResults: [],
  }),

  methods: {
    logout() {
      this.$router.push("/");
    },
    populateData() {
      Api.populate()
        .then(response => {
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
    searchFeeds() {
      Api.searchFeeds(this.searchQuery)
        .then(response => {
          console.log(response.data);
          this.searchResults = response.data.results;
          this.searchResults.map((a) => {
            console.log(a.feedId)
          })
          // this.dataToList = response.data;
          this.color = "success";
          this.snackbarMsg = "Search results fetched successfully!";
          this.showSnackbar = true;
        })
        .catch(() => {
          this.color = "error";
          this.snackbarMsg = "Could not fetch search results";
          this.showSnackbar = true;
        });
    }
  },

  mounted() {
    this.populateData();
  }
};
</script>
