import { useCart, useWishlist } from "contexts";

export const Card = ({ brand, image, price, title, rating, _id }) => {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { cartDispatch } = useCart();
  const inWishlist = wishlistState.wishlist.find((item) => item._id === _id);
  const wishlistButton = !inWishlist ? "favorite_border" : "favorite";
  const wishlistButtonHandler = ({
    brand,
    image,
    price,
    title,
    rating,
    _id,
  }) => {
    if (!inWishlist) {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { brand, image, price, title, rating, _id },
      });
    } else {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { brand, image, price, title, rating, _id },
      });
    }
  };
  return (
    <section className="card badge-card">
      <button
        className="wishlist-button"
        onClick={() =>
          wishlistButtonHandler({
            brand,
            image,
            price,
            title,
            rating,
            _id,
          })
        }
      >
        <span className="material-icons-outlined">{wishlistButton}</span>
      </button>
      <img className="img" src={image} alt="card-image" />
      <div className="rating">{rating}star</div>
      <div className="card-text">
        <h3>{brand}</h3>
        <p>{title}</p>
        <small>
          <strong>₹{price}</strong>
        </small>
      </div>
      <section
        className="card-footer"
        onClick={() =>
          cartDispatch({
            type: "ADD_TO_CART",
            payload: { brand, image, price, title, rating, _id },
          })
        }
      >
        <div className="icon">
          <a className="favourite" href="#">
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </a>
        </div>
      </section>
    </section>
  );
};