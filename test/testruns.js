var assert = require('assert')
var expect = require('expect')
var superagent = require('superagent')
var should = require('should')
var app = require('../app')
var config = require('../config')
var db = require('mongoskin').db(config.mongo, {safe:true})

before(function(done){
    db.open(function(err, db) {
        db.collection('testruns').drop()
        db.collection('testruns').ensureIndex({name:1}, {unique:true},function(err,res){
            done()
        })
    })
})
var testName = "mytest";
var data = {"name":testName,
            "startDate":"12/11/2100",
            "endDate": "12/12/2100",
            "targetDate" : null,
            "tc" : 1000}

describe('A test run is the data relating to the execution rate of tests per day until complete.' ,function(done){
    it('Should create and store a test run',function(done){
        superagent.post('http://localhost:3000/reporting/api/testruns/')
        .set("Content-Type","application/json")
        .send(data).end(function(err, res){
            assert(res.status === 200)
            var json = res.body
            json.should.have.property('error')
            assert(json.error === false)
            done()
        })
    })
    it('Should get a test run',function(done){
        superagent.get('http://localhost:3000/reporting/api/testruns/' + testName).end(
            function(error,res){
                var json = res.body
                assert(res.status === 200)
                json.should.have.property('name')
                assert(json.name === testName)
                json.should.have.property('startDate')
                assert(json.startDate === '12/11/2100')
                json.should.have.property('endDate')
                assert(json.endDate === '12/12/2100')
                json.should.have.property('tc')
                    assert(json.tc === 1000)
                json.should.have.property('state')
                assert(json.state === 'ready')
                json.should.have.property('entries')
                assert(json.entries.length === 0)
                json.should.not.have.property('targetDate')
                done()
            })
    })
    it('Should not allow to create a test run that already exists',function(done){
        superagent.post('http://localhost:3000/reporting/api/testruns/')
        .set("Content-Type","application/json")
        .send(data).end(function(err, res){
            assert(res.status === 200)
            var json = res.body
            json.should.have.property('error')
            assert(json.error === true)
            done()
        })
    })
    it('Should delete a test run',function(done){
        db.open(function(err, db) {
            db.collection('testruns', {}, function(err, testruns) {
                var q = {"name":testName}
                testruns.find(q, function(err,result){
                    should.exist(result)
                    superagent.del('http://localhost:3000/reporting/api/testruns/'+ testName).end(function(err,res){
                        testruns.findOne(q,function(err,result){
                            should.not.exist(result)
                            done()
                        })
                    })
                })
            })
        })
    })
    // it('Should allow update', function(done){
    //
    // })
})