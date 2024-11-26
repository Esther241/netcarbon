import { fetchTreesByGroup } from "@/services/trees.js";

export const processTreesData = async () => {
  const fetchedData = await fetchTreesByGroup();

  return fetchedData.elements
    .filter((element) => element.tags && element.tags["natural"] === "tree")
    .map((element) => {
      const { tags, id, lat, lon } = element;

      return {
        id: id,
        latitude: lat,
        longitude: lon,
        species: tags.species || "Inconnu",
        genus: tags.genus || null,
        height: tags.height ? parseFloat(tags.height) : null,
        diameter: tags.diameter ? parseFloat(tags.diameter) : null,
        circumference: tags.circumference
          ? parseFloat(tags.circumference)
          : null,
        age: tags.age ? parseInt(tags.age, 10) : null,
        leafType: tags["leaf_type"] || "Inconnu",
        leafCycle: tags["leaf_cycle"] || "Inconnu",
        health: tags.health || "Non spécifié",
        protected: tags.protected === "yes",
        name: tags.name || null,
        location: tags.location || null,
        popupContent: `
          <strong>${tags.name || "Arbre"}</strong><br>
          Espèce : ${tags.species || "Inconnu"}<br>
          Hauteur : ${tags.height || "Non spécifiée"} m<br>
          Diamètre : ${tags.diameter || "Non spécifié"} m<br>
          Circonférence : ${tags.circumference || "Non spécifiée"} m<br>
          Santé : ${tags.health || "Non spécifiée"}<br>
          Type de feuilles : ${tags["leaf_type"] || "Inconnu"}<br>
          Cycle des feuilles : ${tags["leaf_cycle"] || "Inconnu"}<br>
          ${tags.wikidata ? `<a href="https://www.wikidata.org/wiki/${tags.wikidata}" target="_blank">Wikidata</a>` : ""}
        `,
      };
    });
};

export const filterTrees = (trees, filters, filterType = "genus") => {
  if (filters.selectAll) return trees;

  if (!filters[filterType] || typeof filters[filterType] !== "object") {
    return trees;
  }
  const selectedFilters = Object.entries(filters[filterType])
    .filter(([key, isSelected]) => isSelected)
    .map(([key]) => key);

  return trees.filter((tree) => selectedFilters.includes(tree[filterType]));
};
