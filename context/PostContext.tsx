"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface DataContextProps {
  children: any;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

type Post_EditableProps = Partial<Post>;

interface DataContextType {
  posts: Post[];
  fetchPost: () => Promise<void>;
  addPost: (newPost: Post_EditableProps) => Promise<void>;
  updatePost: (id: number, updatedPost: Post_EditableProps) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // 게시물 불러오기
  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPosts(post);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  // 게시물 추가
  const addPost = useCallback(async (newPost: Post_EditableProps) => {
    try {
      let id: number = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...newPost }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPosts((prevPost) => [...prevPost, post]);
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  // 게시물 수정
  const updatePost = useCallback(
    async (id: number, updatedPost: Post_EditableProps) => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updatedPost }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const post = await response.json();
        setPosts((prevPost) =>
          prevPost.map((item) => (item.id === id ? post : item))
        );
      } catch (err) {
        console.error("failed to fetch data", err);
      }
    },
    []
  );

  // 게시물 삭제
  const deletePost = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const post = await response.json();
      setPosts((prevPost) => prevPost.filter((item) => item.id !== id));
    } catch (err) {
      console.error("failed to fetch data", err);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ posts, fetchPost, addPost, updatePost, deletePost }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error("내용 없음");
  return context;
};
