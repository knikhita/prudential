const CustomReporter = require('./reporter/my.custom.reporter')
const Octokat = require('octokat')

exports.config = {

    /**
     * server configurations
     */
    host: '0.0.0.0',
    port: 4444,

    branch : process.env.BRANCH,

    /**
     * specify test files
     */
    specs: [
        './test/desktop/**/*.js'
    ],
    /**
     * capabilities
     */
    capabilities: [{
        browserName: 'chrome'
    }],

    /**
     * test configurations
     */
    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: 'errorShots',
    baseUrl: process.env.URL,
    waitforTimeout: 500000,
    framework: 'mocha',

    reporters: [CustomReporter.reporter, 'dot'],
    reporterOptions: {
        outputDir: './'
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 500000
    },

    gitOpts: {
        token : '2b618132f2b8cdc37713ab17732d98a556fecb07',
        repo  : process.env.REPO

    },

    onComplete: function() {
        return new Promise((resolve, reject) => {
            // console.log('rep : ',CustomReporter.getReport())
            // resolve()
            const repoName = process.env.REPO
            const prNum = process.env.PR
            const repo = new Octokat({token: '2b618132f2b8cdc37713ab17732d98a556fecb07'}).repos('prudential', repoName)
            let issuePromise
            if(prNum){
                issuePromise = repo.issues(prNum).comments.create({
                    body : CustomReporter.getReport()
                })
            }else if(CustomReporter.isTestsFailing()){
                console.log('Tests are failing, creating issue...')
                issuePromise = repo.issues.create({
                    title : 'Tests failing for ['+repoName+' - '+process.env.BRANCH+']',
                    body : CustomReporter.getReport(),
                    assignee : 'knikhita',
                    labels : ['has-issues']
                })
            }
            issuePromise.then((res) => {
                console.log('posted report on PR...')
                resolve()
            },(err) => {
                console.log('failed to create report on Git...',err)
                resolve()
            })
        })
    }
};
