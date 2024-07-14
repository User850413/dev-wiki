"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const DataContext = createContext(null);

export const DataProvider = () => {
  const [post, setPost] = useState([]);

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPost(post);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  const addPost = useCallback(async (newPost) => {
    try {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newData: newPost }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPost((prevPost) => [...prevPost, post]);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  const updatePost = useCallback(async (id, updatedPost) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      console.log("updated data : ", post);
      setPost((prevPost) =>
        prevPost.map((item) => (item.id === id ? post : item))
      );
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  const deletePost = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPost((prevPost) => prevPost.filter((item) => item.id !== id));
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ fetchPost, addPost, updatePost, deletePost }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
