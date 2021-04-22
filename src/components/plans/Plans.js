import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./Plans.css";

function Plans() {
	const [plans, setPlans] = useState([]);
	const user = useSelector(selectUser);

	const showPlans = () => {
		db.collection("plans")
			.where("active", "==", true)
			.get()
			.then((querySnapshot) => {
				const info = {};
				querySnapshot.forEach(async (productDoc) => {
					info[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref
						.collection("price")
						.get();
					priceSnap.docs.forEach((price) => {
						info[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});
				setPlans(info);
			});
	};
	console.log(plans);
	useEffect(() => {
		showPlans();
	}, []);

	const loadCheckout = async (priceId) => {
		const docRef = await db
			.collection("customers")
			.doc(user.uid)
			.collection("checkout_sessions")
			.add({
				price: priceId,
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			});
		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				alert(`${error.message}`);
			}
			if (sessionId) {
				const stripe = await loadStripe(
					"pk_test_51Iiy2RHcP2rX1u1eYaF1J5k0QWD6Bgq4l014hZmjQicLD31Yr5PbJ50jaPQCdaAZ1R64QWgLZj51t681v6KaxeBq00Gbg8OFot"
				);
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};

	return (
		<div className="info">
			{Object.entries(plans).map(([productId, productData]) => {
				return (
					<div className="plan" key={productId}>
						<div className="plan_info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button
							onClick={() =>
								loadCheckout(productData.prices.price)
							}
						>
							Subscribe
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Plans;
