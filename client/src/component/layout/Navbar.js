import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../action/userAction";

export default function Navbar({ title, icon }) {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.userLoginReducer);
  const { userInfo } = login;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {userInfo ? (
          <>
            <Link to="/contact">
              <i class="fas fa-user"></i> {userInfo.name}
            </Link>

            <button className="btn btn-primary" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <li>
            <Link to="/login">
              <i class="fa-solid fa-user-vneck"></i>Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Phone Directory",
  icon: "fa fa-address-book",
};
