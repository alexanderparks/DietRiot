const queryStrings = {
  app_id: process.env.REACT_APP_APP_ID,
  app_key: process.env.REACT_APP_APP_KEY,
};
// zza&app_id=1f37d51d&app_key=%20f3a7b78675e3bd3644e14b6ad7f98e40%09
export const fetchData = async (defaultQuery) => {
  const { app_id, app_key } = queryStrings;
  try {
    const data = await fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}"
    );
    const response = await data.json();
    return response;
  } catch (e) {
    console.log(e, "something went wrong");
    return e;
  }
};
