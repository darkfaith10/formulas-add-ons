import React, { useState } from "react";
import ChemInput from "./input";

function ChemDiagram() {
  const [chemicalName, setChemicalName] = useState("");

  const pugURL = chemicalName
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/PNG`
    : "";

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Chemical Structure</h2>
      <ChemInput onSubmit={setChemicalName} />

      {chemicalName && (
        <div style={{ marginTop: "2rem" }}>
          <img
            src={pugURL}
            alt={`Structure of ${chemicalName}`}
            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc", padding: "1rem", backgroundColor: "#fff" }}
          />
        </div>
      )}
    </div>
  );
}

export default ChemDiagram;
