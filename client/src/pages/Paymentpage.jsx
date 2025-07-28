import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { product } from "../productdata/Plumberdata";
import Carousel from "../components/carousal";
import "../css/payment.css";


const stripePromise = loadStripe(
    "pk_test_51Rbyr4Pld3CIf93U9eAIOF9dvSpw3cALdMCtiscjoi3VMRSAgnjteKufB0xu2kviWo7F7Jj4kcjQEiHvwlFKkpKg00qV1nOHEt"
);


export const Payment = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [likedItems, setLikedItems] = useState([]);
    const [showNavbarCart, setShowNavbarCart] = useState(false);
    const navigate = useNavigate();


    const handleAddToCart = (item) => {
        const existingItem = cart.find((i) => i.id === item.id);
        if (existingItem) {
            setCart(
                cart.map((i) =>
                    i.id === item.id ? { ...i, qnty: i.qnty + 1 } : i
                )
            );
        } else {
            setCart([...cart, { ...item, qnty: 1 }]);
        }
    };

    const handleRemoveFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
    };

    const handleLike = (id) => {
        setLikedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch("http://localhost:5000/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: cart }),
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) console.error(result.error.message);
    };

    const filteredProducts = selectedCategory === "All"
        ? product
        : product.filter((item) => item.category === selectedCategory);

    const toggleNavbarCart = () => {
        setShowNavbarCart((prev) => !prev);
    };

    const handleRepairPayment = async () => {
        const stripe = await stripePromise;

        const repairProduct = [
            {
                id: "repair_1",
                name: "Pipe Repair",
                price: 499,
                qnty: 1,
            }
        ];

        const response = await fetch("http://localhost:5000/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: repairProduct }),
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };



    return (
        <div className="payment-page">
            {/* Navbar */}
            <div className="payment-navbar">
                <h2>QuickFix</h2>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#repair">Repair</a></li>
                    <li><a href="#item">Items</a></li>
                </ul>


                <div className="cart-section">
                    <button className="cart-btn" onClick={toggleNavbarCart}>
                        🛒 Cart  {cart.reduce((acc, item) => acc + item.qnty, 0)}
                    </button>

                    {showNavbarCart && (
                        <div className="navbar-cart-dropdown">
                            <span>❤️ {likedItems.length} liked</span>
                            {cart.length === 0 ? (
                                <p>No items in cart</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="navbar-cart-item">
                                        <span>{item.dish} × {item.qnty}</span>
                                        <span>₹{item.qnty * item.price}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>



            {/* Banner */}
            <div id="home" className="banner">
                <p>Welcome QuickFix Service</p>
                <Carousel />
            </div>

            <div id="about" className="p-about">
                <div className="p-headline"><h1>About</h1></div>
                <div className="p-cart">
                    <div className="p-img">
                        <img src="../img/p.jpg" alt="About plumber" />

                    </div>
                    <div className="p-cart1">
                        <h1>About Plumber</h1>
                        <h4>subline</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid culpa voluptas in! Doloremque minus nemo itaque illo ipsam. Natus cum iure unde accusamus labore reprehenderit corrupti officiis laborum facere laudantium.</p>
                    </div>
                </div>
            </div>

            {/* Layout */}
            <div id="item" className="main-layout">
                {/* Left Sidebar */}
                <aside className="sidebar left-sidebar">
                    <h3>Categories</h3>
                    <ul>
                        {["All", "Plumbing", "Installation", "Cleaning"].map((cat) => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? "active" : ""}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="content">
                    <h3>{selectedCategory} Items</h3>
                    <div className="product-list">
                        {filteredProducts.length === 0 ? (
                            <p>No items found.</p>
                        ) : (
                            filteredProducts.map((item) => (
                                <div className="product-card" key={item.id}>
                                    <img src={item.imgdata} alt={item.dish} />
                                    <h4>{item.name}</h4>
                                    <p>₹ {item.price}</p>
                                    <h4>{item.rating}</h4>
                                    <button onClick={() => handleAddToCart(item)}>Add</button>
                                    <button onClick={() => handleLike(item.id)}>
                                        {likedItems.includes(item.id) ? "❤️ Liked" : "🤍 Like"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="sidebar right-sidebar">
                    <h3>Cart</h3>
                    <strong>Total Items:</strong> {cart.reduce((acc, item) => acc + item.qnty, 0)} &nbsp; | &nbsp;
                    <strong>Total:</strong> ₹{cart.reduce((acc, item) => acc + item.price * item.qnty, 0)}

                    <div className="right-sidebar-payment">
                        {cart.length === 0 ? (
                            <p>No items</p>
                        ) : (
                            <ul>
                                {cart.map((item, idx) => (
                                    <li key={idx}>
                                        <p>
                                            {item.dish} × {item.qnty}
                                            <br />
                                            ₹{item.qnty * item.price}
                                        </p>
                                        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="checkout-button"
                    >
                        Proceed to Payment
                    </button>
                </aside>
            </div>

            <div id="repair" className="repair">
                <div className="repair-headline">
                    <p>Repair Section</p>
                </div>

                <div className="repair-col">
                    <div className="repair-card">
                        <img src="../img/p.jpg" alt="repair" />
                        <p>Pipe Repair - ₹99</p>
                        <button onClick={() => navigate("/data")}>
                            Show Employees
                        </button>
                        <button onClick={handleRepairPayment}>Click Payment</button> {/* FIXED */}
                    </div>
                    <div className="repair-card">
                        <img src="../img/p1.jpg" alt="repair" />
                        <p>Drain Repair - ₹499</p>
                        <button onClick={() => navigate("/data")}>
                            Show Employees
                        </button>
                        <button onClick={handleRepairPayment}>Click Payment</button> {/* FIXED */}
                    </div>
                    <div className="repair-card">
                        <img src="../img/p.jpg" alt="repair" />
                        <p>Shower pipe Repair - ₹499</p>
                        <button onClick={() => navigate("/data")}>
                            Show Employees
                        </button>
                        <button onClick={handleRepairPayment}>Click Payment</button> {/* FIXED */}
                    </div>
                    <div className="repair-card">
                        <img src="../img/p1.jpg" alt="repair" />
                        <p>House Pipe Repair - ₹499</p>
                        <button onClick={() => navigate("/data")}>
                            Show Employees
                        </button>
                        <button onClick={handleRepairPayment}>Click Payment</button> {/* FIXED */}
                    </div>


                </div>
            </div>


        </div>
    );
};
