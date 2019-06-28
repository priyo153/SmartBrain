
const clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'fa2ae7587782434c88412335ddbef736'
});

const handleApiCall=(req,res)=>{


	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.status(200).json(data);
	})
	.catch(err=>{

		res.status(400).json("unable to work with API");
	})

}

const handleImage=(req,res,db)=>{


	let {id}=req.body;
	let found=false;



		db('users').increment('entries',1).where('id','=',id)
		.returning(['id','entries','name'])
		.then((data)=>{
			if(data.length){
			res.status(200).json(data[0]);
			}

			else{
				res.status(400).json("error");
			}
		});





}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall

}