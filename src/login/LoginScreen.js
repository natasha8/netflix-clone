import React, { useState } from "react";
import SignUpScreen from "../components/registration/SignUpScreen";
import "./LoginScreen.css";

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);

	return (
		<div className="loginScreen">
			<div className="loginScreen_background">
				<img
					className="loginScreen_logo"
					src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
					alt="logo"
				/>
				<button
					className="loginScreen_log_button"
					onClick={() => setSignIn(true)}
				>
					Sign In
				</button>
				<div className="loginScreen_gradient" />
			</div>
			<div className="loginScreen_body">
				{signIn ? (
					<SignUpScreen />
				) : (
					<>
						<h1>Unlimited films, show, and more...</h1>
						<h2>Watch everywhere. Cancel anytime!</h2>
						<h3>
							Ready to watch? Enter your email or restart your
							membership.
						</h3>
						<div className="loginScreen_form">
							<form action="submit">
								<input type="email" placeholder="Email" />
								<button
									className="loginScreen_starter"
									onClick={() => setSignIn(true)}
								>
									GET STARTED
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
