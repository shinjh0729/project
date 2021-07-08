
var Schema2 = {};

Schema2.createSchema = function(mongoose) {
    var LunchSchema = mongoose.Schema({
        name : {type : String, index : 'hashed', 'default' : ''},
        price : {type : String, 'default' : ''},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
    });

    LunchSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });

    LunchSchema.statics = {
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

    console.log('LunchSchema 정의함.');

	return LunchSchema;
}

module.exports = Schema2;