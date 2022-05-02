import { useProduct } from "contexts/ProductContext";
import { Link } from "react-router-dom";

const categories = [
  "Headphones",
  "Shoes",
  "Lipstick",
  "Earphones",
  "Watch",
  "Face Wash",
  "Sunglasses",
  "Bag",
];

const ratings = [
  "4 star and above",
  "3 star and above",
  "2 star and above",
  "1 star and above",
];

const sortBy = ["Price - High to Low", "Price - Low to High"];

const Sidebar = () => {
  const { dispatch, state } = useProduct();

  const clickHandler = (category, value) => {
    dispatch({ type: category, payload: value });
  };

  const isCategoryChecked = (categories, category) => {
    return categories.includes(category);
  };

  return (
    <aside className="drawer">
      <div className="filter">
        <h2>Filters</h2>
        <Link
          to="/product"
          className="clear-filter"
          onClick={() => clickHandler("CLEAR")}
        >
          <u>Clear Filters</u>
        </Link>
      </div>
      <h3 className="heading">CATEGORIES</h3>
      <ul className="sub-drawer stacked-list">
        {categories.map((category, index) => (
          <li className="list-item" key={index}>
            <label>
              <input
                style={{ cursor: "pointer" }}
                onChange={() => clickHandler("categories", category)}
                type="checkbox"
                checked={
                  state.categories.length &&
                  isCategoryChecked(state.categories, category)
                }
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
      <h3 className="heading">RATING</h3>
      <ul className="sub-drawer stacked-list">
        {ratings.map((item, index) => (
          <li className="list-item" key={index}>
            <label>
              <input
                style={{ cursor: "pointer" }}
                onChange={() => clickHandler("Rating", item)}
                checked={state.rating && state["rating"] === item}
                type="radio"
                name="rating"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
      <h3 className="heading">SORTBY</h3>
      <ul className="sub-drawer stacked-list">
        {sortBy.map((item, index) => (
          <li className="list-item" key={index}>
            <label>
              <input
                style={{ cursor: "pointer" }}
                onChange={() => clickHandler("Sort", item.slice(8))}
                checked={state.sortBy && state["sortBy"] === item.slice(8)}
                type="radio"
                name="sort"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export { Sidebar };
