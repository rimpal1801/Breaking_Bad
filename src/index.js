import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import "./style.css";

const search_API = "https://www.breakingbadapi.com/api/characters?name=";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://www.breakingbadapi.com/api/characters"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(search_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="heading">
        <h1>List of Breaking Bad Character </h1>
        <header>
          <form onSubmit={submitHandler}>
            <input
              className="search"
              type="search"
              placeholder="Search ur fav character... "
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </header>
      </div>

      <div>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>

      <div className="contact-me">
        <h1>Get In Touch</h1>
        <h3>if you luv anything in this web page.</h3>
        <p>Let's talk more about it !</p>
        <br></br>
        <a className="btn" href="mailto:rimpalrai16108@gmail.com">
          Contact me
        </a>
      </div>
      <div className="contact-me">
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/rimpal-rai-6759a0201"
        >
          LinkedIn
        </a>
        <a className="footer-link" href="https://twitter.com/RimpalRai?s=08">
          Twitter
        </a>
        <a className="footer-link" href="https://www.instagram.com/r_rai_1801/">
          instagram
        </a>
      </div>
    </div>
  );
};

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("p");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
