//신준혁 R07
module.exports = {
    server_port : 3000,
    db_url : 'mongodb://localhost:27017/R10_05',
    db_schemas: [
        {file: './user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'}
        , {file: './post_schema', collection:'contents', schemaName:'PostSchema', modelName:'PostModel'}
        , {file: './lunch_schema', collection:'lunchshops', schemaName:'LunchSchema', modelName:'LunchModel'}
    ],
    route_info : [
        {file:'./post', path:'/process/listpost2', method:'listpost2', type:'post'}
        ,{file:'./post', path:'/process/listpost2', method:'listpost2', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
        ,{file:'./lunchshop', path:'/process/addlunchshop', method:'add', type:'post'}	 
	    ,{file:'./lunchshop', path:'/process/listlunchshop', method:'list', type:'post'}
        ,{file:'./lunchshop', path:'/process/ordering', method:'order', type:'post'}
    ]
}