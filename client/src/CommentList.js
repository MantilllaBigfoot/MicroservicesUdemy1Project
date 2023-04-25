// import { useState, useEffect } from 'react';
// import axios from 'axios';

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    } else if (comment.status === 'rejected') {
      content = 'This comment is rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
