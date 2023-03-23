import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useUser = () => useContext(AppContext);
