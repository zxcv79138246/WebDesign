'use strict';
(function(){

class LoginComponent {
  constructor($scope, localStorageService, $http, $state) {
    this.$scope = $scope;
    this.localStorageService = localStorageService;
    this.$http = $http;
    this.$state = $state;
  }

  login(){
    if(this.email) {
      this.$http.post('http://hotel-miss.ddns.net/api/v1/login',{
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.localStorageService.set('api_token', response.data.api_token);
          var api_token = this.localStorageService.get('api_token');

          if (api_token) {
            this.$state.transitionTo('main')
          }
          else {
            swal({
              title: '帳號或密碼錯誤',
              type: 'error'
            });
          }
        })
    }
  }

}

angular.module('finalProjectApp')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: LoginComponent
  });

})();
