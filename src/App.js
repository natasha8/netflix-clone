import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomeScreen from "./components/homeScreen/HomeScreen";
import LoginScreen from "./login/LoginScreen";

function App() {
	const user = null;
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
						<Route path="/test">
							<h1>TEST</h1>
						</Route>
					</Switch>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
