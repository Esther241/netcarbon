<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <AppSidebar
            :filterState="filterState"
            @update-filters="updateFilters"
          />
        </v-col>

        <v-col cols="12" md="9">
          <div v-if="loading">Chargement des données...</div>
          <div v-else>
            <LeafletMap :greenSpaces="filteredGreenSpaces" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import {
  processGreenSpaces,
  filterGreenSpaces,
} from "@/models/GreenSpaceModel";

export default {
  components: {
    AppSidebar,
    LeafletMap,
  },
  data() {
    return {
      greenSpaces: [],
      loading: false,
      filterState: {
        selectAll: false,
        types: {
          park: false,
          garden: false,
          forest: false,
          wood: false,
          playground: false,
          pitch: false,
        },
      },
    };
  },
  computed: {
    filteredGreenSpaces() {
      return filterGreenSpaces(this.greenSpaces, this.filterState);
    },
  },
  async created() {
    this.loading = true;
    try {
      this.greenSpaces = await processGreenSpaces();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    updateFilters(newFilters) {
      this.filterState = { ...this.filterState, ...newFilters };
    },
  },
};
</script>

<style>
.v-container {
  padding: 16px;
}
.v-row {
  margin-bottom: 16px;
}
</style>
