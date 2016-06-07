'use strict';
(function(){

class RegistComponent {
  constructor($http) {
    this.$http = $http
  }

  regist() {
    if (this.name && this.email && this.password && this.passwordConfirm){
      this.$http.post('http://hotel-miss.ddns.net/api/v1/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      })
        .then(response => {
          console.log(response.status);
          if (response.status == 200){
            swal({
              title: '管理員' + this.name + '註冊成功',
              type: 'success'
            });
          }
        })
        .catch(response => {
          swal({
            title: 'email格式不正確 or 驗證密碼不同',
            type: "error"
          });
        });
    }else {
      swal({
        title: '資料不完整',
        type: 'error'
      })
    }
  }
}

angular.module('finalProjectApp')
  .component('regist', {
    templateUrl: 'app/regist/regist.html',
    controller: RegistComponent
  });

})();
