import { WIKI_GET_TYPES } from "../../const";

// If selectedYear is provided, return results for that year, if any.
// Otherwise, return the latest five entries.
export const getWikiPageData = (selectedYear, wikiData) => {
  if (wikiData) {
    let data = {};

    Object.values(WIKI_GET_TYPES).reduce((acc, currType) => {
      const result = !selectedYear
        ? wikiData[currType].slice(0, 5)
        : wikiData[currType].filter((item) => item.year === selectedYear);
      data[currType] = result;
      return data;
    }, data);

    return data;
  } else {
    return null;
  }
};
