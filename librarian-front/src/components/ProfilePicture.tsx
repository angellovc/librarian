import './profilePicture.css';
import { Col, Row } from "react-materialize"
import { useEffect, useState } from 'react';

const ProfilePicture  = ({name, profilePicture, height, width}:{name:string, profilePicture:string, height?:string, width?:string}) => {
    const [imageLoaded, setImageLoaded] = useState(true);
    height = height !== undefined? height: '17rem';
    width = width !== undefined? width: '17rem';
    const fontSize = parseInt(width.replace(/[^\d.]/g, ''))/2 + "rem";

    useEffect(() => {
        setImageLoaded(true);
    },[profilePicture])
    return (
        <Row>
            <Col className="center m-top-2" s={12} style={{"display": "flex", "justifyContent": "center"}}>
                <div className='profile-picture-frame z-depth-1' style={{"width": width, "height": height, "fontSize": fontSize}}>
                    {
                        imageLoaded?
                            <img
                                alt={name[0]?.toUpperCase()}
                                className="profile-picture"
                                src={profilePicture}
                                onError={() => {setImageLoaded(false)}}
                            />:
                            <div className='d-flex' style={{"alignContent": "center"}}>
                                <p>{name[0]?.toUpperCase()}</p>
                            </div>
                    }
                </div>
            </Col>
        </Row>


    ) 
}

export {
    ProfilePicture
}