const handleRegister=(req,res,db,bcrypt)=>{
	let {name,email,password}=req.body;

	var hash = bcrypt.hashSync(password, 10);

	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(useremail=>{

				return trx('users')
				.insert({
					name: name,
					email:useremail[0],
					joined:new Date()

				})

		})
		.then(()=>{
			trx.commit();
			res.status(200).json("ok");

		})
		.catch((err)=>{
			trx.rollback(err);
			res.status(400).json("error");
		})
	})

	
}

module.exports={
	handleRegister:handleRegister
}