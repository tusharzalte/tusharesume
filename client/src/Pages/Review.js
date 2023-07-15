import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import '../Resources/Stylesheets/review.css'
import DefaultLayout from '../Components/DefaultLayout';
const Review = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/user/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
    <div className="reviews">
      {users.map((user) => (
        <Link to={`/comments/${user._id}`} style={{ color: 'white' }} >
          <ReviewCard key={user._id} user={user} /> 
        </Link>
      ))}
    </div>
    </DefaultLayout>
  );
};

export default Review;