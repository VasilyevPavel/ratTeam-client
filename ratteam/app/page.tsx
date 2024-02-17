import PostPreview from './components/postPreview/PostPreview';
import { getAllPosts } from './lib/data/postData';
import styles from './page.module.css';

export default async function Home() {
  const posts = await getAllPosts();
  console.log('posts', posts);
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
