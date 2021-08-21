const BASE_URL = 'https://imdb-api.com/API';
const IMDB_API_KEY = process.env.IMDB_API_KEY;

// errorMessage: ""
// expression: "lost 2004"
// results: Array(50)
// 0:
// description: "(2004–2010)"
// id: "tt0411008"
// image: "https://imdb-api.com/images/original/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.6800_AL_.jpg"
// resultType: "Title"
// title: "Lost"

export const searchImdb = (query) => {
    fetch(`${BASE_URL}/Search/${IMDB_API_KEY}/${query}`)
        .then(res => res.json())
};