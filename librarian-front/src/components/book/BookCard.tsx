import './bookCard.css';
import { Card } from "react-materialize";
import { useNavigate } from 'react-router-dom';

const bookCover = process.env.REACT_APP_BACKEND+'/assets/images/static/book-cover.jpg';

const BookCard = ({id, title, author, cover, local = false}:{title:string, author:string, cover:string|null, local?:boolean, id:string}) =>  {

    const navigate = useNavigate();

    const coverSelector = (cover:string|null, local:boolean) => {
        if (local)
            return cover !== null && cover.length > 0? cover:bookCover
        else
            return cover !== null && cover.length > 0?process.env.REACT_APP_BACKEND+'/'+cover:bookCover
    }

    const clickHandler = (event:any) => {
        event.preventDefault();
        navigate(`/book-preview/${id}`)
    }

    return (
            <Card className="hoverable card"
                header={
                    <div className="c-content" onClick={clickHandler} >
                        <img src={coverSelector(cover, local)} alt={title} />
                            <div className="text-block">
                                <h5 className="text grey-text text-lighten-2" >
                                    {author}
                                </h5>
                            </div>
                    </div>
            }
            >
                {title}
            </Card>
    );
}

export default BookCard;