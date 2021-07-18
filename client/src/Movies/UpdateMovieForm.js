import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovieForm = (props) => {

    const initialValues = {
    
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
    }

    const { push } = useHistory();
    const { id } = useParams();
    const [movieValues, setMovieValues] = useState(initialValues);

   useEffect(() =>{
       axios.get(`http://localhost:5000/api/movies/${id}`)
       .then(res=> {
           res.data.stars = res.data.stars.join(',')
           setMovieValues(res.data)
       })
       .catch(err => {
           console.error(err.message, 'Error in Get call in Update Movie Form')
       })
   }, [id]); 

   // onChange
   const onChange = (e) => {
       setMovieValues({
           ...movieValues,
           [e.target.name]: e.target.value,
       });
   };

   //onSubmit
   const onSubmit = e => {
       e.preventDefault()
       movieValues.stars = movieValues.stars.split(',')
       axios
       .put(`http://localhost:5000/api/movies/${id}`, 
       movieValues)
       .then(()=> {
           setMovieValues(initialValues)
           props.getMovieList()
           push("/")
           props.setRefresh(true);    
       })
       .catch(err=> {
          console.error(err.message, 'Error in PUT request in Update Movie form') 
       })
   }


    return (
        <div>
           <h2> Update Movie </h2> 
           <form onSubmit={onSubmit}>
               <label> Movie Title: </label>
               <input
                type='text'
                name='title'
                placeholder='Movie Title'
                value={movieValues.title}
                onChange={onChange}
                />
               <label> Movie Director: </label>
               <input
                type='text'
                name='director'
                placeholder='Movie Director'
                value={movieValues.director}
                onChange={onChange}
                />
                <label> Metascore: </label>
               <input
                type='text'
                name='metascore'
                placeholder='Metascore'
                value={movieValues.metascore}
                onChange={onChange}
                />
                <label> Stars </label>
               <input
                type='text'
                name='stars'
                placeholder='Stars'
                value={movieValues.stars}
                onChange={onChange}
                />  
                <button> Update Movie </button>             
           </form>
        </div>
    )
}

export default UpdateMovieForm
