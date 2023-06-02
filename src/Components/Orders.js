import { Stack, Typography } from "@mui/material";
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/GlobalContext";
import { db } from "../firebase";
import Order from "./Order";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useAuth();
	useEffect(() => {
		if (user) {
			const collRef = collection(db, "users", user?.uid, "orders");
			const orderRef = query(collRef, orderBy("created", "desc"));
			onSnapshot(orderRef, (querySnapShot) => {
				setOrders(
					querySnapShot.docs.map((docs) => ({ id: doc.id, data: docs.data() })),
				);
			});
		} else {
			setOrders([]);
		}
	}, [user]);
	return (
		<Stack sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      my:6,

    }}>
			<Typography>Your Order</Typography>
			<Stack>
				{orders.map((item) => (
					<Order order={item} />
				))}
			</Stack>
		</Stack>
	);
};

export default Orders;
