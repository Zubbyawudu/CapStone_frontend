import React from 'react'
import Header from '../component/Header'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../api/fetch';

export default function CarDetail() {
    const navigate = useNavigate()
    const {id} = useParams()

    const { data, loading, error } = useFetch(
            `http://localhost:5000/api/cars/${id}`
    ) ;


    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }
            navigate('/')
        }
        catch (err) {   
            console.error(err)
        }
    }

  return (
    <div>
        <Header />
        <div style={{ margin: "60px" }}>
                <h3 className="list-title">Car Details</h3>
                <div className='action-btn'>
                    <button onClick={(() => navigate(`edit`))} className="btn primary">Edit</button>
                    <button onClick={handleDelete} className="danger">Delete</button>
                    <button onClick={() => navigate(-1)} className="warning">Cancel</button>
                </div>

                <div>
                    <div style={{display:'flex', marginTop: "20px", gap: "20px"}}>
                    <img width={'40%'} style={{borderRadius:30}} src={`http://localhost:5000${data?.image}`} alt="car" />
                    <div style={{marginTop: "20px"}}>
                     <div style={{display:'grid', gap: "20px"}}>
                     <label style={{fontSize:30}}>{data?.make} {data?.model}</label>
                        <label style={{fontSize:15}}>{data?.description}</label>

                     </div>
                     <div style={{fontSize:15, marginTop: "20px"}}>
                        <p>📍 {data.location}</p>
                        <p>⏱️ {data.mileage}</p>
                        <p>🏷️ ${data.price}</p>
                        <p>👤 {data?.user?.name}</p>

                     </div>
                        </div>
                    </div>
               
               </div>

               </div>
             
    </div>
  )
}
