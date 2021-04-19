import React from "react";
import "./LoginScreen.css";

function LoginScreen() {
	return (
		<div className="loginScreen">
			<div className="loginScreen_background">
				<img
					className="loginScreen_logo"
					src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
					alt="logo"
				/>
				<button className="loginScreen_button">Sign In</button>
				<div className="loginScreen_gradient" />
			</div>
			<div className="loginScreen_body">
				<h1>Unlimited films, show, and more...</h1>
				<h2>Watch everywhere. Cancel anytime!</h2>
				<h3>
					Ready to watch? Enter your email or restart your membership.
				</h3>
				<div className="loginScreen_email">
					<form action="submit">
						<input type="email" placeholder="Email" />
						<button>GET STARTED</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginScreen;
