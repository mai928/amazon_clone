import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { getTotalPrice } from "../Context/AppReducer";
import { useAuth } from "../Context/GlobalContext";
import { Colors } from "../globalStyle";

const SubTotal = () => {
const Navigate=	useNavigate()
	const { basket } = useAuth();

	

	return (
		<CurrencyFormat
			renderText={(value) => (
				<>
					<Typography>
						<strong>Subtotal</strong> ({basket.length} items):
						<strong>{value || "0$"}</strong>
					</Typography>
					<Typography sx={{ mt: 1 ,fontSize:15 ,display:'flex', alignItems:"center" }}>
						<input type="checkbox" style={{marginRight:5}} />
						This order contains a gift
					</Typography>

					<Button
					onClick={()=>Navigate('/Payment')}
						sx={{
							backgroundColor: Colors.DarkgoldColor,
							color: "white",
							mt: 2,
						}}
					>
						Proceed to Checkout
					</Button>
				</>
			)}
			decimalScale={2}
			value={getTotalPrice(basket)}
			displayType={"text"}
			thousandSeparator={true}
			prefix={"$"}
		/>
	);
};

export default SubTotal;
