import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import particle from './particle-config.json';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
const  particleparam=particle;


const initialState={
     input:'',
     imageurl:'',
     box:[],
     peopleCount:0,
     route:'signin',
     SignedIn: false,

     user:{
        id:'',
        name:'',
        entries:''

     }

    }
class App extends Component {

 constructor(){
  super();
    this.state=initialState;
 }

 setUserInfo=(user)=>{

  this.setState({user:user});
 }

 componentDidMount(){
  fetch('http://localhost:8080')
  .then(res=>res.json())
  .then(data=>{
    if(data==='ok'){
      console.log("server has responded");
    }
  })
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
 
  this.setState({
    imageurl: event.target.value,
    box:[]

  });
  


 }

 onRouteChange=(route)=>{

  if(route==='signin')
    this.setState(initialState);
  else if(route=== 'home')
    this.setState({SignedIn:true});
  this.setState({route:route});

}

 onSubmit=()=>{
 
  fetch("http://localhost:8080/imageurl",{
    method: "post",
    headers: {'content-type' :'application/json'},
    body: JSON.stringify({input:this.state.imageurl})
        
  })
  .then(response=>response.json())
  .then(data=> {
    this.displayFaceBox(this.calculateFaceLocation(data));

    if(data){
      fetch("http://localhost:8080/image",{
        method: "post",
        headers: {'content-type' :'application/json'},
        body: JSON.stringify({id:this.state.user.id})
        })
      .then(res=>res.json())
      .then(data=>{

        this.setState({
          user:data
        });
      })

      document.querySelector("input").value='';
      }

    })
    .catch(err=>console.log(err));


 }

 
  render(){
    let x=null;

            if(this.state.route==='signin'){

             x=
                <Signin 
                onRouteChange={this.onRouteChange}
                setUserInfo={this.setUserInfo} />
                
              ;

            }
            else if(this.state.route==='register'){

             x=
               <Register 
               onRouteChange={this.onRouteChange} />
              ;
            }
            else if(this.state.SignedIn===true){

             x=

              <div>

                <Navigation onRouteChange={this.onRouteChange}/>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit}
                peopleCount={this.state.peopleCount}
                />
                <FaceRecognition box ={this.state.box} imageurl={this.state.imageurl}/> 
                
              </div>

              ;
           }

      return (

        <div className="App">

          <Particles className='particle' params={particleparam} />
          {x}

          </div>
        );

    }
  }
               


  



export default App;
