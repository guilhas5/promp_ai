"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
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
          } else {
            console.error("Failed to fetch posts", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    fetchPosts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConffirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConffirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts)

      } catch (error) {
        console.log(error);
      }
    }
  };

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
