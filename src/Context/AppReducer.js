export const initialValue = {
	basket: [],
	user: null,
};
const AppReducer = (state = initialValue, action) => {
	console.log(action);
	switch (action.type) {
		case "SET_USER": {
			return {
				...state,
				user: action.user,
			};
		}

		case "ADD_TO_CART": {
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		}

		case "REMOVE_FROM_CART": {
			const filteredCart = state.basket.filter(
				(item) => item.id !== action.payload,
			); 
			return {
				...state,
				basket: filteredCart,
			};
		}

		case 'EMPTY_CART':{
			return {
				...state,
				basket:[]
			}
		}

		default:
			return state;
	}
};

export const getTotalPrice = (basket) => {
	return	basket.reduce((prevPrice, CurrentItem) => {
		   return prevPrice + CurrentItem.price;
	   }, 0);
   };

export default AppReducer;
