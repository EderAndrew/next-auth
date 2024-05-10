import LikeButton from './like-icon';
import { IPost } from '@/interfaces/Post';

function Post({ post }: { post: IPost }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image_url} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.user_id} on{' '}
              <time dateTime={post.created_at}>
                {post.created_at}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
