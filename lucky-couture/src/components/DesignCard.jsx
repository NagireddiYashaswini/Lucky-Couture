import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function DesignCard({ design }) {
  const { toggleWishlist, isWishlisted, notify } = useApp();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(design.likes);
  const [liked, setLiked] = useState(false);
  const wishlisted = isWishlisted(design.id);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative break-inside-avoid mb-5 md:mb-7 rounded-2xl overflow-hidden bg-white shadow-card"
    >
      <div className="relative overflow-hidden">
        <img
          src={design.image}
          alt={design.title}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button
            onClick={() => navigate("/tailoring", { state: { design } })}
            className="w-full flex items-center justify-center gap-1.5 bg-highlight text-primary text-xs font-semibold py-2.5 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            <Scissors size={13} /> Book Similar Design
          </button>
        </div>
        <span className="absolute top-3 left-3 bg-white/85 backdrop-blur text-primary text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {design.category}
        </span>
      </div>
      <div className="p-3.5 flex items-center justify-between">
        <h3 className="font-display text-sm font-medium text-primary line-clamp-1 pr-2">{design.title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleLike} className="flex items-center gap-1 text-ink/60 hover:text-accent transition-colors" aria-label="Like design">
            <Heart size={14} fill={liked ? "#CEA07E" : "none"} className={liked ? "text-accent" : ""} />
            <span className="text-xs">{likes}</span>
          </button>
          <button
            onClick={() => {
              toggleWishlist({ ...design, price: 0, mrp: 0, rating: 5 });
              notify(wishlisted ? "Removed from favorites" : "Added to favorites");
            }}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              wishlisted ? "bg-accent text-white border-accent" : "border-primary/15 text-primary hover:border-accent"
            }`}
          >
            {wishlisted ? "Saved" : "Favorite"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
