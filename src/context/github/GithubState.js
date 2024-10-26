import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from "../types";

// Initialize Variables
let githubClientId;
let githubClientSecret;

// Check the environments if in production or not
if (process.env.NODE_ENV !== "production") {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_ID;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_ID;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = async (text) => {
		try {
			setLoading();

			const res = await axios.get(
				`http://api.github.com/search/users?q=${text}&client_id=${githubClientId} & client_secret=${githubClientSecret}`
			);

			dispatch({
				type: SEARCH_USERS,
				payload: res.data.items,
			});
		} catch (error) {}
	};

	// Get User
	const getUser = async (username) => {
		setLoading();

		const res = await axios.get(
			`http://api.github.com/users/${username}?client_id=${githubClientId} & client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	// Get Repos
	const getUserRepos = async (username) => {
		setLoading();
		const res = await axios.get(
			`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId} & client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
