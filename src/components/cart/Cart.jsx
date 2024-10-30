import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const tax = subtotal * 0.12;
    const shipping = 12.00;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
};

const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/cart"); // Replace with your API endpoint
                console.log("Cart Items Response:", response.data); // Log the response
                setCartItems(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = (id, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleSizeChange = (id, newSize) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, size: newSize }
                    : item
            )
        );
    };

    const { subtotal, tax, shipping, total } = calculateTotals(cartItems);

    const handleCheckout = () => {
        navigate("/checkout", { state: { cartItems, subtotal, tax, shipping, total } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            fontFamily: "sans-serif",
            maxWidth: "80rem",
            margin: "auto",
            backgroundColor: "white",
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1rem",
        }}>
            {/* Cart Items */}
            <div style={{
                backgroundColor: "#f3f4f6",
                padding: "1rem",
                borderRadius: "0.375rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>
                    Cart
                </h2>
                <hr style={{
                    borderColor: "#d1d5db",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                }} />
                <div style={{ gap: "1rem" }}>
                    {cartItems.map(item => (
                        <div key={item.id} style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1rem",
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}>
                                <div style={{
                                    width: "6rem",
                                    height: "6rem",
                                    backgroundColor: "white",
                                    padding: "0.5rem",
                                    borderRadius: "0.375rem",
                                    flexShrink: 0,
                                }}>
                                    <img src={item.image} alt={item.itemName} style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }} />
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        color: "#1f2937",
                                    }}>
                                        {item.itemName}
                                    </h3>
                                    <h6 style={{
                                        fontSize: "0.75rem",
                                        color: "#ef4444",
                                        cursor: "pointer",
                                        marginTop: "0.125rem",
                                    }} onClick={() => handleRemoveItem(item.id)}>
                                        Remove
                                    </h6>
                                    <div style={{ marginTop: "0.5rem" }}>
                                        <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                                            Size:
                                        </span>
                                        <select value={item.size} onChange={(e) => handleSizeChange(item.id, e.target.value)} style={{
                                            fontSize: "0.75rem",
                                            padding: "0.375rem",
                                            borderRadius: "0.375rem",
                                            border: "1px solid #d1d5db",
                                            marginLeft: "0.5rem",
                                            outline: "none",
                                        }}>
                                            {item.sizes.map(size => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                        <button type="button" onClick={() => handleQuantityChange(item.id, -1)} style={{
                                            padding: "0.375rem",
                                            border: "1px solid #d1d5db",
                                            color: "#1f2937",
                                            fontSize: "0.75rem",
                                            backgroundColor: "transparent",
                                            borderRadius: "0.375rem",
                                            outline: "none",
                                        }}>
                                            -
                                        </button>
                                        <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                                            {item.quantity}
                                        </span>
                                        <button type="button" onClick={() => handleQuantityChange(item.id, 1)} style={{
                                            padding: "0.375rem",
                                            border: "1px solid #d1d5db",
                                            color: "#1f2937",
                                            fontSize: "0.75rem",
                                            backgroundColor: "transparent",
                                            borderRadius: "0.375rem",
                                            outline: "none",
                                        }}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                                <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#1f2937" }}>
                                    {formatCurrency(item.cost * item.quantity)}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div style={{
                backgroundColor: "#f3f4f6",
                borderRadius: "0.375rem",
                padding: "1rem",
                position: "sticky",
                top: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>
                    Summary
                </h2>
                <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>Subtotal</span>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(subtotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>Tax</span>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(tax)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>Shipping</span>
                        <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(shipping)}</span>
                    </div>
                    <hr style={{
                        borderColor: "#d1d5db",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: "#1f2937",
                        }}>Total</span>
                        <span style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: "#1f2937",
                        }}>{formatCurrency(total)}</span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleCheckout}
                    style={{
                        marginTop: "2rem",
                        padding: "0.75rem",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        outline: "none",
                        border: "none",
                    }}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
