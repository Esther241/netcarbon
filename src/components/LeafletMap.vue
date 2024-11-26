<template>
  <div id="map" style="height: 80vh"></div>
</template>

<script>
import L from "leaflet";

export default {
  name: "LeafletMap",
  props: {
    greenSpaces: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      greenSpacesLayer: null,
    };
  },
  mounted() {
    this.map = L.map("map", {
      center: [48.8566, 2.3522],
      zoom: 14,
      minZoom: 12,
      maxBounds: [
        [48.815573, 2.224199],
        [48.902145, 2.46992],
      ],
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    this.greenSpacesLayer = L.layerGroup().addTo(this.map);

    this.displayGreenSpaces(this.greenSpaces);
  },
  watch: {
    greenSpaces: {
      deep: true,
      handler(newGreenSpaces) {
        this.displayGreenSpaces(newGreenSpaces);
      },
    },
  },
  methods: {
    displayGreenSpaces(greenSpaces) {
      const existingLayers = new Map(
        this.greenSpacesLayer
          .getLayers()
          .map((layer) => [layer.options.id, layer])
      );

      greenSpaces.forEach((space) => {
        if (!existingLayers.has(space.id)) {
          const polygon = L.polygon(space.geometry, {
            color: "green",
            weight: 2,
            id: space.id,
          }).bindPopup(space.popupContent);
          this.greenSpacesLayer.addLayer(polygon);
        }
      });
      existingLayers.forEach((layer, id) => {
        if (!greenSpaces.some((space) => space.id === id)) {
          this.greenSpacesLayer.removeLayer(layer);
        }
      });
    },
  },
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
