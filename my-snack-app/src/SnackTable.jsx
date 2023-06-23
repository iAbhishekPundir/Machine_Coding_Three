import React, { useState } from "react";

const snacksData = [
  {
    id: 1,
    product_name: "Granola Bar",
    product_weight: 21,
    price: 299,
    calories: 150,
    ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"]
  },
  {
    id: 2,
    product_name: "Fruit and Nut Mix",
    product_weight: 73,
    price: 749,
    calories: 353,
    ingredients: [
      "Almonds",
      "Cashews",
      "Dried Cranberries",
      "Dried Blueberries"
    ]
  },
  {
    id: 3,
    product_name: "Veggie Chips",
    product_weight: 28,
    price: 279,
    calories: 130,
    ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"]
  },
  {
    id: 4,
    product_name: "Protein Balls",
    product_weight: 100,
    price: 499,
    calories: 318,
    ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"]
  }
];

export const SnackTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortSnacks = () => {
    let sortedSnacks = [...snacksData];

    if (sortColumn) {
      sortedSnacks.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }
      });
    }

    return sortedSnacks;
  };

  const filteredSnacks = sortSnacks().filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchInput.toLowerCase())
      )
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search with Product or Ingredients..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <table className="snacks-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID </th>
            <th onClick={() => handleSort("product_name")}>Product Name</th>
            <th onClick={() => handleSort("product_weight")}>Product Weight</th>
            <th onClick={() => handleSort("price")}>Price</th>
            <th onClick={() => handleSort("calories")}>Calories</th>
            <th onClick={() => handleSort("ingredients")}>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnacks.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}g</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
