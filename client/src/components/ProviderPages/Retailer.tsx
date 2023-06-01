import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

export default function Retailer() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <div className="content-container">
        <h1 className="main-header">Update Product</h1>
        <h3 className="sub-header">
          Keep information about an existing product up to date
        </h3>
        <button className="generic-button" onClick={handleAddProductClick}>
          Add product
        </button>
      </div>
    </div>
  );
}
