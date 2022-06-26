import { useEffect } from "react";
import { Col, Divider, Row } from "react-materialize";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookMiddleware, getActiveBookMiddleware, setBookActive } from "../../actions/bookActions";
import { loadPostsMiddleWare } from "../../actions/postActions";
import { Book } from "../../types/bookTypes";
import { Post } from "../../types/postTypes";
import { question } from "../../utils/alerts/swalCustom";
import DropDown from "../dropDown/DropDown";
import DropDownOpstion from "../dropDown/DropDownOption";
import PostInput from "../post/PostInput";
import PostCard from "../post/Posts";
import './bookPreview.css';

const BookPreview = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const activeBook:Book = useSelector((state:any) => state?.book?.active);
    const books:Book[] = useSelector((state:any) => state?.book?.books);
    const posts:Post[] = useSelector((state:any) => state?.post?.posts);
    const navigate = useNavigate();

    useEffect(() => {
        const book = books.find(book => book.id === id); 
        if (book !== undefined) {
            dispatch(setBookActive(book));
        } else {
            dispatch(getActiveBookMiddleware(id))
        }

        dispatch(loadPostsMiddleWare(id));
    }, [dispatch, id, books, navigate]);


    const deleteBookHandler = () => {
        question({title: "Book will be deleted", text: "Are you sure?", onConfirm: () => {
                dispatch(deleteBookMiddleware(id));
                navigate('/');
            }
        });
    }

    const editBookHandler = () => {
        navigate("/book-editor")
    }

    return (
        <>
        <Row className="z-depth-2">
            <div className='w-100 d-flex' style={{"justifyContent": "right"}}>
            <DropDown id="book-preview-options" icon="menu" >
                    <DropDownOpstion icon="delete" innerText="Delete Book" onClick={deleteBookHandler}/>
                    <DropDownOpstion icon="edit" innerText="Edit Book" onClick={editBookHandler}/>
            </DropDown>
            </div>
            <Col className="center w-100 m-top-2">
                <figure className="book-preview-frame">
                    <img className="responsive-img z-depth-2" alt="TODO" src={process.env.REACT_APP_BACKEND+'/'+activeBook?.picture} />
                </figure>
                <h3 className="">{activeBook?.title}</h3>
                <div className=" p-x-2 m-bottom-2">
                    <p>{activeBook?.description}</p>
                </div>
                <Divider/>
            </Col>
            <Col s={12} className="m-top-2">
                <PostCard posts={posts}/>
            </Col>
        </Row>
        <PostInput />

        </>
    );
}

export default BookPreview;