var assert = require('assert')
var expect = require('expect')
var superagent = require('superagent')
var should = require('should')
var scurve = require('../reports/scurve')


var expectedScurve = [
{ day: "1/11/2015", tc: 0},
{ day: "2/11/2015", tc: 1},
{ day: "3/11/2015", tc: 2},
{ day: "4/11/2015", tc: 5},
{ day: "5/11/2015", tc: 10},
{ day: "6/11/2015", tc: 19},
{ day: "7/11/2015", tc: 33},
{ day: "8/11/2015", tc: 49},
{ day: "9/11/2015", tc: 65},
{ day: "10/11/2015",tc: 78},
{ day: "11/11/2015",tc: 87},
{ day: "12/11/2015",tc: 93},
{ day: "13/11/2015",tc: 96},
{ day: "14/11/2015",tc: 98},
{ day: "15/11/2015",tc: 99}
]
//////////////////// SCURVE Projection
describe('reporting/api/alfresco/:version/scurve/:startDate/:endDate/:totalTC',function(done){
    it('Should get array of scurve projection based on start date,end date and total test cases', function(done) {
      this.timeout(15000); // Setting a longer timeout
      var curve = scurve.getScurve('1/11/2015','15/11/2015',100)
      expect(expectedScurve).toEqual(curve)
      done()
    })
})
