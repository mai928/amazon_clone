import React, { useContext } from "react";
import '../App.css'
import { Link } from "react-router-dom";
import Logo from "../assets/amazon.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
	Box,
	InputBase,
	Stack,
	Typography,
} from "@mui/material";
import { Colors } from "../globalStyle";
import { useAuth } from "../Context/GlobalContext";
import { auth } from "../firebase";

const Header = () => {
	const { user ,basket } = useAuth();

	const handleSiginOut = () => {
		auth.signOut();
	};
	return (
		<Stack
			sx={{
				position:'fixed',
				flexDirection: "row",
				backgroundColor: Colors.DarkBlue,
				alignItems: "center",
				justifyContent: "space-between",
				py: 1,
				zIndex:2,
				width:'100%',
			}}
		>
			<Stack  sx={{ flexDirection: "row" }}>
				<Link className="logo" to={"/"}>
					<Box component={"img"} src={Logo} sx={{ mx:{md: 6 ,sm:2}, pt: 1 }} />
				</Link>
				<Stack className="input" sx={{ flexDirection: "row" }}>
					<InputBase
						sx={{
							px: 1,
							backgroundColor: Colors.white,
							width:{lg:'690px' ,md:'400px' ,sm:'280px' ,xs:'160px'},
							borderTopLeftRadius: 4,
							borderBottomLeftRadius: 4,
						}}
						placeholder="Search Amazon"
					/>
					<SearchOutlinedIcon
						sx={{
							color: Colors.white,
							backgroundColor: Colors.meduimgold,
							py: 1.4,
							px: 1.3,
							borderTopRightRadius: 4,
							borderBottomRightRadius: 4,
							":hover": { backgroundColor: Colors.DarkgoldColor },
						}}
					/>
				</Stack>
			</Stack>

			<Stack sx={{ flexDirection: "row" }}>
				<Stack
					sx={{
						mr: 4,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography fontSize={10} color={Colors.white}>
						hello {user ? user.email : "Guest"}
					</Typography>
					{user ? (
						<Link style={{ textDecoration: "none" }} onClick={handleSiginOut}>
							<Typography fontWeight={"bold"} color={Colors.white}>
								Sign out
							</Typography>
						</Link>
					) : (
						<Link style={{ textDecoration: "none" }} to={"/Signin"}>
							<Typography fontWeight={"bold"} color={Colors.white}>
								Sign In
							</Typography>
						</Link>
					)}
				</Stack>
				<Stack
				className="return"
					sx={{
						mr: 4,
						display: {lg:'flex' ,xs:'none'},
						alignItems: "center",
						justifyContent: "center",
						
					}}
				>
					<Typography fontSize={15} color={Colors.white}>
						Return
					</Typography>
					<Link style={{ textDecoration: "none" }} to={"/Order"}>
						<Typography fontSize={14} fontWeight={"bold"} color={Colors.white}>
							& Order
						</Typography>
					</Link>
				</Stack>
				<Stack
				className="Yourprime"
					sx={{
						mr: 4,
						display: {lg:'flex' ,xs:'none'},
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography fontSize={15} color={Colors.white}>
						Your
					</Typography>
					<Typography fontWeight={"bold"} color={Colors.white}>
						Prime
					</Typography>
				</Stack>

				<Stack
					sx={{
						mr: 4,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography fontWeight={"bold"} color={Colors.DarkgoldColor}>
						{basket?.length}
					</Typography>

					<Link style={{ textDecoration: "none" }} to={"/Checkout"}>
						<ShoppingCartOutlinedIcon sx={{ color: Colors.white }} />
					</Link>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Header;
