import { useEffect, useState } from "react";
import { Button, Col, Icon, Row, Textarea, TextInput } from "react-materialize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadBookMiddleware } from "../../actions/bookActions";
import useForm from "../../hooks/useForm";
import InputImage from "../Form/InputImage";
import BookCard from "./BookCard";
import BookStatus from "./BookStatus";

const initialValue = {title: '', author: '', currentPage: '0'}

const PostBook = () => {

    const {loading} = useSelector((state:any) => state.ui);

    const [picturePath, setPicturePath] = useState('');
    const [pictureFile, setPictureFile] = useState(undefined);
    const [formState, setFormState] = useForm(initialValue);
    const [status, setStatus] = useState('new');
    const [description, setDescription] = useState('');
    const [isDisable, setDisable] = useState(true);
    const {author, title, currentPage} = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postBookHandler = async () => {
        dispatch(uploadBookMiddleware(pictureFile, {author, title, currentPage, status, description}));
        navigate('/')

    }

    useEffect(() => {
        if (author.length > 2 && description.length <= 300 && title.length > 2 && isNaN(parseInt(currentPage)) === false)
            setDisable(false);
        else
            setDisable(true);
    }, [author, description, title, currentPage]);

    const descriptionHandler = (event:any) => {
        setDescription(event.target.value);
    }
    return (
        <div className="z-depth-1">
            <Row className="d-flex flex-center">
                <Col style={{"paddingInline": "2rem", "width": "25rem"}}>
                    <BookCard {...formState} cover={picturePath} local={true} />
                </Col>
                <Col style={{"width": "70%"}}>
                    <InputImage innerText="Book Cover" style={{"width": "100%"}} pictureFileHandler={setPictureFile} picturePathHandler={setPicturePath}/>
                </Col>
                <Col>
                    <TextInput placeholder="Author" icon="person" id="input-author" name="author" onChange={setFormState} value={author}/>
                </Col>
                <Col>
                    <TextInput placeholder="Book Title" icon="book" id="input-title" name="title" onChange={setFormState} value={title}/>
                </Col>
                <Col>
                    <TextInput label="Current Page" placeholder="Current Page" id="input-current-page" name="currentPage" value={currentPage} onChange={setFormState} icon="filter_none" type="number" error="Numbers Only" validate />
                </Col>
                <Col>
                    <BookStatus stateHandler={setStatus}/>
                </Col>
                <Col style={{"width": "74%"}}>
                    <Textarea s={12} icon={<Icon >description</Icon>} data-length={300} id="description" label="Description" onChange={descriptionHandler} value={description}/>
                </Col>
                <Col style={{"width": "100%", "height": "5rem"}}>
                    <Button
                        onClick={postBookHandler}
                        node="button"
                        waves="light"
                        disabled={isDisable || loading}
                    >
                        Publish
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PostBook;