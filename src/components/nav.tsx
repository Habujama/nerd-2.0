import { useAuth } from '../context/use-context';
import Logout from '../assets/logout.tsx'
import './nav.css';

const Nav = () => {
    const { login } = useAuth();
    return (
      <div className='nav'>
        <button className='nav-button' onClick={() => login(null)}>
          {' '}
          <Logout /> Odhlásit
        </button>
      </div>
    );
}

export default Nav;
