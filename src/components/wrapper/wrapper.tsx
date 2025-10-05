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
    <>
      <NoiseLines />
      <div
        className='wrapper'
        style={{ justifyContent: alignStart ? 'flex-start' : 'center' }}
      >
        {children}
      </div>
    </>
  );
};

export default Wrapper;
