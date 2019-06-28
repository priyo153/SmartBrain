const handleProfie=(req,res,db)=>{

	let {id}=req.params;
	let found=false;

	db.select().from('users').where({id:id})
	.then(data=>{
		if(data.length){
			console.log(data);
			res.status(200).json("found");
		}
		else{
			console.log(data);
			res.status(400).json("not found");
		}

	});
}

module.exports={
	handleProfie:handleProfie
}