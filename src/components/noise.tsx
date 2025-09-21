import './noise.css'

const NUM_LINES = 4;

const NoiseLines = () => {
  return (
    <div className='noise'>
      {Array.from({ length: NUM_LINES }).map((_, i) => (
        <div
          key={i}
          className='noise-line'
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default NoiseLines
