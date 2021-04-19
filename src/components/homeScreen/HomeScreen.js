import React from "react";
import Banner from "../banner/Banner";
import "./HomeScreen.css";
import Nav from "../nav/Nav";
import requests from "../../Request";
import Row from "../rows/Row";

function HomeScreen() {
	return (
		<div className="homeScreen">
			<Nav />

			<Banner />
			<Row
				title="NETFLIX ORIGINALS"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row title="TRENDING NOW" fetchUrl={requests.fetchTrending} />
			<Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
			<Row title="COMEDY" fetchUrl={requests.fetchComedyMovies} />
			<Row title="HORROR" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="ACTION" fetchUrl={requests.fetchActionMovies} />
			<Row title="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries} />
			<Row title="ROMANCE" fetchUrl={requests.fetchRomanceMovies} />
		</div>
	);
}

export default HomeScreen;
