import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Resources/Stylesheets/comment.css';
import CommentTemplate from './templates/CommentTemplate';

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [userResume, setUserResume] = useState(null);
  const commentTextRef = useRef('');
  const nav = useNavigate();
  const chatContainerRef = useRef(null); // Reference to the chat container element

  useEffect(() => {
    fetchComments();
    fetchUser();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`api/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem('tusharresume-users');
    const { username } = JSON.parse(storedUsername);
    const comment = commentTextRef.current.value;
    if (!comment) {
      console.log('Empty comment, not submitting.');
      return;
    }

    console.log('Submitting comment:', username, comment);

    try {
      const response = await axios.post(`api/comments/${id}`, {
        username,
        comment,
      });
      console.log('Comment submitted successfully:', response.data);
      commentTextRef.current.value = '';
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`api/comments/user/${id}`);
      const userResumeData = response.data;
      setUserResume(userResumeData);
      console.log(userResumeData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleBackButtonClick = () => {
    nav(-1);
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  };

  return (
    <div className="comments-wrapper" ref={chatContainerRef}>
      <div className="comments-container">
        <form className="comments-form" onSubmit={handleSubmit}>
          <button onClick={handleBackButtonClick} style={{ marginBottom: '5px' }}>
            Back To Reviews
          </button>
          <textarea name="comment" placeholder="Comment" ref={commentTextRef} required />
          <button type="submit">Submit</button>
        </form>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.username}</strong>
              <br />
              <span>{comment.comment}</span>
            </li>
          ))}
        </ul>
      </div>
      {userResume && (
        <div className="comment-template-container">
          <CommentTemplate user={userResume} />
        </div>
      )}
    </div>
  );
};

export default Comments;
