import { useState } from "react";
import ListPage from "./partials/ListPage";

const Movies = () => {
  const [category, setCategory] = useState("now_playing");

  return (
    <ListPage
      heading="Movies"
      tag={category}
      endpoint={`/movie/${category}`}
      cardType="movie"
      filters={[
        { title: "Category", option: ["now_playing", "popular", "top_rated", "upcoming"], value: category, onChange: setCategory },
      ]}
    />
  );
};

export default Movies;
