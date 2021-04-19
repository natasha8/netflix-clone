import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
	const [show, handleShow] = useState(false);
	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar);
		return () => window.removeEventListener("scroll", transitionNavBar);
	}, []);
	return (
		<div className={`nav ${show && "nav_black"}`}>
			<div className="nav_content">
				<img
					className="nav_logo"
					src="https://png4u.com/wp-content/uploads/2020/02/netflix_logo_png_transparent-1024x278.png"
					alt="logo"
				/>
				<img
					className="nav_avatar"
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7mFdnXMXuTw4_rIWW0LkLAHaHa%26pid%3DApi&f=1"
					alt="avatar"
				/>
			</div>
		</div>
	);
}

export default Nav;
