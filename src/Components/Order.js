import React from "react";
import moment from "moment";
import { Button, Stack, Typography } from "@mui/material";
import CurrencyFormat from "react-currency-format";
import { Colors } from "../globalStyle";
import { useAuth } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";

const Order = ({ order }) => {
	const Navigate = useNavigate();
	const { basket } = useAuth();
	return (
		<Stack sx={{ width: 800, my: 6 }}>
			<Typography>
				{moment.unix(order.data.created).format("MMMM DA YYYY h:mma")}
			</Typography>
			<Typography>{order.id}</Typography>

			<Stack>
				{order.data.basket?.map((item) => (
					<CheckoutItem
						// key={item.id}
						// title={item.title}
						// image={item.image}
						// rate={item.rate}
						// price={item.price}
						item={item}
						hiddenButton
					/>
				))}

				<CurrencyFormat
					renderText={(value) => (
						<>
							<Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
								<strong>Subtotal : </strong>
								<strong>{value || "0$"}</strong>
							</Typography>
						</>
					)}
					decimalScale={2}
					value={order.data.amount}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</Stack>
		</Stack>
	);
};

export default Order;
