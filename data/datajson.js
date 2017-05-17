
exports.data = function(){
    return [
        {
            route: '/index',
            handle: function(req,res,next){
                res.writeHead(200,{
                   "content-type": "application/json;charset=utf-8",
                    "Access-Control-Allow-Origin": '*'
                });
                var data = {
                    name: "zhou",
                    age: 21,
                    address: "beijing"
                };
                res.write(JSON.stringify(data));
                res.end();
            }
        }
    ]
};


