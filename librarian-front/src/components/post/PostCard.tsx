import { Col, CollectionItem, Row } from "react-materialize";
import { ProfilePicture } from "../ProfilePicture";
import { User } from "../../types/userTypes";
import DropDown from "../dropDown/DropDown";
import DropDownOpstion from "../dropDown/DropDownOption";
import './postCard.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { question } from "../../utils/alerts/swalCustom";
import { deletePostsMiddleware, setPostActive } from "../../actions/postActions";
import { Post } from "../../types/postTypes";

const PostCard = ({post}:{post:Post}) => {

    const auth = useSelector((state:any) => state?.auth);
    const activeBook = useSelector((state:any) => state?.book.active);
    const user:User = post.user;
    const dispatch = useDispatch();

    const deletePostHandler = () => {
        question({title: "Comment will be deleted", text: "Are you sure?", onConfirm: () => {
            dispatch(deletePostsMiddleware(activeBook?.id, post?.id));
        }})
    }

    const editPostHandler = () => {
        dispatch(setPostActive(post));
    }

    return(
        <CollectionItem>
            <Row>
                <DropDown id={post?.id?.toString()} >
                    {
                        auth.id === user.id &&
                        <>
                            <DropDownOpstion icon="delete" onClick={deletePostHandler}/>
                            <DropDownOpstion icon="edit" onClick={editPostHandler}/>
                        </>
                    }
                </DropDown>
                <Col l={3} s={12}>
                    <ProfilePicture name={user?.name} profilePicture={process.env.REACT_APP_BACKEND+'/'+user?.picture} height={"5rem"} width={"5rem"}/>
                    <h6 className=" grey-text text-darken-0" >
                        {post?.user?.name}
                    </h6>
                    <p className=" grey-text text-darken-0" >
                        {post?.user?.email}
                    </p>

                </Col>
                <Col className="d-flex flex-center comment-box" l={9} s={12}>
                    <span className="content">
                        {post?.content}
                    </span>
                </Col>
            </Row>
        </CollectionItem>
    );
}

export default PostCard;