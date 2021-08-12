import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Work in progress wait a sec Thanku!</h2>;
  }
  return (
    <div>
      <div className="books">
        {posts.map((book, index) => {
          const birthDate = new Date(book.birthday).toDateString();
          const photo = String(book.img);
          return (
            <div className="book" id="about" key={index}>
              <div className="details">
                <div id="myUL">
                  <h1>{book.name}</h1>
                </div>
                <img
                  src={photo}
                  alt="Character pic"
                  width="200"
                  height="200"
                ></img>
              </div>
              <p>Date of Birth: {birthDate}</p>
              <p>Occupation: {String(book.occupation).split(", ")}</p>
              <p>Status: {book.status}</p>
              <p>Nickname: {book.nickname}</p>
              <p>Portrayed: {book.portrayed}</p>
              <p>Season: {book.appearance}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
