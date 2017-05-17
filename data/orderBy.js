
exports.data = function(){
    return [
        {
            route: '/html',
            handle: function(req,res,next){
                res.writeHead(200,{
                    "content-type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": '*'
                });
                var data = [
                    {
                        "id": 168523867,
                        "model": "iphone",
                        "money": "8565"
                    },
                    {
                        "id": 2526582,
                        "model": "iphone4",
                        "money": "6385"
                    },{
                        "id": 8362853,
                        "model": "iphone6",
                        "money": "3558"
                    },{
                        "id": 38634,
                        "model": "iphone5",
                        "money": "5868"
                    }
                ];
                res.write(JSON.stringify(data));
                res.end();
            }
        }
    ]
};


