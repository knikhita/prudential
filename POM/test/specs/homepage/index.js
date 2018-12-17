const Homepage = require('../pages/home.page')
const SearchCity = require('../pages/searchcity.page')
const chai = require('chai'),
    	expect = chai.expect,
    	should = chai.should();

			beforeEach(function() {
				const b = browser
	 		 b.windowHandleSize({width:1280,height:800});
	 });

describe('Open Weather Map > Home Page Test cases :  ', ()=>{

	context('verify header options : ', ()=>{
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

	context('verify buttons available : ', ()=>{
		it('Try Free Apis button should be available',()=>{
			Homepage.tryFreeApis.click();
		})
		it('Connect the WeatherStation to OWM button should be present',()=>{
			Homepage.connectWeatherStation.click();
		})
  })
})

describe('Open Weather Map > Search City Test cases :  ', ()=>{

	context('Search Invalid City  : ', ()=>{
		it('from search option 1 : Header search',()=>{
			SearchCity.search1();
			searchResult = 'Not found'
			expect('div#forecast-list.tab-pane.active').to.have.text('searchResult')
		})
  })

	context('Search Valid City  : ', ()=>{
		it('from search option 2 : Main body',()=>{
			SearchCity.search2();
			searchResult = cityData.validCity
			expect('table.table').to.be.there()
		})
		it('autosuggestion dropdown should be shown',()=>{
			SearchCity.search2();
			searchResult = cityData.validCity

		})
  })

	context('Current location : ', ()=>{
		it('should ask for location permission',()=>{
			SearchCity.currentLocation().click();
			expect('.widget__layout').to.have.text('allow Geo location access')
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
