"use strict";
const b = browser
const cityData= {
  invalidCity : 'mum',
  validCity : 'Mumbai'
}

class SearchCity{

  // Search option from : weather in your city
  get searchNavItem() {return b.element('#nav-search.pull-right') }
  get searchText1() {return b.element('#q.form-control') }
  get submit1() {return b.element('.input-group-btn')}

  // Search option from : main body of the page
  get searchText2() {return b.element('#q.form-control.border-color.col-sm-12') }
  get submit2() {return b.element('.btn.btn-orange:eq(0)')}

  // Search city option from : widgets-constructor
  get searchAPIKeyCity() {return b.element('#search-city') }
  get submit3() {return b.element('#search-city.container-custom-card__btn-search')}

  // complete search functionality
  search1() {
    this.searchNavItem.click();
    this.searchText1().setValue(cityData.invalidCity)
    this.submit1.click();
  }
  search2() {
    this.searchText2().setValue(cityData.validCity)
    this.submit2.click();
  }
  search3(){
    this.searchAPIKeyCity.click();
    this.searchAPIKeyCity().setValue(cityData.validCity)
    this.submit3.click();
   }
}

module.exports = new SearchCity
