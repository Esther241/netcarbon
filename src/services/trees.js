import {
  OVERPASS_API_URL,
  ARRONDISSEMENTS_GROUPS_WIKIDATA,
} from "../config/config.js";

const generateOverpassQuery = (arrondissementGroup) => {
  const areas = arrondissementGroup
    .map((id, index) => `area["wikidata"="${id}"]->.arr${index + 1};`)
    .join("\n");

  const nodes = arrondissementGroup
    .map((_, index) => `node["natural"="tree"](area.arr${index + 1});`)
    .join("\n");

  return `
    [out:json][timeout:25];
    ${areas}
    (
      ${nodes}
    );
    out body geom;
  `;
};

export const fetchTreesByGroup = async (arrondissementGroup) => {
  const query = generateOverpassQuery(arrondissementGroup);

  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: query,
    });

    const data = await response.json();
    return data.elements || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
};

export const fetchFirstGroupTrees = async () => {
  return fetchTreesByGroup(ARRONDISSEMENTS_GROUPS_WIKIDATA[0]);
};
