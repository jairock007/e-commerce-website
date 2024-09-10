import React, { useContext } from "react";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return <div className="shop-category"></div>;
};

export default ShopCategory;
