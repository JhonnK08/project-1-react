import { Component } from "react";
import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";
import "./styles.css";

class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 10,
        searchValue: "",
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

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ searchValue: value });
    };

    render() {
        const { page, allPosts, postsPerPage, posts, searchValue } = this.state;
        const noMorePosts = page + postsPerPage >= allPosts;

        const filteredPosts = !!searchValue
            ? posts.filter((post) => {
                  return post.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
              })
            : posts;

        return (
            <section className="container">
                <div className="search-container">
                    {!!searchValue && <h1>Search value: {searchValue}</h1>}
                    <TextInput
                        handleChange={this.handleChange}
                        searchValue={searchValue}
                    />
                </div>

                {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
                {filteredPosts.length === 0 && <p>Não existem posts.</p>}

                <div className="button-container">
                    {!searchValue && (
                        <Button
                            text="Load more posts"
                            onClick={this.loadMorePosts}
                            disabled={noMorePosts}
                        />
                    )}
                </div>
            </section>
        );
    }
}

export default Home;
