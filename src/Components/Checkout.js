import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../Context/GlobalContext";
import EmptyCart from "../assets/EmptyCart.avif";
import ChexkoutAd from "../assets/checkoutAd.jpg";
import { Colors } from "../globalStyle";
import { Navigate, useNavigate } from "react-router-dom";
import SubTotal from "./SubTotal";
import CheckoutItem from "./CheckoutItem";

const Checkout = () => {
	const Navigate = useNavigate();
	const { user, basket, dispatch } = useAuth();

	console.log("basket", basket);

	return (
		<Stack
			sx={{
				background: "linear-gradient(#F3F3F3, white)",
			}}
		>
			<Stack sx={{ mx: 5 }}>
				<Box component={"img"} src={ChexkoutAd} height={90} />
			</Stack>


			<Stack
					sx={{
					
						width:'85%',
						mx:5,
						mt:5,
						display:{sm:'flex' ,md:'none'}
					}}
				>
					<Stack
						sx={{
							borderTop: "3px solid",
							borderTopColor: Colors.meduimGrey,
							borderRadius: 2,
							backgroundColor: "white",
							mb: 2,
							py: 1,
						}}
					>
						<Typography sx={{ mx:5}}>Hello , {user?.email || 'Guest'}</Typography>
					</Stack>

					<Stack
						sx={{
							backgroundColor: "white",
							p: 3,
							borderRadius: 2,
						}}
					>
						<SubTotal />
					</Stack>
				</Stack>


			<Stack
				sx={{ flexDirection:{md:'row' ,sm:'column'}, display: "flex", justifyContent: "space-between", ml:5 ,mr:{md:15} }}
			>

				<Stack sx={{ width: {lg:"77%" ,md:'60% ',sm:'90%' ,xs:'95%'} }}>
					<Stack sx={{ mt: 4 ,mb:1 }}>
						<Typography sx={{opacity:0.7 }} fontSize={20} fontWeight={"800"}>Your Shopping Cart</Typography>
					</Stack>

					<Stack
						sx={{
							backgroundColor: "white",
							borderRadius: 2,

							borderTop: "3px solid",
							textAlign: "center",
							borderColor: Colors.meduimGrey,
							borderRadius: 2,
							width: "100%",
						}}
					>
						{!basket?.length == 0 ? (
							<Stack
								sx={{
									textAlign: "start",
									mt: 3,
								}}
							>
								{basket.map((item) => {
									return (
										<CheckoutItem item={item}/>
									);
								})}
							</Stack>
						) : (
							<Stack
								sx={{
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Box component={"img"} src={EmptyCart} width={500} />
								<Typography
									sx={{
										color: Colors.DarkBlue,
										mb: 2,
										fontWeight: "bold",
										opacity: 0.6,
									}}
								>
									OOPS! , Your Cart is Empty
								</Typography>
								<Button
									sx={{ backgroundColor: "#1976d22b", color: "#1976d2ed" ,textTransform:'capitalize'}}
									onClick={() => Navigate("/")}
								>
									Go To Home
								</Button>
							</Stack>
						)}
					</Stack>
				</Stack>

				<Stack
					sx={{
						position: "fixed",
						right: 25,
						mt:9,
						display:{md:'flex' ,xs:'none'}
					}}
				>
					<Stack
						sx={{
							borderTop: "3px solid",
							borderTopColor: Colors.meduimGrey,
							borderRadius: 2,
							backgroundColor: "white",
							mb: 2,
							py: 1,
						}}
					>
						<Typography sx={{ mx:{md: 5,xs:0.1}}}>Hello , {user?.email || 'Guest'}</Typography>
					</Stack>

					<Stack
						sx={{
							backgroundColor: "white",
							p: 3,
							borderRadius: 2,
						}}
					>
						<SubTotal />
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Checkout;
