"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import PromptCart from "./PromptCart";

const PromptCartList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCart key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const router = useRouter()
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault;
    setSearchText(e.target.value);
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/prompt");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching prompts", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = posts.filter((post) => {
        const lowerSearchText = searchText.toLowerCase();
        return (
          post.prompt.toLowerCase().includes(lowerSearchText) ||
          post.tag.toLowerCase().includes(lowerSearchText) ||
          post.creator.username.toLowerCase().includes(lowerSearchText) ||
          post.creator.email.toLowerCase().includes(lowerSearchText)
        );
      });
      setSearchPosts(filtered);
    } else {
      setSearchPosts(posts);
    }
  }, [searchText, posts]);

  const handlePostClick = (userId) => {
    router.push(`/profile?id=${userId}`);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or an username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer "
        />
      </form>
      <PromptCartList data={searchPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
