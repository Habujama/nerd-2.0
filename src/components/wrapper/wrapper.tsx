import NoiseLines from '../noise/noise';
import './wrapper.css';

const Wrapper = ({
  children,
  alignStart = true,
}: {
  children: React.ReactNode;
  alignStart?: boolean;
}) => {
  return (
    <div className='wrapper-container'>
      <NoiseLines />
      <div
        className='wrapper'
        style={{ justifyContent: alignStart ? 'flex-start' : 'center' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
