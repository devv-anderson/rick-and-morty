import { useState, useEffect } from 'react';
import Pagination from 'react-paginate';
import axios from 'axios';
import styles from './App.module.css'

function App() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://rickandmortyapi.com/api/character?name=${name}&page=${currentPage + 1}`);
                setCharacters(response.data.results);
                setTotalPages(response.data.info.pages);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [currentPage, name]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    }

    return (
        <div className={styles.container}>
          <header className={styles.header}>
            <input placeholder='Type a character name' type="text" value={name} onChange={e => setName(e.target.value)} />
          </header>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
              <div>
                    <div className={styles.container}>
                        {characters.map((character) => (
                            <div key={character.id}>
                                <img src={character.image} alt={character.name}/>
                                <div className={styles.info}>
                                <p>Name: {character.name}</p>
                                <p>Status: {character.status}</p>
                                <p>Specie: {character.species}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <Pagination
                     containerClassName={styles.pagination}
                     pageCount={totalPages}
                     forcePage={currentPage}
                     onPageChange={handlePageChange}
                    />
              </div>
                )}
        </div>
    )
}

export default App;
