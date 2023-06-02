import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../Context/GlobalContext";
import { Colors } from "../globalStyle";

const CheckoutItem = ({item ,hiddenButton}) => {
    const {dispatch}=useAuth()
    const RemoveFromCart = (id) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: id,
		});
	};
	return (
		<Stack
			sx={{
				mx: 5,
				my: 2,
				pb: 1,
				borderBottom: "2px solid",
				borderColor: Colors.lightGrey,
			}}
			flexDirection={"row"}
			key={item.id}
		>
			<Box component={"img"} sx={{ mr: 3 }} width={110} src={item.image} />
			<Stack>
				<Typography fontWeight={"bold"}>{item.title}</Typography>
				<Typography fontSize={13} fontWeight={"600"}>
					${item.price}
				</Typography>
				<Rating sx={{ fontSize: 15, my: 1 }} readOnly value={item.rate} />
			{
                !hiddenButton && (
                    <Button 
					onClick={() => RemoveFromCart(item.id)}
					sx={{
						backgroundColor: Colors.DarkgoldColor,
						color: "white",
						fontSize: 13,
						textTransform: "capitalize",
					}}
				>
					Remove from Cart
				</Button>
                )
            }
			</Stack>
		</Stack>
	);
};

export default CheckoutItem;
