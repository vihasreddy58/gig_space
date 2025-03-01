import React, { useState } from 'react';
import './Discussion.css';

const Discussion = () => {
  const [queries, setQueries] = useState([
    {
      id: 1,
      username: "Alice",
      rating: 4.5,
      text: "How do I implement a binary search in JavaScript?",
      upvotes: 10,
      replies: [
        { id: 1, username: "Bob", rating: 4.7, text: "You can use the two-pointer approach for binary search.", upvotes: 5, subReplies: [] },
        { id: 2, username: "Charlie", rating: 4.2, text: "Divide and conquer method is efficient for binary search.", upvotes: 3, subReplies: [] }
      ],
      comments: [
        { id: 1, username: "Eve", rating: 4.8, text: "This question is very common, glad you asked!", upvotes: 2 }
      ]
    },
    {
      id: 2,
      username: "David",
      rating: 4.8,
      text: "What's the best way to learn React?",
      upvotes: 15,
      replies: [
        { id: 1, username: "Eve", rating: 4.9, text: "Start with the official documentation and build small projects.", upvotes: 8, subReplies: [] }
      ],
      comments: [
        { id: 1, username: "Frank", rating: 4.1, text: "React is best learned by doing!", upvotes: 3 }
      ]
    }
  ]);
  const [newQuery, setNewQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleUpload = () => {
    if (newQuery.trim()) {
      setQueries([...queries, { id: queries.length + 1, username: "NewUser", rating: 4.0, text: newQuery, upvotes: 0, replies: [], comments: [] }]);
      setNewQuery('');
    }
  };

  const handleReply = (queryId, replyId, replyText) => {
    if (replyText.trim()) {
      setQueries(
        queries.map(query => 
          query.id === queryId 
            ? { 
                ...query, 
                replies: query.replies.map(reply => 
                  reply.id === replyId 
                    ? { ...reply, subReplies: [...reply.subReplies, { id: reply.subReplies.length + 1, username: "Responder", rating: 4.3, text: replyText }] }
                    : reply
                ) 
              }
            : query
        )
      );
      setReplyText('');
    }
  };

  const handleComment = (queryId, commentText) => {
    if (commentText.trim()) {
      setQueries(
        queries.map(query => 
          query.id === queryId 
            ? { 
                ...query, 
                comments: [...query.comments, { id: query.comments.length + 1, username: "Commenter", rating: 4.0, text: commentText, upvotes: 0 }]
              }
            : query
        )
      );
      setCommentText('');
    }
  };

  const handleUpvoteQuestion = (queryId) => {
    setQueries(
      queries.map(query => 
        query.id === queryId
          ? { ...query, upvotes: query.upvotes + 1 }
          : query
      )
    );
  };

  const handleUpvoteReply = (queryId, replyId) => {
    setQueries(
      queries.map(query => 
        query.id === queryId
          ? {
              ...query,
              replies: query.replies.map(reply => 
                reply.id === replyId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
              )
            }
          : query
      )
    );
  };

  const handleUpvoteComment = (queryId, commentId) => {
    setQueries(
      queries.map(query => 
        query.id === queryId
          ? {
              ...query,
              comments: query.comments.map(comment => 
                comment.id === commentId ? { ...comment, upvotes: comment.upvotes + 1 } : comment
              )
            }
          : query
      )
    );
  };

  return (
    <div className="discussion-container">
      <h1>Discussion Page</h1>
      
      <div className="upload-query">
        <textarea 
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder="Upload your query here..."
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      
      <div className="queries-list">
        {queries.map(query => (
          <div key={query.id} className="query-item">
            <div className="query-header">
              <p className="query-text">{query.text}</p>
              <button className="upvote-button" onClick={() => handleUpvoteQuestion(query.id)}>
                <span className="arrow">↑</span> {query.upvotes}
              </button>
            </div>
            <div className="user-info">
              <span className="username">{query.username}</span>
              <span className="rating">Rating: {query.rating}</span>
            </div>

            <div className="comments-section">
              <h4>Comments</h4>
              {query.comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.text}</p>
                  <div className="user-info">
                    <span className="username">{comment.username}</span>
                    <span className="rating">Rating: {comment.rating}</span>
                  </div>
                  <button className="upvote-button" onClick={() => handleUpvoteComment(query.id, comment.id)}>
                    <span className="arrow">↑</span> {comment.upvotes}
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleComment(query.id, commentText)}
              />
            </div>

            <div className="replies-section">
              <h4>Replies</h4>
              {query.replies.map(reply => (
                <div key={reply.id} className="reply-item">
                  <p>{reply.text}</p>
                  <div className="user-info">
                    <span className="username">{reply.username}</span>
                    <span className="rating">Rating: {reply.rating}</span>
                  </div>
                  <div className="reply-actions">
                    <button className="upvote-button" onClick={() => handleUpvoteReply(query.id, reply.id)}>
                      <span className="arrow">↑</span> {reply.upvotes}
                    </button>
                    <button className="reply-button" onClick={() => setReplyText(`Replying to ${reply.username}: `)}>
                      💬
                    </button>
                  </div>
                  {reply.subReplies.map(subReply => (
                    <div key={subReply.id} className="sub-reply-item">
                      <p>{subReply.text}</p>
                      <div className="user-info">
                        <span className="username">{subReply.username}</span>
                        <span className="rating">Rating: {subReply.rating}</span>
                      </div>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleReply(query.id, reply.id, replyText)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;