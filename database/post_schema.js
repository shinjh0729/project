var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var PostSchema = mongoose.Schema({
		username: {type: String, index : 'hashed', 'default':''},
	    order: {type: String, 'default':''},		
	    address: {type: String, 'default':''},		
		phone: {type: String, 'default':''},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	PostSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });

    PostSchema.statics = {
		// name로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email')
				.populate('comments.writer')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		}
	}
	console.log('PostSchema 정의함.');

	return PostSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

