import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import shortid from "shortid";
import Background1 from "../assets/background1.jpg";
import Product from "./Product";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import { Colors } from "../globalStyle";

const Home = () => {
	return (
		<Stack
			sx={{
				overflow: "hidden",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(#F3F3F3, white)",
				zIndex: 1,
				mt: 8.6,
			}}
		>
			<Box 
				src={Background1}
				component={"img"}
				sx={{
					width:{ sm:"100%" ,xs:'900px'},
					zIndex: -1,
					marginBottom: "-230px",
					height: {sm:'100%' ,xs:'400px'},
				}}
			/>

			<Stack
			className="products"
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					zIndex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "",
					// mt:10
				}}
			>
				<Product
					title="Gaming HeadSet"
					image={img1}
					price={220}
					id={shortid.generate()}
					rate={5}
				/>
				<Product
					title="Pavilion Laptop"
					image={img2}
					price={400}
					id={shortid.generate()}
					rate={5}
				/>
				<Product
					title="HP Printer"
					image={img3}
					price={462}
					id={shortid.generate()}
					rate={5}
				/>
				<Product
					title="Gaming Airbods"
					image={img4}
					price={677}
					id={shortid.generate()}
					rate={5}
				/>
				<Product
					title="Intel Usb"
					image={img5}
					price={235}
					id={shortid.generate()}
					rate={5}
				/>
				<Product
					title="Samsung Galaxy"
					image={img6}
					price={680}
					id={shortid.generate()}
					rate={5}
				/>
			</Stack>
		</Stack>
	);
};

export default Home;
