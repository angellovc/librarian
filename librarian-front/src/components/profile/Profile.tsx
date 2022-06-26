import Header from './header/Header';
import Main from './main/Main';

const Profile = ({name, description, email, picture, owner = false}:{name:string, description:string, email:string, picture:string, owner?:boolean}) =>  {
    return ( 
        <>
            <Header
                name={name}
                description={description}
                profilePicture={picture}
                email={email}
                owner={owner}
            />
            <Main />
        </>
    )
}

export default Profile;
