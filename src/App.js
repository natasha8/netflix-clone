import React, { useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomeScreen from "./components/homeScreen/HomeScreen";
import LoginScreen from "./login/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";
import Profile from "./components/profile/Profile";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					})
				);
			} else {
				dispatch(logout());
			}
		});
		return unsubscribe;
	}, [dispatch]);
	return (
		<div className="app">
			<BrowserRouter>
				{!user ? (
					<LoginScreen />
				) : (
					<Switch>
						<Route exact path="/">
							<HomeScreen />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
					</Switch>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
