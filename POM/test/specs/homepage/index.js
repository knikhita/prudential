const assert = require('chai').assert
const Homepage = require('../pages/home.page')
const SearchCity = require('../pages/searchcity.page')

const b = browser
b.windowHandleSize({width:1280,height:800});

describe('Open Weather Map > Home Page Test cases :  ', ()=>{

	describe('verify header options : ', ()=>{
		it('Header containing menu should be available',()=>{
			Homepage.headerMenu.isVisible();
		})
		it('logo should be present',()=>{
			Homepage.logo.isVisible();
		})
		it('Weather tab should be present & clickable',()=>{
			Homepage.weatherOption.isVisible();
			Homepage.weatherOption.click();
		})
		it('Map dropdown should be present & clickable',()=>{
			Homepage.maps.isVisible();
			Homepage.maps.click();
		})
		it('API tab should be present & clickable',()=>{
			Homepage.api.isVisible();
			Homepage.api.click();
		})
		it('supportCenter option should be present & clickable',()=>{
			Homepage.supportCenter.isVisible();
			Homepage.supportCenter.click();
		})
  })

	describe('verify buttons available : ', ()=>{
		it('Try Free Apis button should be available',()=>{
			Homepage.tryFreeApis.click();
		})
		it('Connect the WeatherStation to OWM button should be present',()=>{
			Homepage.connectWeatherStation.click();
		})
  })
})

describe('Open Weather Map > Search City Test cases :  ', ()=>{

	describe('Search Invalid City  : ', ()=>{
		it('from search option 1 : Header search',()=>{
			SearchCity.search1();
			searchResult = 'Not found'
			expect('div#forecast-list.tab-pane.active').to.have.text('searchResult')
		})
  })

	describe('Search Valid City  : ', ()=>{
		it('from search option 2 : Main body',()=>{
			SearchCity.search2();
			searchResult = cityData.validCity
			expect('table.table').to.be.there()
		})
  })
})

describe('Open Weather Map > Widget constructor Tests :  ', ()=>{
	it('Validation error on API KEY field',()=>{
		Homepage.apiKey();
		valError = 'Validation error'
		expect('span#error-key.widget-form--error').to.have.text('valError')

	})
	it('Select Types of widget',()=>{
		Homepage.widgetOptions();
	})

})
