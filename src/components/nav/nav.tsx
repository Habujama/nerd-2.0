import { useAuth } from '../../context/use-context';
import Logout from '../../assets/logout.tsx'
import './nav.css';

const Nav = () => {
    const { login } = useAuth();
    return (
      <div className='nav'>
        <button
          className='nav-button'
          style={{ width: '250px' }}
          onClick={() => login(null, null)}
        >
          {' '}
          <Logout /> Odhlásit
        </button>
      </div>
    );
}

export default Nav;
