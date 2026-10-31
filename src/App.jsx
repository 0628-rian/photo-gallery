import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [likes, setLikes] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);

  // Fetch the current page
  useEffect(() => {
    let cancelled = false;

    async function fetchPhotos() {
      loadingRef.current = true;
      setLoading(true);

      const url = `https://picsum.photos/v2/list?page=${page}`;

      try {
        console.log("Requesting:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();

        console.log("Page fetched:", page);
        console.log("First photo ID:", data[0]?.id);
        console.log("Last photo ID:", data[data.length - 1]?.id);
        console.log("Photos received:", data.length);

        if (cancelled) return;

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        setPhotos((previousPhotos) => {
          const existingIds = new Set(previousPhotos.map((photo) => photo.id));

          const newPhotos = data.filter((photo) => !existingIds.has(photo.id));

          return [...previousPhotos, ...newPhotos];
        });
      } catch (error) {
        console.log("Error fetching photos:", error);
      } finally {
        if (!cancelled) {
          loadingRef.current = false;
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      cancelled = true;
    };
  }, [page]);

  // Detect when the user reaches the bottom
  useEffect(() => {
    function handleScroll() {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (reachedBottom && !loadingRef.current && hasMore) {
        loadingRef.current = true;
        setPage((previousPage) => previousPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  // Increase the like count
  function handleLike(photoId) {
    setLikes((previousLikes) => ({
      ...previousLikes,
      [photoId]: (previousLikes[photoId] || 0) + 1,
    }));
  }

  return (
    <div className="gallery-container">
      <h1>Photo gallery</h1>

      {photos.map((photo) => (
        <div className="photo-item" key={photo.id}>
          <img src={photo.download_url} alt={photo.author} />

          <p>Author: {photo.author}</p>

          <button
            type="button"
            onClick={() => handleLike(photo.id)}
            aria-label={`Like photo by ${photo.author}`}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>

          <span>{likes[photo.id] || 0}</span>
        </div>
      ))}

      {loading && <p className="status">Loading more photos...</p>}

      {!hasMore && <p className="status">No more photos available.</p>}
    </div>
  );
}

export default App;
