import { Button, Col, CollectionItem, Icon, Row, Textarea } from "react-materialize";
import { ProfilePicture } from "../ProfilePicture";
import { User } from "../../types/userTypes";
import './postCard.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removePostActive, updatePostMiddleware } from "../../actions/postActions";
import { Post } from "../../types/postTypes";
import { useEffect, useState } from "react";

const PostEditor = ({post}:{post:Post}) => {

    const activeBook = useSelector((state:any) => state?.book.active);
    const user:User = post.user;
    const dispatch = useDispatch();
    const [comment, setComment] = useState(post.content);
    const [isDisable, setIsDisable] = useState(true);

    const commentHandler = (event:any) => {
        setComment(event.target.value);
    }


    useEffect(() => {
        if (comment.length > 0)
            setIsDisable(false);
        else
            setIsDisable(true);
    }, [comment, setIsDisable])

    const postSaveHandler = () => {
       
        dispatch(updatePostMiddleware(activeBook.id, {...post, content: comment}));
    }

    const postDiscardHandler = () => {
        dispatch(removePostActive())
    }

    return(
        <CollectionItem>
            <Row>
                <Col l={3} s={12}>
                    <ProfilePicture name={user?.name} profilePicture={process.env.REACT_APP_BACKEND+'/'+user?.picture} height={"5rem"} width={"5rem"}/>
                    <h6 className=" grey-text text-darken-0" >
                        {post?.user?.name}
                    </h6>
                    <p className=" grey-text text-darken-0" >
                        {post?.user?.email}
                    </p>

                </Col>
                <Col className="d-flex flex-center comment-box" l={9} s={12} >
                    <Textarea s={12} id="comment" data-length={300} label="Comment" placeholder="Leave a comment" value={comment} onChange={commentHandler}/>
                    <div className="d-flex j-between w-100">
                        <Button onClick={postDiscardHandler} className="red lighten-2" icon={<Icon right>cancel</Icon>}>Discard</Button>
                        <Button disabled={isDisable} onClick={postSaveHandler} icon={<Icon right>send</Icon>}>Save</Button>
                    </div>
                </Col>
            </Row>
        </CollectionItem>
    );
}

export default PostEditor;