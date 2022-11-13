import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map((post) => (
            <PostCard
                key={post.id}
                body={post.body}
                id={post.id}
                title={post.title}
                cover={post.cover}
            />
        ))}
    </div>
);
