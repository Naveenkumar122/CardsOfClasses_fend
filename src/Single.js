import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Single() {
    const {id} = useParams();
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    
    useEffect(()=>{
       fetch('https://class-cards-nk.herokuapp.com/classes/'+id)
          .then((res)=>{
              if(!res.ok){
                  throw Error("Something went wrong")
              }
              return res.json();
          }) 
          .then((data)=>{
              setIsPending(false);
              setData(data);
          })
          .catch((err)=>{
              setError(err);
          })
    },[])
    return (
        <div>
           {error && <div className="alert alert-danger">{error}</div>}
           {isPending && <p>Loading...</p>}
           {data &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 d-flex justify-content-center">
                            <img className="img-fluid" src={data.image} alt="..." />
                        </div>
                        <div className="col-8">
                            <div className="row-4">
                                <p>Class:<strong>{data.class}</strong></p>
                                <p>Subject:<strong>{data.subject}</strong></p>
                                <p>faculty:<strong>{data.faculty}</strong></p>
                            </div>
                            <div className="row-4">
                                <p>Topics:</p>
                                <ul>{data.topics.map((ele, index) => <li key={index}>{ele}</li>)}</ul>
                            </div>
                        </div>
                            <p><strong>Description:</strong><br/>{data.description}</p>
                            <Link to={'/'}><button className="btn btn-danger">Back</button></Link>
                    </div>
                </div>
           }
           
        </div>
    )
}


export default Single;