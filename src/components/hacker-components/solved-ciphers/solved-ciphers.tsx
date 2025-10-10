import { useNavigate } from 'react-router-dom';
import { ROUTE_MAP, type CipherInfo } from '../../../context/types'
import './solved-ciphers.css'

interface SolvedCiphersProps {
  solvedCiphers: CipherInfo[] | false;
}


const SolvedCiphers = ({
  solvedCiphers,
}: SolvedCiphersProps) => {
  const navigate = useNavigate();

  const handleShowSolvedCipher = (cipherId: string) => {
    const route = ROUTE_MAP[cipherId];
    return route ? navigate(route) : alert('Error: no portal available for this session.');
  }
  
  return(
  <ul className='cipher-list'>
    {solvedCiphers &&
      solvedCiphers.map((c: CipherInfo) => (
        <li key={c.key} className='cipher-banner'>
          <span>
            <strong>#{c.key + 1}</strong><br />
            {c.solved && (
              <small>
                {new Date(c.solvedAt ?? '').toLocaleString()}
              </small>
            )}
          </span>
          <button onClick={() => handleShowSolvedCipher(c.key)}>
           Zobrazit soubor
          </button>
        </li>
      ))}
  </ul>
)
}
export default SolvedCiphers
