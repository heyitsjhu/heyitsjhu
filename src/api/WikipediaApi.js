import a from "axios";

const axios = a.create({
  baseURL: "https://byabbe.se/on-this-day/",
});

class WikipediaApi {
  async get(type, month, day, year) {
    const url = `/${month}/${day}/${type}.json`;
    try {
      const response = await axios.get(url);
      if (response.status === 200 && response.data) {
        const sorted = response.data[type].sort(
          (a, b) => Number(b.year) - Number(a.year)
        );

        return {
          ...response.data,
          [type]: sorted,
        };
      }
    } catch (error) {
      // TODO: handle errors, log them?
      console.error(error);
    }
  }

  async _getDataDuringYear(year, data) {
    return await data.filter((dataItem) => dataItem.year === "2000");
  }
}

export default WikipediaApi;
