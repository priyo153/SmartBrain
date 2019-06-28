import React from 'react';
import './FaceRecognition.css';

let randomIdgenerate=()=>{
	return Math.round(Math.random()*10000);
}

const FaceRecognition=({box,imageurl})=>{

	let boxeElements=[];
	for(let coordObj of box){

		boxeElements.push(<div key={randomIdgenerate()} className='bounding-box' style={{left: coordObj.leftcol,top: coordObj.toprow,right:coordObj.rightcol,bottom: coordObj.bottomrow }}></div>)

	}

	return(

		<div className='center ma'>

			

			<div className=' absolute mt2'>
			<img alt='' id="inputimage" style={{width:700,height:'auto'}} src={imageurl}/>
			


			{boxeElements}
			</div>

		</div>

		);
}

export default FaceRecognition;