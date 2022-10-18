import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
const JsonDebugger = ({ data, label }) => {
	const [showDebugger, toggleDebugger] = useState(false);
	return (
		<>
			<Button onClick={() => toggleDebugger(!showDebugger)}>
				{label ? label : "debug"}
			</Button>
			{showDebugger ? <pre>{JSON.stringify(data, null, 2)}</pre> : <></>}
		</>
	);
};

export default JsonDebugger;
