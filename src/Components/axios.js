import axios from "axios";

const instance = axios.create({
	baseURL: "http://127.0.0.1:5001/registration-app-1ae8e/us-central1/api",

	// http://127.0.0.1:5001/registration-app-1ae8e/us-central1/api/payments/create
});

export default instance