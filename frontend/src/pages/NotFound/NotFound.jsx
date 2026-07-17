import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <Scissors size={48} />
      <h1>404</h1>
      <h2>This pattern hasn't been cut yet</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
