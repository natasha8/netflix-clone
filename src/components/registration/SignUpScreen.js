import React, { useRef } from "react";
import { auth } from "../../firebase";
import "./SignUpScreen.css";

function SignUpScreen() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const register = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log("authUser", authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	const signIn = (e) => {
		e.preventDefault();
	};
	return (
		<div className="signup">
			<form action="submit">
				<h1>Sign In</h1>
				<input ref={emailRef} type="email" placeholder="Email" />
				<input
					ref={passwordRef}
					type="password"
					placeholder="Password"
				/>
				<button type="submit" onClick={signIn}>
					SignIn
				</button>

				<h4>
					<span className="signup_grey">New to Neflix?</span>
					<span className="signup_link" onClick={register}>
						{" "}
						SignUp now!
					</span>
				</h4>
			</form>
		</div>
	);
}

export default SignUpScreen;
