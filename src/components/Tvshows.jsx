import { useState } from "react";
import ListPage from "./partials/ListPage";

const Tvshows = () => {
  const [category, setCategory] = useState("airing_today");

  return (
    <ListPage
      heading="TV shows"
      tag={category}
      endpoint={`/tv/${category}`}
      cardType="tv"
      filters={[
        { title: "Category", option: ["airing_today", "on_the_air", "popular", "top_rated"], value: category, onChange: setCategory },
      ]}
    />
  );
};

export default Tvshows;
