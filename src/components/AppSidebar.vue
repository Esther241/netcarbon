<template>
  <v-app class="v-col-md-2 v-col-12">
    <v-card height="800" width="256" class="mx-auto">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item>
            <v-list-item-title class="text-h6">Netcarbon</v-list-item-title>
          </v-list-item>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-checkbox
            v-model="localFilterState.selectAll"
            label="Espaces Verts"
            @change="toggleSelectAll"
          ></v-checkbox>
        </v-list-item>

        <v-list dense>
          <v-list-item
            v-for="(type, index) in greenSpaceTypes"
            :key="index"
            class="py-0 my-0"
          >
            <v-checkbox
              v-model="localFilterState.types[type.key]"
              :label="type.name"
              class="checkbox--dense"
              @change="checkSelectAllStatus"
            ></v-checkbox>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    filterState: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localFilterState: { ...this.filterState },
      greenSpaceTypes: [
        { key: "park", name: "Parcs" },
        { key: "garden", name: "Jardins" },
        { key: "forest", name: "Forêts" },
        { key: "wood", name: "Zones boisées" },
        { key: "playground", name: "Aires de jeux" },
        { key: "pitch", name: "Terrains de sport" },
      ],
    };
  },
  watch: {
    filterState: {
      handler(newFilters) {
        this.localFilterState = { ...newFilters };
      },
      deep: true,
    },
  },
  methods: {
    toggleSelectAll() {
      const isSelected = this.localFilterState.selectAll;
      this.greenSpaceTypes.forEach((type) => {
        this.localFilterState.types[type.key] = isSelected;
      });
      this.emitFilters();
    },
    checkSelectAllStatus() {
      const allSelected = this.greenSpaceTypes.every(
        (type) => this.localFilterState.types[type.key]
      );
      this.localFilterState.selectAll = allSelected;
      this.emitFilters();
    },
    emitFilters() {
      this.$emit("update-filters", this.localFilterState);
    },
  },
};
</script>

<style scoped>
.checkbox--dense {
  margin-top: -8px;
  margin-bottom: -8px;
}
</style>
