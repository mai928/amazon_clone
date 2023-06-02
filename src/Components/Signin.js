import {
	Box,
	Button,
	InputBase,
	Stack,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logoAuth.png";
import { Colors } from "../globalStyle";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Signin = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");


	// Login
	const SigIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				if (auth) {
					navigate("/");
				}
			})
			.catch((e) => {
				console.log(e, "errorrr");
			});
	};

	//Register
	const register = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)	// return promise
			.then((auth) => {
				if (auth) {
					navigate("/");
				}
			})
			.catch((e) => {
				console.log(e, "errorrr");
			});
	};

	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				py: 5,
			}}
		>
			<Link to={"/"}>
				<Box component={"img"} width={120} src={Logo} sx={{ mb: 2 }} />
			</Link>
			<Stack
				sx={{
					backgroundColor: Colors.white,
					width: 400,
					p: 3,
					borderColor: Colors.lightGrey,
					borderWidth: 2,
					borderStyle: "solid",
				}}
			>
				<Typography
					sx={{ mb: 2 }}
					fontWeight={"700"}
					fontSize={22}
					color={Colors.DarkBlue}
				>
					Sign In
				</Typography>
				<Stack>
					<Typography fontSize={15} fontWeight={"600"}>
						Email
					</Typography>
					<InputBase
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						sx={{
							px: 1,
							py: 0.7,
							backgroundColor: Colors.white,
							border: "1px solid black",
						}}
						placeholder="Enter Your Email"
					/>
					<Typography sx={{ mt: 2 }} fontSize={15} fontWeight={"600"}>
						Password
					</Typography>
					<InputBase
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						sx={{
							px: 1,
							py: 0.7,
							backgroundColor: Colors.white,
							border: "1px solid black",
						}}
						placeholder="Enter Your Password"
					/>
					<Button
						onClick={SigIn}
						sx={{
							my: 3,
							backgroundColor: Colors.DarkgoldColor,
							color: Colors.DarkBlue,
							fontWeight: "600",
							fontSize: 15,
							textTransform: "capitalize",
							borderRadius: 0,
							":hover": {
								backgroundColor: Colors.meduimgold,
							},
						}}
					>
						Sign In
					</Button>
					<Typography sx={{ mb: 2 }}>
						By signing in, you agree to Amazon's Conditions of Use and Privacy
						Notice.
					</Typography>
					<Button
						onClick={register}
						sx={{
							border: "1px solid",
							borderColor: Colors.meduimGrey,
							backgroundColor: Colors.meduimGrey,
							color: Colors.DarkBlue,
							fontWeight: "600",
							fontSize: 15,
							textTransform: "capitalize",
							":hover": {
								backgroundColor: Colors.meduimgold,
							},
						}}
					>
						Create Your Amazon Account
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Signin;
