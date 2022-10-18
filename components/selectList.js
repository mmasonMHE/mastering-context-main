import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
const SelectList = ({
	defaultValue,
	disabled,
	label,
	callback,
	data,
	idField,
	displayField,
	extendedProps,
}) => {
	return (
		<Box width="250px">
			<TextField
				defaultValue={defaultValue}
				disabled={disabled}
				label={label}
				fullWidth
				select
				onChange={(e) => {
					callback(e.target.value, extendedProps);
				}}
			>
				{data.map((item, index) => (
					<MenuItem key={index} value={item}>
						{item[displayField]}
					</MenuItem>
				))}
			</TextField>
		</Box>
	);
};

export default SelectList;
