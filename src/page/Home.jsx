import React, { useState } from "react";
import useFetch from "../api/fetch";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const { data, loading, error } = useFetch(
        "http://localhost:5000/api/cars/"
    ) ;

    return (
        <>
           <Header />
            <div style={{ margin: "60px" }}>
                <h3 className="list-title">Vehicle List</h3>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div style={{ display: "flex", gap: "20px" }}>
                    {data?.map((car) => (
                        <div  key={car._id} onClick={() => navigate(`/car/${car._id}`)} className="card">
                            <div className="info">
                                <div className="rating">⭐ 4.6 (58)</div>
                                <div className="availability">Disponible</div>
                            </div>
                            <img
                                src={`http://localhost:5000${car.image}`}
                                alt="Car"
                            />
                            <div className="car-name">
                                {car.make} <span>{car.model}</span>
                                <div className="price">${car.price} /hour</div>
                            </div>
                            <div className="details">
                                <span>📍 {car.location}</span>
                                <span>⏱️ {car.mileage}</span>
                                <span>👤 {car?.user?.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
