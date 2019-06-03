import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import icon from './icon.png';
const Logo= ()=>{

	return(
		<div className='center ma4 mt0' >
		<Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
		 <div className="Tilt-inner pa4">
		 <img alt='icon' src={icon}/></div>
		</Tilt>
			
		</div>
		);
}

export default Logo;