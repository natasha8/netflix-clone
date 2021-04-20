import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAdKBzDmhRDZX1-5XYhmnGsnmnyRwmO790",
	authDomain: "netflix-clone-32a80.firebaseapp.com",
	projectId: "netflix-clone-32a80",
	storageBucket: "netflix-clone-32a80.appspot.com",
	messagingSenderId: "419174368018",
	appId: "1:419174368018:web:8c59bab2866e67625229cb",
};

let firebaseCache;
const firebaseApp = () => {
	if (firebaseCache) {
		return firebaseCache;
	}

	firebase.initializeApp(firebaseConfig);
	firebaseCache = firebase;
	return firebase;
};
const db = firebaseApp().firestore();
const auth = firebaseApp().auth();

export { auth, db };
