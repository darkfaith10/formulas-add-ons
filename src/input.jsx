import React, { useState } from "react";

function ChemInput({ onSubmit }) {
    const [localInput, setLocalInput] = useState("");

    const handleClick = () => {
        if (localInput.trim()) {
            onSubmit(localInput.trim());
        }
    };

    return (
        <div>
            <input
                type="text"
                value={localInput}
                placeholder="Enter chemical name (e.g. benzene)"
                onChange={(e) => setLocalInput(e.target.value)}
                style={{ padding: "0.5rem", width: "300px", marginRight: "10px" }}
            />
            <button onClick={handleClick} style={{ padding: "0.5rem 1rem" }}>
                Submit
            </button>
        </div>
    );
}

export default ChemInput;
