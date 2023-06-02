import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import { BrowserRouter } from "react-router-dom";
import Feed from "./Components/Feed";
import Signin from "./Components/Signin";
import { useAuth } from "./Context/GlobalContext";
import { useEffect } from "react";
import { auth } from "./firebase";
import { Colors } from "./globalStyle";
import { Box } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import Checkout from "./Components/Checkout";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders";

function App() {
	const { dispatch } = useAuth();
	const stripePromise = loadStripe(
		"pk_test_51MOtRLJxo8lnHIfcdDSs5hFk8igwjV80P5bTj9qbKtTBoZzO582NTilcBei3v4ivbGiIojOJinJU5fnc9msB88tb00EvIRWVen",
	);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<BrowserRouter>
			<Box>
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/Signin" element={<Signin />} />
					<Route path="/Checkout" element={<Checkout />} />
					<Route
						path="/Payment"
						element={
							<>
								<Elements stripe={stripePromise}>
									<Payment />
								</Elements>
							</>
						}
					/>
					<Route path="Order" element={<Orders />} />
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
