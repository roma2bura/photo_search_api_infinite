import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("lamborghini");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const client_id = "yS4ofzOSRLDZbfolYUAoI_b7I8INeEAERlgdDx_ewEQ";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
  };
  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setData([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  return (
  <>

  <div className="form">
      <input
        type="text"
        className="input"
        onKeyDown={(e) => searchImages(e)}
        placeholder="Search For Images 🔎"
      />
</div>
      
      <InfiniteScroll
        dataLength={data.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<p>Load more...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}> 
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        
        <div className="card-list">
          {data.map((data, key) => (
            <div className="container" key={key}>
              <img
                src={data.urls.small}
                className="card--image"
                alt={data.alt_description}
              />
              <h4>Photo by {data.user.name} 📸</h4>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;