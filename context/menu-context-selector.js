import { useState, useCallback, useEffect, useReducer } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const menuDataStore = () => {
	//================== STATE OBJECTS ========================//
	const initialMenuState = ['item1','item2','item3','item4','item5'];
	const specialMenuState = ['special1','special2','special3','special4','special5'];
	const specialMenuState2 = ['SPECIAL1','SPECIAL2','SPECIAL3','SPECIAL4','SPECIAL5'];

	//Context with state --------------------------
	const [primaryMenuItems, setPrimaryMenuItems] = useState([initialMenuState]);
	const [profileSet, updateProfileSet] = useState('');

	useEffect(()=>{
		if(profileSet==='test'){
			setPrimaryMenuItems(specialMenuState);
		} else {
			setPrimaryMenuItems(initialMenuState);
		}
	},[profileSet])

	//---------------------------------------------

	//Context with reducer-------------------------
		const menuReducer = (state, action)=> {
		switch(action.type) {
		  case 'test':
		    return specialMenuState2
		  default:
		    return initialMenuState
		}
	      }

	const [menuState, menuDispatch] = useReducer(menuReducer,initialMenuState)
	//--------------------------------------------

	//state and reducer values for export
	return {
		primaryMenuItems, 
		profileSet, 
		menuState, //Reducer Data
		menuDispatch, //Reducer
		doUpdateProfileSet : useCallback((v)=>{	updateProfileSet(v)},[]), 
		
	};	
};


// Menu Context -----------------------------------------
const MenuContext = createContext(null);

export const MenuContextProvider = ({ children }) => (
	<MenuContext.Provider value={menuDataStore()}>
		{children}
	</MenuContext.Provider>
);
// ------------------------------------------------------


//Exports for useContextSelector for partial page updates.
export const MenuContext_profileSet = () =>
	useContextSelector(MenuContext, (s) => s.profileSet);

export const MenuContext_primaryMenuItems = () =>
	useContextSelector(MenuContext, (s) => s.primaryMenuItems);

export const MenuContext_doUpdateProfileSet = () =>
	useContextSelector(MenuContext, (s) => s.doUpdateProfileSet);

export const MenuContext_doMenuDispatch = () =>
	useContextSelector(MenuContext, (s) => s.menuDispatch);

export const MenuContext_menuState = () =>
	useContextSelector(MenuContext, (s) => s.menuState);
//------------------------------------------------------

