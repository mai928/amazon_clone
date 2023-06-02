import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { Colors } from "../globalStyle";
import { useAuth } from "../Context/GlobalContext";
const Product = ({ title, image, price, id ,rate }) => {
	const { dispatch ,basket } = useAuth();

	const AddToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			item: {
				title,
				image,
				price,
				id,
				rate
			},
		});
	};
	return (


  
		<Stack
			sx={{
				border: "1px solid",
				borderColor: "gray",
				borderRadius: 5,
				backgroundColor: "white",
				p: 3,
				width:{ md:300 ,sm:200 ,xs:190},
				alignItems: "center",
				mx: 2,
				mb: 4,
				":hover": {
					backgroundColor: Colors.DarkBlue,
					color: "white",
				},

				
			}}
		 >
			{/* <Typography>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</Typography> */}
			<Typography fontWeight={"800"} fontSize={20}>
				{title}
			</Typography>
			<Box
				component={"img"}
				src={image}
				sx={{
					width: {md:180 ,xs:100},
					height:{md:180 ,xs:100},
					transition: "all 0.3s ease",
					my: 3,
					":hover": {
						transform: "Scale(1.1)",
					},
				}}
			/>
			<Typography fontWeight={"bold"}>${price}</Typography>
			<Rating readOnly value={rate} />
			<Button
				onClick={AddToCart}
				sx={{
					backgroundColor: Colors.DarkgoldColor,
					":hover": {
						backgroundColor: Colors.lightgoldColor,
						transform: "Scale(0.9)",
						textTransform: "capitalize",
						fontWeight: "700",
					},

					color: "white",
					mt: 3,
					px: 2,
				}}
			>
				Add to Cart
			</Button>
		</Stack> 
	);
};

export default Product;
