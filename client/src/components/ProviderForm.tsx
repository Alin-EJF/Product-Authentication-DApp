import React, { useState } from "react";

function ProviderForm() {
  const [formState, setFormState] = useState({
    productOrigin: "",
    manufacturingDate: "",
    batchNumber: "",
    supplyChainJourney: "",
    storageConditions: "",
    productSpecifications: "",
    certifications: "",
    thirdPartyTestResults: "",
    sellerInformation: "",
    productOwnershipHistory: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the submission of the form
    console.log(formState);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="productOrigin"
        value={formState.productOrigin}
        onChange={handleInputChange}
        placeholder="Product Origin"
      />
      <input
        type="date"
        name="manufacturingDate"
        value={formState.manufacturingDate}
        onChange={handleInputChange}
        placeholder="Manufacturing Date"
      />
      <input
        type="text"
        name="batchNumber"
        value={formState.batchNumber}
        onChange={handleInputChange}
        placeholder="Batch Number"
      />
      <input
        type="text"
        name="supplyChainJourney"
        value={formState.supplyChainJourney}
        onChange={handleInputChange}
        placeholder="Supply Chain Journey"
      />
      <input
        type="text"
        name="storageConditions"
        value={formState.storageConditions}
        onChange={handleInputChange}
        placeholder="Storage Conditions"
      />
      <input
        type="text"
        name="productSpecifications"
        value={formState.productSpecifications}
        onChange={handleInputChange}
        placeholder="Product Specifications"
      />
      <input
        type="text"
        name="certifications"
        value={formState.certifications}
        onChange={handleInputChange}
        placeholder="Certifications"
      />
      <input
        type="text"
        name="thirdPartyTestResults"
        value={formState.thirdPartyTestResults}
        onChange={handleInputChange}
        placeholder="Third-Party Test Results"
      />
      <input
        type="text"
        name="sellerInformation"
        value={formState.sellerInformation}
        onChange={handleInputChange}
        placeholder="Seller Information"
      />
      <input
        type="text"
        name="productOwnershipHistory"
        value={formState.productOwnershipHistory}
        onChange={handleInputChange}
        placeholder="Product Ownership History"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProviderForm;
