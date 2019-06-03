import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import particle from './particle-config.json';
import Clarifai from 'clarifai';

const  particleparam=particle;
const app = new Clarifai.App({
 apiKey: 'fa2ae7587782434c88412335ddbef736'
});

class App extends Component {

 constructor(){
  super();
  this.state={
   input:'',
   imageurl:'',
   box:[],
   peopleCount:0

  }
 }

 calculateFaceLocation=(data)=>{

  let coords=[];

  let clarifyface={};
  const image=document.getElementById("inputimage");
  const width=Number(image.width);
  const height=Number(image.height);

  for(let item of data.outputs[0].data.regions){
   clarifyface=item.region_info.bounding_box;

  coords.push(

        {
          leftcol: width*clarifyface.left_col,
          toprow: height*clarifyface.top_row,
          rightcol: width- (clarifyface.right_col*width),
          bottomrow: height - (clarifyface.bottom_row*height)
        }
    );


}

  this.setState({peopleCount: coords.length})
    return coords;
  };

    displayFaceBox=(box)=>{
      this.setState({box});
    }

 


 onInputChange=(event)=>{

  this.setState({input: event.target.value});
  


 }

 onSubmit=()=>{
  this.setState({imageurl: this.state.input});

  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err=>console.log(err));
  
 }



  render(){

      return (

        <div className="App">

          <Particles className='particle' params={particleparam} />
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onSubmit}
          peopleCount={this.state.peopleCount}
          />
          <FaceRecognition box ={this.state.box} imageurl={this.state.imageurl}/> 
               
        </div>

        );

  }

}

export default App;
