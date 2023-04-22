import { Link } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
const Navbar = ({ categories, onCategoryClick }) => {
    return (
        <nav className='navbar'>
            <ul>
                {categories.map(
                    category => (
                        <li key={category} className='category'>
                            <a className="" href="#" onClick={() => onCategoryClick(category)}>{category}</a>
                        </li>
                    )
                )}
            </ul>
            <div className='links'>
                <Link to={'/'} className='link' onClick={() => onCategoryClick(null)}>Home</Link>
                <Link to={'/Cart'} className='link'>Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;