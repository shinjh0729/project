var add = function(req, res) {
	console.log('lunch 모듈 안에 있는 add 호출됨.');
 
    var paramName = req.body.name || req.query.name;
    var paramPrice = req.body.price || req.query.price;
	
    console.log('요청 파라미터 : ' + paramName + ', ' + paramPrice );
	
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		addLunchShop(database, paramName, paramPrice, function(err, result) {
			if (err) {
                console.error('가게 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>가게 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (result) {
				console.dir(result);

                res.redirect('/process/listpost');

			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>가게 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

var list = function(req, res) {
	console.log('lunch 모듈 안에 있는 list 호출됨.');
 
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 모든 가게 검색
		database.LunchModel.findAll(function(err, results) {
			if (err) {
                console.error('가게 리스트 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>가게 리스트 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			  
			if (results) {
				console.dir(results);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>가게 리스트</h2>');
				res.write('<div><ul>');
				
				for (var i = 0; i < results.length; i++) {
					var curName = results[i]._doc.name;
					var curPrice = results[i]._doc.price;
					
					res.write('    <li>#' + i + ' : ' + curName + ', ' + curPrice + '</li>');
				}	
			
				res.write('</ul></div>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>가게 리스트 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

// 추가하는 함수
var addLunchShop = function(database, name, price, callback) {
	console.log('addLunchShop 호출됨.');
	
	// LunchModel 인스턴스 생성
	var lunchshops = new database.LunchModel(
			{name:name, price:price}
		);

	// save()로 저장
	lunchshops.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("가게 데이터 추가함.");
	    callback(null, lunchshops);
	     
	});
}

var order = function(req, res) {
	console.log('lunch 모듈 안에 있는 order 호출됨.');
	
	var paramuse = req.body.username || req.query.username;
    var paramorder = req.body.order || req.query.order;
    var paramaddress = req.body.address || req.query.address;
	var paramphone = req.body.phone || req.query.phone;
	
    console.log('요청 파라미터 : ' + paramuse + ', ' + paramorder + ', ' + paramaddress + ', ' + paramphone );
	
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		addorder(database, paramuse, paramorder, paramaddress,  paramphone, function(err, result) {
			if (err) {
                console.error('주문 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>주문 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (result) {
				console.dir(result);

                res.redirect('/');

			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>주문 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

// 추가하는 함수
var addorder = function(database, username, order, address, phone, callback) {
	console.log('addorder 호출됨.');
	
	// LunchModel 인스턴스 생성
	var orders = new database.PostModel(
			{username:username, order:order, address:address, phone:phone}
		);

	// save()로 저장
	orders.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("가게 데이터 추가함.");
	    callback(null, orders);
	     
	});
}

module.exports.add = add;
module.exports.list = list;
module.exports.order = order;