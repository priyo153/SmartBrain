import React from 'react';

class Register extends React.Component{

constructor(){
	super();

	this.state={
		email: '',
		password: '',
		name: '',
		error:false
	}
}

onNameChange=(event)=>{
	this.setState({name: event.target.value});
}

onEmailChange=(event)=>{
	this.setState({email: event.target.value});
}

onPasswordChange=(event)=>{
	this.setState({password: event.target.value});
}

onSubmitSignIn=()=>{
	if( this.state.email!=='' && this.state.password !=='' && this.state.name!==''){

		fetch('http://localhost:8080/register',{
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})

		})
		.then(data=>{

			if(data.status===200)
				this.props.onRouteChange('signin');
			else{


				this.setState({
					email:'',
					password:'',
					name:'',
					error:true
				});

			document.querySelector('#email-address').value='';
			document.querySelector('#password').value='';
			document.querySelector('#name').value='';
			}




		});





	}
	else{

		this.setState({error:true});
	}




	

}
render(){
	
	let errormsg=''

		if(this.state.error===true)
			errormsg=<h1 className='red f5'>Error registering. Try again....</h1>;


		
	return(

		<div>

		<nav style={{display:'flex', justifyContent: 'flex-end'}}>
			<p onClick={()=>this.props.onRouteChange('signin')} className='f3 dim link black underline pa3 pv1 pointer'>Sign In</p>
		</nav>

		<article className="br5 ba shadow-5  b--black-10 mv2 w-100 w-50-m w-25-l mw6 center">
		<main className="pa4 black-80">
		  <div className="measure pa4">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Register</legend>
		      {errormsg}
		
		      <div className="mt3">

		        <label className="db fw6 lh-copy f6" htmlFor="Name" >Name</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange={this.onNameChange}
		        />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange={this.onEmailChange}
		        />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input 
		        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password"
		        onChange={this.onPasswordChange}		        
		        />
		      </div>
		    </fieldset>
		    <div >
		      <input 
		      className=" ph3 grow pv2 input-reset ba b--black bg-transparent pointer f4 fw8 dib" 
		      type="submit" 
		      onClick={this.onSubmitSignIn} 
		      value="Register"/>
		    </div>

		  </div>

	
		</main>
		</article>

</div>
			

			

	

		);
	}

}

export default Register;