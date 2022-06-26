import { Icon } from 'react-materialize';
import './main.css';

const Placeholder = () => {
    return (
        <div className="container placeholder-profile">
            <h3 className='grey-text text-lighten-2'>You don't have any Book published yet</h3>
            <h5 className='grey-text text-lighten-2'>Press</h5>
            <Icon large className='grey-text text-lighten-2'>
                add_box
            </Icon>
            <h5 className='grey-text text-lighten-2'>To add one</h5>
        </div>
    );
}

export default Placeholder;