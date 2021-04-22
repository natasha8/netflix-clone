import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import Nav from "../nav/Nav";
import Plans from "../plans/Plans";
import "./Profile.css";

function Profile() {
	const user = useSelector(selectUser);
	return (
		<div className="profile">
			<Nav />
			<div className="profile_body">
				<h1>Edit Profile</h1>
				<div className="profile_info">
					<img
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7mFdnXMXuTw4_rIWW0LkLAHaHa%26pid%3DApi&f=1"
						alt="avatar"
					/>
					<div className="profile_details">
						<h2>{user.email}</h2>

						<div className="profile_plans">
							<h3>Plans</h3>
							<Plans />
						</div>
					</div>
				</div>
				<button
					onClick={() => auth.signOut()}
					className="profile_logout"
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}

export default Profile;
