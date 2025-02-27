import React, { useState } from "react";
import useFetch from "../api/fetch";

export default function Home() {
    const { data, loading, error } = useFetch<{ title: string }>(
        "http://localhost:5000/api/cars/"
    ) as { data: { title: string, _id: string,make:string, model:string, price:number,location:string,mileage:string }[]; loading: boolean; error: string | null };

    return (
        <>
            <header style={{ backgroundColor: "black", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ color: "white" }}>ZUB RENTALS</h1>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="add-button">Add New Vehicle</button>
                        <button className="add-button">SignUp</button>
                    </div>
                </div>
            </header>
            <div style={{ margin: "60px" }}>
                <h3 className="list-title">Vehicle List</h3>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div style={{ display: "flex", gap: "20px" }}>
                    {data?.map((car) => (
                        <div className="card">
                            <div key={car._id} className="info">
                                <div className="rating">⭐ 4.6 (58)</div>
                                <div className="availability">Disponible</div>
                            </div>
                            <img
                                src="https://file.aiquickdraw.com/imgcompressed/img/compressed_d7b326c9bdf12a4149cca030c60b2846.webp"
                                alt="Car"
                            />
                            <div className="car-name">
                                {car.make} <span>{car.model}</span>
                                <div className="price">${car.price} /hour</div>
                            </div>
                            <div className="details">
                                <span>📍 {car.location}</span>
                                <span>⏱️ {car.mileage}</span>
                                <span>👤 5</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
