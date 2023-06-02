import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/GlobalContext";
import { Colors } from "../globalStyle";
import Header from "./Header";
import axios from "./axios";
import { getTotalPrice } from "../Context/AppReducer";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Payment = () => {
	const navigate = useNavigate();
	const { basket, user, dispatch } = useAuth();

	const [clientSecretKey, setClientSecret] = useState();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");

	const stripe = useStripe();
	const elements = useElements();

	console.log(user);

	const RemoveFromCart = (id) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: id,
		});
	};

	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `payments/create?total=${getTotalPrice(basket) * 100}`,
			});

			setClientSecret(response.data.clientSecret);
			return response;
		};

		getClientSecret();
	}, [basket]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setProcessing(true);

		const payload = await stripe
			.confirmPayment(clientSecretKey, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);

				setDoc(ref,{
					basket,
					amount:paymentIntent.amount,
					created:paymentIntent.created
				})
				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: "EMPTY_CART",
				});

				navigate("/Order", { replace: true });
			});
	};
	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(error ? error.message : "");
	};

	const paymentElementOptions ={
		layout:'tabs'
	}
	return (
		<Stack>
			<Header />
			<Stack
				sx={{
					pt: 12,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "linear-gradient(#F3F3F3, white)",
				}}
			>
				<Typography
					fontSize={20}
					fontWeight={"bold"}
					color={Colors.DarkBlue}
					sx={{ mb: 3 }}
				>
					Checkout(
					<Link
						to={"/Checkout"}
						style={{ textDecoration: "none", fontSize: 17 }}
					>
						{basket.length} items
					</Link>
					)
				</Typography>

				<Stack
					sx={{ backgroundColor: "white", borderRadius: 3, width: "90%", p: 3 }}
				>
					<Stack
						sx={{
							py: 2,
							flexDirection: "row",
							borderBottom: "3px solid",
							borderColor: Colors.lightGrey,
						}}
					>
						<Typography sx={{ width: {md:300 ,xs:250 }}}>Delivery Address</Typography>
						<Stack>
							<Typography>{user?.email || "Guest"}</Typography>
							<Typography>Alex ,Egypt</Typography>
						</Stack>
					</Stack>

					<Stack
						sx={{
							py: 2,
							flexDirection: "row",
							borderBottom: "3px solid",
							borderColor: Colors.lightGrey,
						}}
					>
						<Typography sx={{ width: {md:300 ,xs:250 }}}>
							Review ltems and delivery
						</Typography>
						<Stack
							sx={{
								textAlign: "start",
								mt: 3,
							}}
						>
							{basket.map((item) => {
								return (
									<Stack
										sx={{
											my: 5,
											pb: 1,
										}}
										flexDirection={"row"}
										key={item.id}
									>
										<Box
											component={"img"}
											sx={{ mr: 3 }}
											width={110}
											src={item.image}
										/>
										<Stack>
											<Typography fontWeight={"bold"}>{item.title}</Typography>
											<Typography fontSize={13} fontWeight={"600"}>
												${item.price}
											</Typography>
											<Rating
												sx={{ fontSize: 15, my: 1 }}
												readOnly
												value={item.rate}
											/>
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
										</Stack>
									</Stack>
								);
							})}
						</Stack>
					</Stack>

					<Stack
						sx={{
							py: 2,
							flexDirection: "row",
							borderBottom: "3px solid",
							borderColor: Colors.lightGrey,
						}}
					>
						<Typography sx={{ width: {md:300 ,xs:200 }}}
						>Payment Method</Typography>
						<Stack
							sx={{
								width: "-webkit-fill-available",
								mx:{md:10 ,xs:0}
							}}
						>
							{/* <Typography>Order Total </Typography> */}

							<form onSubmit={handleSubmit}>
								<CardElement onChange={handleChange} />
								<CurrencyFormat
									renderText={(value) => (
										<>
											<Typography sx={{display:'flex', justifyContent:'flex-end'}}>
												<strong>Subtotal</strong> ({basket.length} items):
												<strong>{value || "0$"}</strong>
											</Typography>

											<Button
												disabled={processing || disabled || succeeded}
												type="submit"
												sx={{
													backgroundColor: Colors.DarkgoldColor,
													color: "white",
													mt: 2,
												}}
											>
												{processing ? (
													<Typography>processing</Typography>
												) : (
													"Buy Now"
												)}
											</Button>
										</>
									)}
									decimalScale={2}
									value={getTotalPrice(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>

							</form>

							{error && <Typography>{error}</Typography>}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Payment;
