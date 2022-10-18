import React from 'react'
import { c_primaryMenuItems, c_menuState } from '../context/menu-context-selector';
const Footer = () => {
        let items = c_primaryMenuItems();	
	let ditems = c_menuState();
	return (
		<div>
			{items}			
			<br />
			{ditems}
                        <br/>
		</div>
	);

}
	
export default Footer