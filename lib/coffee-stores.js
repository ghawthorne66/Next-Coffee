import { createApi } from "unsplash-js"

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "restaurant",
    perPage: 40,
  })
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"])
}

export const fetchCoffeeStores = async (
  //Andorra
  // latLong = "42.5419419,1.3175097",
  //Barcelona
  // latLong = "41.3926467,2.0701492",
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 8
) => {
  try {
  const photos = await getListOfCoffeeStorePhotos()
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  )
  const data = await response.json()
    console.log("data", data)

  return (
    data.results?.map((venue, idx) => {
      return {
        // ...venue,
        id: venue.fsq_id,
        address: venue.location.address || "",
        name: venue.name,
        neighbourhood:
          venue.location.neighborhood ||
          venue.location.crossStreet ||
          "near me",
        imgUrl: photos[idx],
      }
    }) || []
  )
} catch (error) {
  if (
    !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ||
    !process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
  ) {
    console.error(
      "🚨 Make sure to setup your API keys, checkout the docs on Github 🚨"
    );
  }
  console.log("Something went wrong fetching coffee stores", error);
  return [];
}
};
