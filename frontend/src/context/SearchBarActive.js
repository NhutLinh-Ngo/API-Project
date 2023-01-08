import React, { useContext, useState, createContext } from 'react';

const SearchBarActive = createContext();

export function SearchBarActiveProvider({ children }) {
	const [searchBarModalActive, setSearchBarModalActive] = useState(false);

	return (
		<SearchBarActive.Provider
			value={{
				setSearchBarModalActive,
				searchBarModalActive
			}}
		>
			{children}
		</SearchBarActive.Provider>
	);
}

const useSearchBarActive = () => useContext(SearchBarActive);

export default useSearchBarActive;
