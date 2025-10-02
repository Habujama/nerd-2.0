import type { CipherInfo } from '../../context/types'

interface SolvedCiphersProps {
    solvedCiphers: CipherInfo[] | false
    activeCipherId: number | null
    onButtonClick: (id: number) => void
}


const SolvedCiphers = ({ solvedCiphers, activeCipherId, onButtonClick }: SolvedCiphersProps) => (
    <ul className='cipher-list'>
         {solvedCiphers &&
            solvedCiphers.map((c: CipherInfo) => (
                <li key={c.id} className='cipher-banner'>
                    <span>
                        <strong>#{c.id + 1}</strong>
                        {c.solved && (
                          <small>
                            {' '}
                            (Otevřeno {new Date(c.solvedAt ?? '').toLocaleString()})
                          </small>
                        )}
                    </span>
                    <button onClick={() => onButtonClick(c.id)}>
                        {c.id === activeCipherId
                          ? 'Zavřít soubor'
                          : 'Zobrazit soubor'}
                      </button>
                </li>
            ))}
    </ul>
)

export default SolvedCiphers
