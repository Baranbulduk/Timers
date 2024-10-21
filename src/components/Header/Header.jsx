import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <Link to="/">SET TIMER</Link>
            <Link to="/analog">ANALOG TIMER</Link>
            <Link to="/digital">DIGITAL TIMER</Link>
        </div>
    );
}

export default Header