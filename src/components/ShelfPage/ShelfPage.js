import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function ShelfPage() {

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM'})
  }, [])

  const[descriptionInput, setDescriptionInput] = useState('');
  const[imageInput, setImageInput] = useState ('');
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const itemReducer = useSelector((store)=> store.itemReducer)

  const onItemAdd = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_ITEM',
      payload: { image: imageInput, 
                 description: descriptionInput}
    })
  }


  return (
    <div className="container">
      <div className="panel">
        <h2 className="titleBase_inner">Welcome, {user.username}!</h2>
      </div>
      <form onSubmit={onItemAdd}>
        <input
          placeholder="Description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
        />
        <button>Add Shelf Item</button>
      </form>

      <div>
        <ul>
          {itemReducer.map((item) => {
            return <li> <img src={item.image_url} /> {item.description}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ShelfPage;