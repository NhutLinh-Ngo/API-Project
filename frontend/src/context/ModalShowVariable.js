import React, { useContext, useState, createContext } from 'react';
import ReactDOM from 'react-dom';

const ModalVariableContext = createContext();
export function ModalVariableProviser({ children }) {
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalSignup, setShowModalSignup] = useState(false);

	return (
		<ModalVariableContext.Provider
			value={{
				showModalLogin,
				setShowModalLogin,
				showModalSignup,
				setShowModalSignup
			}}
		>
			{children}
		</ModalVariableContext.Provider>
	);
}

const useModalVariableContext = () => useContext(ModalVariableContext);

export default useModalVariableContext;
