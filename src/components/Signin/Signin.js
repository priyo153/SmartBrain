import React from 'react';

class Signin extends React.Component{

	constructor(){
		super();


		this.state={
			email: '',
			password: '',
			error: false
		}
	}

	onEmailChange=(event)=>{
		this.setState({email: event.target.value});
	}

	onPasswordChange=(event)=>{
		this.setState({password: event.target.value});
	}

	onSubmitSignIn=()=>{
		fetch(this.props.ApiUrl+'signin',{
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})

		})
		.then(res=>res.json())
		.then(data=>{
			



			if(data!=="not found"){
				this.props.setUserInfo(data);
				this.props.onRouteChange('home');
			}
			else{

				document.querySelector('#email-address').value='';
				document.querySelector('#password').value='';

				this.setState({
					email:'',
					password:'',
					error:true
				});
			}




		})
		.catch(err=>console.log);




		

	}

	render(){

		let {onRouteChange}=this.props;

		let errormsg=''

		if(this.state.error===true)
			errormsg=<h3 className='red f5'>Incorrect Email or Password. Try again..</h3>;


		return(
			<div>

				<article className="br5 pa3 ba shadow-5  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa3 black-80">
				  <div className="measure pa3">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>

				      {errormsg}
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
				        
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" name="email-address"  
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
				      onClick={()=> this.onSubmitSignIn()} 
				      value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={()=> onRouteChange('register')}  className="f4 b link dim black db pointer">Register</p>
				    </div>


				  </div>


			
				</main>
				</article>

				<h3 className='ttu gray uppercase pt5'>This project was built by Priyojit Chatterjee</h3>


			</div>			

				

		

		);
	}

}

export default Signin;