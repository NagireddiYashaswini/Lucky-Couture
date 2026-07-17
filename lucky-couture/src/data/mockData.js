// Placeholder data layer.
// Swap these arrays for fetch()/axios calls to your Express + MongoDB API
// (e.g. GET /api/products, GET /api/designs, GET /api/orders) — component
// props and shapes below already match a typical Mongo document shape.

const img = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories = ["Wedding", "Men", "Women", "School", "Customised"];

export const designs = [
  { id: "d1", title: "Regal Zardozi Lehenga", category: "Wedding", image: img("wed1", 800, 1100), likes: 214 },
  { id: "d2", title: "Ivory Sherwani", category: "Men", image: img("men1", 800, 1000), likes: 98 },
  { id: "d3", title: "Chikankari Kurti", category: "Women", image: img("wom1", 800, 1050), likes: 156 },
  { id: "d4", title: "Navy Blazer Set", category: "School", image: img("sch1", 800, 950), likes: 42 },
  { id: "d5", title: "Bridal Reception Gown", category: "Wedding", image: img("wed2", 800, 1150), likes: 301 },
  { id: "d6", title: "Bandhgala Jacket", category: "Men", image: img("men2", 800, 1000), likes: 120 },
  { id: "d7", title: "Anarkali Suit", category: "Women", image: img("wom2", 800, 1080), likes: 189 },
  { id: "d8", title: "Custom Denim Jacket", category: "Customised", image: img("cus1", 800, 1000), likes: 76 },
  { id: "d9", title: "Sangeet Sharara", category: "Wedding", image: img("wed3", 800, 1120), likes: 167 },
  { id: "d10", title: "School Pinafore", category: "School", image: img("sch2", 800, 960), likes: 33 },
  { id: "d11", title: "Nehru Jacket", category: "Men", image: img("men3", 800, 1000), likes: 88 },
  { id: "d12", title: "Embroidered Blouse", category: "Women", image: img("wom3", 800, 1000), likes: 210 },
];

export const products = [
  { id: "p1", name: "Silk Zardozi Blouse", price: 3499, mrp: 4999, category: "Women", image: img("shop1", 700, 900), rating: 4.8, tag: "New" },
  { id: "p2", name: "Linen Nehru Jacket", price: 2899, mrp: 3599, category: "Men", image: img("shop2", 700, 900), rating: 4.6 },
  { id: "p3", name: "Hand-embroidered Lehenga", price: 8999, mrp: 12999, category: "Wedding", image: img("shop3", 700, 950), rating: 4.9, tag: "Bestseller" },
  { id: "p4", name: "Cotton School Pinafore", price: 999, mrp: 1299, category: "School", image: img("shop4", 700, 900), rating: 4.4 },
  { id: "p5", name: "Chikankari Kurta", price: 1899, mrp: 2499, category: "Women", image: img("shop5", 700, 900), rating: 4.7 },
  { id: "p6", name: "Bandhgala Set", price: 4599, mrp: 5999, category: "Men", image: img("shop6", 700, 950), rating: 4.5, tag: "New" },
  { id: "p7", name: "Reception Gown", price: 9999, mrp: 13999, category: "Wedding", image: img("shop7", 700, 980), rating: 4.9 },
  { id: "p8", name: "Custom Denim Jacket", price: 2199, mrp: 2799, category: "Customised", image: img("shop8", 700, 900), rating: 4.3 },
  { id: "p9", name: "Sangeet Sharara Set", price: 6799, mrp: 8999, category: "Wedding", image: img("shop9", 700, 970), rating: 4.8, tag: "Bestseller" },
  { id: "p10", name: "Formal Blazer", price: 3199, mrp: 3999, category: "Men", image: img("shop10", 700, 920), rating: 4.5 },
  { id: "p11", name: "Anarkali Suit Set", price: 2999, mrp: 3799, category: "Women", image: img("shop11", 700, 950), rating: 4.6 },
  { id: "p12", name: "School Uniform Set", price: 1299, mrp: 1699, category: "School", image: img("shop12", 700, 900), rating: 4.2 },
];

export const bestWork = [
  { id: "b1", title: "Birthday Special", subtitle: "Party Wear", image: img("best1", 700, 900) },
  { id: "b2", title: "Wedding Season", subtitle: "Bridal Couture", image: img("best2", 700, 900) },
  { id: "b3", title: "Festive Edit", subtitle: "Ethnic Wear", image: img("best3", 700, 900) },
  { id: "b4", title: "Office Ready", subtitle: "Formal Fits", image: img("best4", 700, 900) },
  { id: "b5", title: "Reception Night", subtitle: "Statement Gowns", image: img("best5", 700, 900) },
  { id: "b6", title: "Back to School", subtitle: "Uniforms", image: img("best6", 700, 900) },
];

export const testimonials = [
  { id: "t1", name: "Ananya Rao", role: "Bride, Guntur", quote: "The fit on my reception lehenga was flawless — like it was drawn onto me. Two fittings and it was perfect.", avatar: img("av1", 200, 200) },
  { id: "t2", name: "Karthik Varma", role: "Regular Customer", quote: "I've stopped buying off-the-rack shirts entirely. Lucky Couture's tailoring is sharper and lasts longer.", avatar: img("av2", 200, 200) },
  { id: "t3", name: "Sindhu Reddy", role: "School Parent", quote: "Got uniforms stitched for both my kids within the promised delivery window. Neat, sturdy stitching.", avatar: img("av3", 200, 200) },
  { id: "t4", name: "Farhan Ali", role: "Groom, Amaravathi Rd", quote: "My sherwani got so many compliments at the wedding. Every measurement was spot on.", avatar: img("av4", 200, 200) },
];

export const faqs = [
  {
    q: "How long does custom stitching usually take?",
    a: "Most single garments are ready in 5–7 working days. Since we can only take on a limited number of stitching orders per day to protect quality, your exact delivery date is confirmed right after you submit the tailoring form.",
  },
  {
    q: "Can I provide my own fabric?",
    a: "Yes. On the tailoring form you can choose to bring your own material, or select from our in-house fabric options and we'll source it for you.",
  },
  {
    q: "How do I share my measurements?",
    a: "You can enter measurements directly in the booking form, or book a home/store visit and our tailor will take them for you at your first appointment.",
  },
  {
    q: "What if I need alterations after delivery?",
    a: "Every order includes one free alteration within 15 days of delivery. Just reach out from your Orders page or contact us directly.",
  },
  {
    q: "Do you ship outside Guntur?",
    a: "Yes, we ship pan-India. Delivery timelines shown at checkout include stitching time plus courier transit.",
  },
  {
    q: "What payment methods are accepted?",
    a: "UPI, major debit/credit cards, and cash on pickup at our Amaravathi Road store.",
  },
];

export const materials = [
  "Cotton", "Silk", "Linen", "Georgette", "Chiffon", "Velvet", "Denim", "Wool Blend",
];

export const garmentTypes = [
  "Blouse", "Frock", "Shirt", "Kurta", "Lehenga", "Sherwani", "Suit", "School Uniform", "Other",
];

export const orders = [
  { id: "ORD-10231", type: "Stitching", item: "Silk Zardozi Blouse", status: "In Progress", date: "2026-07-10", eta: "2026-07-16", amount: 3499 },
  { id: "ORD-10214", type: "Shop", item: "Chikankari Kurta", status: "Delivered", date: "2026-06-28", eta: "2026-07-02", amount: 1899 },
  { id: "ORD-10198", type: "Stitching", item: "Bandhgala Jacket", status: "Delivered", date: "2026-06-14", eta: "2026-06-20", amount: 4599 },
];
