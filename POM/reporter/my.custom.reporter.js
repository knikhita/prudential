const util = require('util'),
    events = require('events'),
    _ = require('underscore')



const reportHash = {
    passed : [],
    failed : [],
    suitsPassed : []
}

const CustomReporter = function(options) {
    this.on('start', () => {
        console.log('started tests...');
        reportHash.passed.length = 0
        reportHash.failed.length = 0
    });

    this.on('test:pass', (message) => {
        reportHash.passed.push(message)
        const suitName = message.parent
        if(reportHash.suitsPassed.indexOf(suitName) === -1){
            reportHash.suitsPassed.push(message.parent)
        }
    })

    this.on('test:fail', (message) => {
        reportHash.failed.push(message)
    })

}

function isTestsFailing(){
    return Object.keys(reportHash.failed).length > 0
}

function getReport(){
    const testsPassed = Object.keys(reportHash.passed).length
    const testsFailed =Object.keys(reportHash.failed).length
    let str = '## Tests Passed : '+testsPassed+'/'+(testsPassed + testsFailed)+''
    if(testsPassed > 0){
        str += '\n'
        str += '### Test Suits passed : '
        reportHash.suitsPassed.forEach((suit, i) => {
            str+= `\n ${i+1}. ${suit}`
        })
    }
    if(testsFailed > 0){
        str += '\n'
        str += '### Test Suits failed : '
        const failedSuites = _.groupBy(reportHash.failed, (message) => { return message.parent })
        _.mapObject(failedSuites, (failedTests, suitName) => {
            str += '\n'
            str += suitName

            failedTests.forEach((message, i) => {
                str+= `\n ${i+1}. ${message.title}`
                str+= `\n err : ${message.err.stack}`
                str+= `${message.runningBrowser}`
            })
        })
    }

    return str
}


CustomReporter.reporterName = 'Custom Report'
util.inherits(CustomReporter, events.EventEmitter)

exports = module.exports = {reporter : CustomReporter, getReport, isTestsFailing};
