import React, { useState } from 'react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';

export default function AddCar() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    location: '',
    description: '',
    image: null
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/cars/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: data
      });

      if (response.ok) {
        setMessage('Car added successfully!');
        setFormData({
          make: '',
          model: '',
          year: '',
          price: '',
          mileage: '',
          location: '',
          description: '',
          image: null
        });
      } else {
        setMessage('Failed to add car.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding car.');
    }finally{
      setLoading(false);
    }
  };

  if(localStorage.getItem('isAuthenticated') === null){
    return <div style={{display:'flex',justifyContent:'center', alignItems:'center',textAlign:'center', height:'100vh',fontSize:20, flexDirection:'column'}}>
      <p >Unauthorized</p>
      <Link to="/login">Login</Link>
    </div>
  }

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 30 }}>Add New Car</h2>
        <div style={{ marginTop: 30, marginLeft: 30 }}>
          <form className="add-form" style={{ width: 700, margin: 'auto' }} onSubmit={handleSubmit} encType="multipart/form-data">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <input required type="text" name="make" placeholder="Enter Car Brand" value={formData.make} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="model" placeholder="Enter Car Model" value={formData.model} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="year" placeholder="Enter Car Year" value={formData.year} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="price" placeholder="Enter Car Price" value={formData.price} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="mileage" placeholder="Enter Car Mileage" value={formData.mileage} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="location" placeholder="Enter Car Location" value={formData.location} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="description" placeholder="Enter Car Description" value={formData.description} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input  required type="file" name="image" onChange={handleFileChange} style={{ width: 300, height: 30 }} /><br /><br />
            </div>
            <button className="add-btn" type="submit">{loading ? "...loading" : "Add"}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
