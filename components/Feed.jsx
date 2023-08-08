"use client";

import { useEffect, useState } from "react";

import PromptCart from "./PromptCart";

const PromptCartList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCart
        key={post.id}
        post={post}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  )
} 


const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {
    e.preventDefault;
    setSearchText(e.target.value);
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/prompt")
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Error fetching prompts",error)
      }
    }
    fetchPosts()
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tar or a username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer "
        />
      </form>
      <PromptCartList data={posts}
      handleTagClick={() => {}}/>
    </section>
  );
};

export default Feed;
