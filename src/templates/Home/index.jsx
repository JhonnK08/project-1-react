import { Component } from "react";
import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import "./styles.css";

class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 2,
    };

    async componentDidMount() {
        await this.loadPosts();
    }

    loadPosts = async () => {
        const { page, postsPerPage } = this.state;
        const postsAndPhotos = await loadPosts();
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos,
        });
    };

    loadMorePosts = () => {
        const { page, postsPerPage, posts, allPosts } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        console.log(page, postsPerPage, nextPage, page + postsPerPage);
        posts.push(...nextPosts);

        this.setState({ posts, page: nextPage });
    };

    render() {
        const { page, allPosts, postsPerPage, posts } = this.state;
        const noMorePosts = page + postsPerPage >= allPosts;
        return (
            <section className="container">
                <Posts posts={posts} />
                <div className="button-container">
                    <Button
                        text="Load more posts"
                        onClick={this.loadMorePosts}
                        disabled={noMorePosts}
                    />
                </div>
            </section>
        );
    }
}

export default Home;
