import { useState } from "react";
import ListPage from "./partials/ListPage";

const Popular = () => {
  const [category, setCategory] = useState("movie");

  return (
    <ListPage
      heading="Popular"
      tag={category}
      endpoint={`/${category}/popular`}
      cardType={category}
      filters={[{ title: "Category", option: ["movie", "tv"], value: category, onChange: setCategory }]}
    />
  );
};

export default Popular;
