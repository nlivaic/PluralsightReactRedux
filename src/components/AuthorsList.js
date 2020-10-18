import React from "react";
import PropTypes from "prop-types";

const AuthorsList = ({ authors }) => {
  return (
    <>
      <h2>Authors</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Author ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => {
            return (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

AuthorsList.defaultProps = {
  authors: [],
};

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuthorsList;
