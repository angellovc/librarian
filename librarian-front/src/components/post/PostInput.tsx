import { useEffect, useState } from "react";
import { Button, Col, Icon, Row, Textarea } from "react-materialize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPostMiddleware } from "../../actions/postActions";
import { Book } from "../../types/bookTypes";

const PostInput = () => {
    const activeBook:Book = useSelector((state:any) => state?.book?.active);
    const {loading} = useSelector((state:any) => state?.ui);
    const [isDisable, setIsDisable] = useState(true);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const commentHandler = (event:any) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        if (comment.length > 0)
            setIsDisable(false);
        else
            setIsDisable(true);
    }, [comment, setIsDisable])


    const createPostHandler = () => {
        setComment("") ;
        dispatch(createPostMiddleware(activeBook?.id, comment));
    }


    return (
        <Row className="p-y-3 d-flex flex-center z-depth-1 m-y-3">
            <Col className="" s={7} >
                <Textarea onChange={commentHandler} value={comment} placeholder="Leave a Comment" label="Comment" id="new-comment" data-length={300} s={12}/>
            </Col>
            <Col s={5}>
                <Button onClick={createPostHandler} disabled={isDisable||loading} icon={<Icon right>send</Icon>}>Publish</Button>
            </Col>
        </Row>
    );
}

export default PostInput;