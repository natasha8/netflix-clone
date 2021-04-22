import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./Plans.css";

function Plans() {
	const [plans, setPlans] = useState([]);
	const user = useSelector(selectUser);
	const [subscription, setSubscription] = useState(null);

	const showPlans = () => {
		db.collection("plans")
			.where("active", "==", true)
			.get()
			.then((querySnapshot) => {
				const plans = {};
				querySnapshot.forEach(async (productDoc) => {
					plans[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref
						.collection("prices")
						.get();
					priceSnap.docs.forEach((price) => {
						plans[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});
				setPlans(plans);
				console.log("plans:", plans);
			});
	};
	useEffect(() => {
		showPlans();
	}, []);

	useEffect(() => {
		db.collection("customers")
			.doc(user.uid)
			.collection("subscriptions")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (subscription) => {
					setSubscription({
						role: subscription.data().role,
						current_period_end: subscription.data()
							.current_period_end.seconds,
						current_period_start: subscription.data()
							.current_period_start,
					});
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}, [user.uid]);
	console.log("SUBSCRIPTION", subscription);

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
				alert(`ERROR:${error.message}`);
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
		<div className="plans">
			{subscription && (
				<p>
					Renewal date :{" "}
					{new Date(
						subscription?.current_period_end * 1000
					).toLocaleDateString()}
				</p>
			)}
			{Object.entries(plans).map(([productId, productData]) => {
				const isCurrentPlan = productData.name
					?.toLowerCase()
					.includes(subscription?.role);
				return (
					<div
						key={productId}
						className={`${isCurrentPlan && "plan--disabled"} plan`}
					>
						<div className="plan_info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button
							onClick={() =>
								!isCurrentPlan &&
								loadCheckout(productData.prices.priceId)
							}
						>
							{isCurrentPlan ? "Current Plan" : "Subscribe"}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Plans;
