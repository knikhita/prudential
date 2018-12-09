"use strict";
const assert = require('assert')
const SearchCity = require('./searchcity.page.js')
const b = browser

class Homepage {
	open(path) {
		b.url('/'+path)
	}
	// Verifies that all important information is there

 // verify header options
	get headerMenu(){return b.element('.nav.navbar-nav.navbar-right')}
	get logo() {return b.element('.navbar-brand')}
	get weatherOption() {return b.element('.nav.navbar-nav.navbar-right:eq(0)')}
	get maps() {return b.element('.nav.navbar-nav.navbar-right:eq(1)')}
	get api() {return b.element('.nav.navbar-nav.navbar-right:eq(2)')}
	get supportCenter() {return b.element('.fa.fa-envelope')}

  // verify buttons available on Homepage
	get tryFreeApis(){return b.element('.btn.btn-orange:eq(6)')}
	get connectWeatherStation() {return b.element('.btn.btn-orange:eq(7)')}

	// verify widget constructor : this is for 4th question mentioned in assignment
	get apiKeyEnter(){return b.element('#api-key')}
	get widgetOption(){return b.element('.nav__item:eq(6)')}
	get typesOfWidget1() {return b.element('.widget-choose__item:eq(0)')}
	get typesOfWidget2() {return b.element('.widget-choose__item:eq(1)')}
	get typesOfWidget3() {return b.element('.widget-choose__item:eq(2)')}

 // perform widget option selection
	widgetOptions() {
	this.typesOfWidget1.click()
	b.pause(1000)
	this.typesOfWidget2.click()
	b.pause(1000)
	this.typesOfWidget3.click()
}

 // perform api key validation
 	apiKey() {
		this.apiKeyEnter.click()
		this.apiKeyEnter().setValue('123456')
		this.search3()
 }
}
module.exports = new Homepage()
