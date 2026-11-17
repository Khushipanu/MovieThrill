import { useState } from "react";
import ListPage from "./partials/ListPage";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");

  return (
    <ListPage
      heading="Trending"
      tag={`${category} · ${duration === "day" ? "today" : "this week"}`}
      endpoint={`/trending/${category}/${duration}`}
      cardType={category}
      filters={[
        { title: "Category", option: ["all", "movie", "tv"], value: category, onChange: setCategory },
        { title: "Duration", option: ["day", "week"], value: duration, onChange: setDuration },
      ]}
    />
  );
};

export default Trending;
