"use client";

import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/PostContext";

function Homepage() {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const { posts, fetchPost, addPost, updatePost, deletePost } =
    useDataContext();

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {}, [posts]);

  const onClickGet = async () => {
    console.log(posts);
  };

  const onClickPost = async () => {
    await addPost(newPost);
    setNewPost({ title: "", content: "" });
  };

  const onClickPut = async () => {
    await updatePost(3, { title: "안녕하냐고?" });
  };

  const onClickDelete = async (id: number) => {
    await deletePost(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="App">
        <div>
          <button onClick={onClickGet}>데이터 가져오기</button>
          <button onClick={onClickPut}>데이터 수정하기</button>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <span>
                <strong>{post.id}</strong>
              </span>
              <span>{post.title}</span>
              <p>{post.content}</p>
              <button
                onClick={() => {
                  onClickDelete(post.id);
                }}
              >
                삭제하기
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newPost.title}
            onChange={handleChange}
          />
          <label htmlFor="content">내용</label>
          <input
            type="text"
            name="content"
            id="content"
            value={newPost.content}
            onChange={handleChange}
          />
          <button onClick={onClickPost}>게시물 추가하기</button>
        </form>
      </div>
    </>
  );
}

export default Homepage;
