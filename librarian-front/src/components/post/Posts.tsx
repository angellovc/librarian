import { Collection } from "react-materialize";
import { useSelector } from "react-redux";
import { Post } from "../../types/postTypes";
import PostCard from "./PostCard";
import PostEditor from "./PostEditor";

const Posts = ({posts}:any) =>{



    const activePost:Post = useSelector((state:any) => state?.post?.active);
    return (
        <>
        {
            posts.length > 0 &&
            <Collection>
            {
                posts.map((post:Post) => activePost !== undefined && post.id === activePost.id? 
                                            <PostEditor key={post.id} post={post}/>: 
                                            <PostCard key={post.id} post={post}/>
                                            )
            }
            </Collection>
        }
        </>
    );
}

export default Posts