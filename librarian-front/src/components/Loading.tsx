import { Preloader } from "react-materialize";

const Loading = () => {
    return (
        <div className='d-flex flex-center' style={{"minHeight": "inherit"}}>
            <Preloader
              active
              color="green"
              flashing={false}
              size="big"
            />
        </div>
    );
}

export default Loading;