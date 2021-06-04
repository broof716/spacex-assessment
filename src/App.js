import React from "react";
import {
  useQuery,
  gql,
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

const FILMS_QUERY = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      links {
        video_link
        flickr_images
      }
      details
    }
  }
`;

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

function GetLaunches() {
  const { data, loading } = useQuery(FILMS_QUERY);

  return (
    <>
      <div>
        {loading || !data ? (
          <p>Loading...</p>
        ) : (
          data.launchesPast.map((launch) => (
            <div className="spacex">
              <div className="card-deck">
                <div className="card bg-danger">
                  <div className="card">
                    <div className="card-body" key={launch.id}>
                      <h4 className="card-title">{launch.mission_name}</h4>
                      <img
                        className="card-img"
                        style={{
                          width: "25%",
                          display: "flex",
                          padding: "10px",
                        }}
                        src={launch.links.flickr_images}
                      />
                      <a
                        href={launch.links.video_link}
                        className="btn btn-danger stretched-link"
                      >
                        Video Link
                      </a>
                      <br />
                      <br />
                      <p className="card-title">{launch.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        SpaceX Launches
      </h1>
      <GetLaunches />
    </ApolloProvider>
  );
}

export default App;
