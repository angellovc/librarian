import { useEffect, useState } from "react";
import { Button, Col, Icon, Row, Textarea, TextInput } from "react-materialize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBookMiddleware } from "../../actions/bookActions";
import useForm from "../../hooks/useForm";
import { Book, ReadingStatus } from "../../types/bookTypes";
import InputImage from "../Form/InputImage";
import BookCard from "./BookCard";
import BookStatus from "./BookStatus";

const BookEditor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading} = useSelector((state:any) => state.ui);
    const activeBook:Book = useSelector((state:any) => state?.book?.active);

    const [picturePath, setPicturePath] = useState(process.env.REACT_APP_BACKEND+'/'+activeBook?.picture||'');
    const [pictureFile, setPictureFile] = useState(undefined);
    const [formState, setFormState] = useForm({title: activeBook?.title||'', author: activeBook?.author||'', currentPage: activeBook?.currentPage||0});
    const [status, setStatus] = useState(activeBook?.status as string||'');
    const [description, setDescription] = useState(activeBook?.description||'');
    const [isDisable, setDisable] = useState(true);
    const {author, title, currentPage} = formState;



    const updateBookHandler = async () => {
        dispatch(updateBookMiddleware(pictureFile, {
            ...activeBook,
            title,
            author,
            currentPage,
            description,
            status: status as ReadingStatus,
        }));
        navigate(-1)
    }

    const descriptionHandler = (event:any) => {
        setDescription(event.target.value);
    }
    useEffect(() => {
        if (activeBook === undefined)
        navigate('/');
    },[activeBook, navigate])

    useEffect(() => {
        if (author.length > 2 && description.length <= 300 && title.length > 2 && isNaN(parseInt(currentPage)) === false)
            setDisable(false);
        else
            setDisable(true);
    }, [author, description, title, currentPage]);

    const discardHandler = () => {
        navigate(-1);
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
                    <TextInput label="Current Page" placeholder="Current Page" id="input-current-page" name="currentPage" value={currentPage+''} onChange={setFormState} icon="filter_none" type="number" error="Numbers Only" validate />
                </Col>
                <Col>
                    <BookStatus stateHandler={setStatus}/>
                </Col>
                <Col style={{"width": "74%"}}>
                    <Textarea s={12} icon={<Icon >description</Icon>} data-length={300} id="description" label="Description" onChange={descriptionHandler} value={description}/>
                </Col>
                <Col className="m-bottom-2 d-flex flex-center j-between" style={{"width": "100%", "height": "5rem"}}>
                    <Button
                        className="red darken-2"
                        onClick={discardHandler}
                        node="button"
                        waves="light"
                    >
                            Discard
                            <Icon right>cancel</Icon>
                    </Button>
                    <Button
                        onClick={updateBookHandler}
                        node="button"
                        waves="light"
                        disabled={isDisable || loading}
                    >
                        Save
                        <Icon right>save</Icon>
                    </Button>
 
                </Col>
            </Row>
        </div>
    );
}

export default BookEditor;