import axios from "axios";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export const fetchGreenSpaces = async () => {
  const query = `
    [out:json];
    area["wikidata"="Q90"]->.searchArea;
    (
      way["leisure"~"park|garden|pitch|playground"](area.searchArea);
      relation["leisure"~"park|garden|pitch|playground"](area.searchArea);
      way["landuse"="forest"](area.searchArea);
      relation["landuse"="forest"](area.searchArea);
      way["natural"="wood"](area.searchArea);
      relation["natural"="wood"](area.searchArea);
    );
    out geom;
  `;

  try {
    const response = await axios.post(OVERPASS_API_URL, query, {
      headers: { "Content-Type": "text/plain" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des espaces verts :", error);
    throw error;
  }
};
