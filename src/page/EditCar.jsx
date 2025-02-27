import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../api/fetch';

export default function EditCar() {
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
  const [loadings, setLoading] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/cars/${id}`
) ;


useEffect(() => {
  if(data.make){
    setFormData({
      make: data.make,
      model: data.model,
      year: data.year,
      price: data.price,
      mileage: data.mileage,
      location: data.location,
      description: data.description,
      image: data.image
    })
  }
}, [data])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: data
      });

      if (response.ok) {
        alert('Car updated successfully!');
        navigate(-1)
      
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
        <h2 style={{ marginTop: 30 }}>Edit Car</h2>
        <div style={{ marginTop: 30, marginLeft: 30 }}>
          <form className="add-form" style={{ width: 700, margin: 'auto' }} onSubmit={handleUpdate} encType="multipart/form-data">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <input required type="text" name="make" placeholder="Enter Car Brand" value={formData.make} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="model" placeholder="Enter Car Model" value={formData.model} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="year" placeholder="Enter Car Year" value={formData.year} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="price" placeholder="Enter Car Price" value={formData.price} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="number" name="mileage" placeholder="Enter Car Mileage" value={formData.mileage} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="location" placeholder="Enter Car Location" value={formData.location} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input required type="text" name="description" placeholder="Enter Car Description" value={formData.description} onChange={handleChange} style={{ width: 300, height: 30 }} /><br /><br />
              <input   type="file" name="image" onChange={handleFileChange} style={{ width: 300, height: 30 }} /><br /><br />
            </div>
            <button className="add-btn" type="submit">{loading ? "...loading" : "Update"}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
