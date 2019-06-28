const handleSignin=(req,res,db,bcrypt)=>{

try{

	let {email,password}=req.body;

	if(!email || !password)
		throw "blank input";

	let notfound=true;
	db.select()
	.from('login')
	.where({
		email:email
	})
	.then(data=>{

		if(data.length && bcrypt.compareSync(password, data[0].hash )){
				

				db.select('id','name','entries')
				.from('users')
				.where({
					email:data[0].email
				})
				.then(userdata=>{
					res.status(200).json({
						id: userdata[0].id,
						name: userdata[0].name,
						entries: userdata[0].entries,

					});

				});
			}
		
		else{
			throw "not found";
		}
		
	});







}
catch(err){
	console.log(err);
	res.status(400).json("not found");
}


}

module.exports={
	handleSignin: handleSignin
}