'use client';
import { useEffect, useState } from 'react';
import PostPreview from './components/postPreview/PostPreview';
import styles from './page.module.css';
import { PostData } from './lib/types/response';
import PostService from './lib/data/postService';

export default function Page() {
  // const posts = await getAllPosts();
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const posts = await getAllPosts();
        const response = await PostService.getAllPosts();
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts: PostData[] = await response.data;
        if (posts) {
          setPosts(posts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className={styles.main}>
      {posts &&
        posts.length > 0 &&
        posts
          .filter((post) => post.isPosted)
          .map((post) => <PostPreview key={post.id} {...post} />)}
    </main>
  );
}
