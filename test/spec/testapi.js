var request = require('superagent');
var assert = require('assert');
var SessionID = null;

before(function(done) {
    require('../../start_server').StartServer();
    // done();
});

describe('Test API', function() {
  // Test #1
  describe('200 response check', function() {
    it('should get a 200 response', function(done) {
      request.get('http://127.0.0.1:3000/hello/world')
      .end(function(err, res) {
        assert.ifError(err);
        if (res.statusCode != 200) {
            throw new Error('invalid response from /hello/world');
        }
        done();
      });
    });
  });

  describe('user authentication', function(){
    it('should authenticate a user', function(done){
      request
      .post('http://127.0.0.1:3000/auth/signin')
      .send({ username: 'jasonv', password: 'jasonv' })
      .set('Accept', 'application/json')
      .end(function(err, res){
        var data = res.body;
        SessionID = data.sid;
        done();
      });
    });

    it('should request user information in /user/me', function(done){
      console.log("SESSION ID: "+ SessionID);
      request
      .get('http://127.0.0.1:3000/user/me')
      .set('session-id', SessionID)
      .set('Accept', 'application/json')
      .end(function(err, res){
        done();
      });
    });
  });
  // Add more tests as needed...
});
