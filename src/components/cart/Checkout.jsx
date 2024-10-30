import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

const Checkout = () => {
    const { state } = useLocation();
    const { cartItems, subtotal, tax, shipping, total } = state;

    const handlePrint = () => {
        window.print();
    };

    const handleBuy = async () => {
        try {
            const response = await axios.post("/api/buy", { cartItems, total }); // Replace with your API endpoint
            alert("Purchase successful!");

            // Display the shopkeeper's details
            const shopDetails = await axios.get("/api/shop-details"); // Replace with your API endpoint
            alert(`Shopkeeper: ${shopDetails.data.shopName}, Phone: ${shopDetails.data.phone}`);
        } catch (error) {
            console.error("Error during purchase:", error);
            alert("Purchase failed. Please try again.");
        }
    };

    return (
        <div style={{
            fontFamily: "sans-serif",
            maxWidth: "60rem",
            margin: "auto",
            padding: "1rem",
            backgroundColor: "white",
        }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                Billing Details
            </h1>
            <hr style={{ borderColor: "#d1d5db", margin: "1rem 0" }} />
            <div>
                {cartItems.map(item => (
                    <div key={item.id} style={{ marginBottom: "1rem" }}>
                        <h3 style={{ fontSize: "1rem", color: "#1f2937" }}>{item.itemName}</h3>
                        <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                            Quantity: {item.quantity} | Price: {formatCurrency(item.cost)}
                        </p>
                    </div>
                ))}
            </div>
            <hr style={{ borderColor: "#d1d5db", margin: "1rem 0" }} />
            <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "1rem", color: "#1f2937" }}>Subtotal: {formatCurrency(subtotal)}</p>
                <p style={{ fontSize: "1rem", color: "#1f2937" }}>Tax: {formatCurrency(tax)}</p>
                <p style={{ fontSize: "1rem", color: "#1f2937" }}>Shipping: {formatCurrency(shipping)}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>Total: {formatCurrency(total)}</p>
            </div>
            <button onClick={handlePrint} style={{
                padding: "0.75rem",
                backgroundColor: "#3b82f6",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "0.375rem",
                cursor: "pointer",
                outline: "none",
                border: "none",
                marginRight: "1rem",
            }}>
                Print Bill
            </button>
            <button onClick={handleBuy} style={{
                padding: "0.75rem",
                backgroundColor: "#10b981",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "0.375rem",
                cursor: "pointer",
                outline: "none",
                border: "none",
            }}>
                Buy Now
            </button>
        </div>
    );
};

export default Checkout;
