# spotify-ml-project

This project utilizes the Spotify API and machine learning to cluster similar songs together for recommendations. This project was built using K Nearest Neighbors Algorithm with four clusters. When a user inputs a song they want recommendations for, 100 songs will be generated using Spotify's API and will be clustered based on their audio features. After the ML model clusters these 100 songs, it will assign the user's song choice to one of the 4 created clusters and pull the songs from the accompanying cluster. This project leverages the Spotipy library, sci-kit learn, d3, bootstrap and Flask to create an interactive song recommendation list and data visualizations for artists and similar songs. 

https://spotifymlwebsite.z5.web.core.windows.net/index.html
