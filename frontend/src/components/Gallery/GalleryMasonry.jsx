import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, Maximize2, X } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "./GalleryMasonry.css";

export default function GalleryMasonry({ items }) {
  const [liked, setLiked] = useState({});
  const [fullscreen, setFullscreen] = useState(null);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <div className="masonry">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            className="masonry__item"
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
          >
            <div className="masonry__image-wrap" style={{ aspectRatio: `3 / ${item.height / 100}` }}>
              <img src={item.img} alt={item.name} loading="lazy" />
              <div className="masonry__overlay">
                <button
                  className="masonry__icon-btn"
                  onClick={() => setFullscreen(item)}
                  aria-label="View full screen"
                >
                  <Maximize2 size={16} />
                </button>
                <div className="masonry__overlay-bottom">
                  <div>
                    <p className="masonry__name">{item.name}</p>
                    <span className="masonry__category">{item.category}</span>
                  </div>
                  <div className="masonry__actions">
                    <button
                      className={`masonry__icon-btn ${liked[item.id] ? "is-active" : ""}`}
                      onClick={() => toggleLike(item.id)}
                      aria-label="Like"
                    >
                      <Heart size={16} fill={liked[item.id] ? "currentColor" : "none"} />
                    </button>
                    <button
                      className={`masonry__icon-btn ${isWishlisted(item.id) ? "is-active" : ""}`}
                      onClick={() =>
                        toggleWishlist({ id: item.id, name: item.name, img: item.img, price: 0, category: item.category })
                      }
                      aria-label="Wishlist"
                    >
                      <Bookmark size={16} fill={isWishlisted(item.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm masonry__book-btn"
                  onClick={() => navigate("/tailoring")}
                >
                  Book Similar Design
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="masonry__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(null)}
          >
            <button className="masonry__lightbox-close" aria-label="Close">
              <X size={26} />
            </button>
            <motion.img
              src={fullscreen.img}
              alt={fullscreen.name}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p onClick={(e) => e.stopPropagation()}>{fullscreen.name} — {fullscreen.category}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
