import { fetchGreenSpaces } from "@/services/greenSpaces";

export const processGreenSpaces = async () => {
  const fetchedData = await fetchGreenSpaces();

  return fetchedData.elements
    .filter((element) => element.geometry && element.tags)
    .map((element) => {
      const { geometry, tags, bounds, id } = element;

      let type = null;
      if (tags.leisure) {
        type = tags.leisure;
      } else if (tags.landuse === "forest") {
        type = "forest";
      } else if (tags.natural === "wood") {
        type = "wood";
      }
      return {
        id: id,
        name: tags.name || "Espace Vert",
        type: type || "Inconnu",
        leisure: tags.leisure || null,
        openingHours: tags.opening_hours || "Non spécifié",
        website: tags.website || null,
        bounds: bounds || null,
        geometry: geometry.map((point) => [point.lat, point.lon]),
        popupContent: `
            <strong>${tags.name || "Espace Vert"}</strong><br>
            Type : ${type || "Inconnu"}<br>
            Wikidata : ${tags.wikidata || "Inconnu"}<br>
            Heures d'ouverture : ${tags.opening_hours || "Non spécifié"}<br>
            ${tags.website ? `<a href="${tags.website}" target="_blank">Visiter le site</a>` : ""}
          `,
      };
    });
};

export const filterGreenSpaces = (greenSpaces, filters) => {
  if (filters.selectAll) {
    return greenSpaces;
  }

  const selectedTypes = Object.entries(filters.types)
    .filter(([_, isSelected]) => isSelected)
    .map(([type]) => type);
  return greenSpaces.filter((space) => selectedTypes.includes(space.type));
};
