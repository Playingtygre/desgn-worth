'use strict';
var userInfo = [];
var projectQuote = [];

function User(fName, lName, company, email, phone) {
  this.fName = fName;
  this.lName = lName;
  this.company = company;
  this.email = email;
  this.phone = phone;
  userInfo.push(this);
}

var basicFormEl = document.getElementById('basicForm');

function submitBasicForm(event) {
  event.preventDefault();
  var firstName = event.target.fName.value;
  var lastName = event.target.lName.value;
  var company = event.target.company.value;
  var email = event.target.email.value;
  var phone = event.target.phone.value;

  new User (firstName, lastName, company, email, phone);
  console.log(userInfo);

  event.target.fName.value = null;
  event.target.lName.value = null;
  event.target.company.value = null;
  event.target.email.value = null;
  event.target.phone.value = null;
  
  localStorage.setItem('UserOne', JSON.stringify(userInfo));
  var retrievedObject = localStorage.getItem('UserOne');
}


basicFormEl.addEventListener('submit', submitBasicForm);

function Project(projectType, pages, products, rushOrder) {
  this.projectType = projectType;
  this.pages = parseInt(pages);
  this.products = parseInt(products);
  this.rush = rushOrder;
  this.totalCost = 0;
  this.timeline = 0;
  this.calcCost = function() {
    var pagesCost = 0;
    var productsCost = 0;
    if (this.projectType === 'basic') {
      this.totalCost += 5000;
      pagesCost = (Math.ceil(this.pages / 5)) * 750;
      this.totalCost = this.totalCost + pagesCost;
    }
    if (this.projectType === 'eCommerce') {
      this.totalCost += 15000;
      pagesCost = (Math.ceil(this.pages / 5)) * 750;
      productsCost = (Math.ceil(this.products / 5)) * 750;
      this.totalCost = this.totalCost + pagesCost + productsCost;
    }
    if (this.rush === true) {
      this.totalCost = this.totalCost * 2;
    }
  };
  this.calcTime = function() {
    if (this.projectType === 'basic') {
      this.timeline = 8;
      this.timeline += (Math.ceil(this.pages / 5)) * 2;
    }
    if (this.projectType === 'eCommerce') {
      if (this.products) {
        this.timeline = 24;
        this.timeline += (Math.ceil(this.products / 5)) * 2;
      } else {
        this.timeline = 24;
      }
    }
    if (this.rush === true) {
      this.timeline = Math.ceil(this.timeline / 2);
    }
  };
  projectQuote.push(this);
}


var projectInfo = document.getElementById('projectInfo');

function submitProjectInfo(event) {
  event.preventDefault();

  var projectType = event.target.projectType.value;
  var pages = event.target.pages.value;
  var products = event.target.products.value;
  var rushOrder = event.target.rush.checked;
  console.log('rush value: ' + rushOrder);

  var newProject = new Project(projectType, pages, products, rushOrder);
  newProject.calcCost();
  newProject.calcTime();

  console.log(newProject.timeline + ' weeks');
}

function displayBreakdown() {
  var currentProject = projectQuote[0];

}

projectInfo.addEventListener('submit', submitProjectInfo);
