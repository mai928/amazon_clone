import { Stack } from "@mui/material";
import React from "react";
import { Colors } from "../globalStyle";
import Header from "./Header";
import Home from "./Home";

const Feed = () => {
	return (
		<Stack>
			<Header />
			<Home />
		</Stack>
	);
};

export default Feed;
