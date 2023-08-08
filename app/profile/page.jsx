"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (session?.user.id) {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          }else {
            console.error('Failed to fetch posts',  response.status)
          }
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    fetchPosts();
  }, [session]);

  const handleEdit = () => {};

  const handleDelete = async () => {};
  return (
    <Profile
      name="My"
      description="Welcome to your profile page. Check, edit or delete your amazing ideas"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
