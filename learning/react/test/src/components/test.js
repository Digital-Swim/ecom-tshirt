import { useEffect, useMemo, useState } from "react";

export const Cat = ({name, fn = f => f}) => {
    console.log(`rendering ${name}`);
    return (<div>{name}</div>)
}

export const useJazzyNews = () => {
    const [_posts, setPosts] = useState([]);
    const addPost = post => setPosts(allPosts => [post, ...allPosts]);
    const posts = useMemo(() => _posts, [_posts]);

    useEffect(() => {
        console.log("On new Post memo")
    }, [posts]);

    useEffect(() => {
        console.log("On new posts array ")
    }, [_posts]);


    useEffect(() => {
        console.log("Subscribed for new Post")
        return () => console.log("Unscubscribeed for new post")
    }, []);

    useEffect(() => {
        console.log("Hello!!!")
        return () => console.log("Good bye!!")
    }, []);

    return posts;
};