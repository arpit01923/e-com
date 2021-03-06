import React, { useState } from "react";
import "styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useWishlist, useCart, useProduct } from "contexts";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MobileSidebar } from "components";

const Navbar = () => {
  const { pathname } = useLocation();
  const { wishlistState } = useWishlist();
  const { cartState } = useCart();
  const { isLoggedIn } = useAuth();
  const { productState, productDispatch } = useProduct();
  const [sidebar, setSidebar] = useState(false);

  const searchBarHandler = (event) => {
    productDispatch({ type: "SET_SEARCH", payload: event.target.value });
  };

  return (
    <>
      {sidebar && <MobileSidebar setSidebar={setSidebar} />}
      <nav className="simple-navigation">
        <span className="nav-list" to="/">
          <FaBars
            className="hamburger-icon"
            onClick={() => setSidebar((prev) => !prev)}
          />
          <h1 className="text">Shopzila</h1>
          <header className="head">
            <p className="header-links">
              <Link className="home" to="/">
                Home
              </Link>
              <Link className="product" to="/product">
                Product
              </Link>
            </p>
          </header>
        </span>

        {pathname === "/product" && (
          <div className="search-bar">
            <AiOutlineSearch className="search-icon" />
            <input
              className="nav-search"
              type="text"
              value={productState.search}
              placeholder="Search"
              onChange={(event) => searchBarHandler(event)}
            />
          </div>
        )}

        <div className="nav-list">
          <div className="list-item icons">
            <Link className="profile" to={!isLoggedIn ? "/login" : "/logout"}>
              <span className="material-icons hide"> account_circle </span>
              <span className="header-text">
                {!isLoggedIn ? "Login" : "Logout"}
              </span>
            </Link>

            <Link className="wishlist " to="/wishlist">
              <span className="material-icons"> favorite </span>
              <span className="header-text">Wishlist</span>
              <span className="material-icons badge"> circle </span>
              <span className="num-items">{wishlistState.wishlist.length}</span>
            </Link>

            <Link className="cart" to="/cart">
              <span className="material-icons"> shopping_cart </span>
              <span className="header-text">Cart</span>
              <span className="material-icons badge"> circle </span>
              <span className="num-items">{cartState.cart.length}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
