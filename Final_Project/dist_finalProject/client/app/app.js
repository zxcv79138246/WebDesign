'use strict';

angular.module('finalProjectApp', ['finalProjectApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'wu.masonry', 'LocalStorageModule']).config(function ($urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  localStorageServiceProvider.setPrefix('finalProjectApp').setStorageType('sessionStorage').setNotify(true, true);
});
//# sourceMappingURL=app.js.map

'use strict';

angular.module('finalProjectApp.util', []);
//# sourceMappingURL=util.module.js.map

"use strict";

(function (angular, undefined) {
	angular.module("finalProjectApp.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

angular.module('finalProjectApp').filter('dateOnly', ['$filter', function ($filter) {
  return function (input) {
    return $filter('date')(new Date(input), 'yyyy-MM-dd');
  };
}]);
//# sourceMappingURL=dateOnly.filter.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var LoginComponent = function () {
    function LoginComponent($scope, localStorageService, $http, $state) {
      _classCallCheck(this, LoginComponent);

      this.$scope = $scope;
      this.localStorageService = localStorageService;
      this.$http = $http;
      this.$state = $state;
    }

    _createClass(LoginComponent, [{
      key: '$onInit',
      value: function $onInit() {
        this.api_token = this.localStorageService.get('api_token');
      }
    }, {
      key: 'login',
      value: function login() {
        var _this = this;

        if (this.email) {
          this.$http.post('http://hotel-miss.ddns.net/api/v1/login', {
            email: this.email,
            password: this.password
          }).then(function (response) {
            _this.localStorageService.set('api_token', response.data.api_token);
            _this.api_token = _this.localStorageService.get('api_token');

            if (_this.api_token) {
              _this.$state.transitionTo('main');
            } else {
              swal({
                title: '帳號或密碼錯誤',
                type: 'error'
              });
            }
          }).catch(function (response) {
            swal({
              title: '帳號或密碼錯誤',
              type: 'error'
            });
          });
        }
      }
    }]);

    return LoginComponent;
  }();

  angular.module('finalProjectApp').component('login', {
    templateUrl: 'app/login/login.html',
    controller: LoginComponent
  });
})();
//# sourceMappingURL=login.controller.js.map

'use strict';

angular.module('finalProjectApp').config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<login></login>'
  });
});
//# sourceMappingURL=login.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, localStorageService) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.showModal = 0;
      this.localStorageService = localStorageService;
      console.log(this.api_token);
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('http://hotel-miss.ddns.net/api/v1/posts').then(function (response) {
          console.log(response.data);
          _this.posts = response.data;
        });
        this.api_token = this.localStorageService.get('api_token');
      }
    }, {
      key: 'publish',
      value: function publish() {
        var _this2 = this;

        if (!this.name) {
          this.name = "匿名";
        }
        if (this.body) {
          this.$http.post('http://hotel-miss.ddns.net/api/v1/posts', {
            name: this.name,
            body: this.body
          }).then(function (response) {
            _this2.$http.get('http://hotel-miss.ddns.net/api/v1/posts').then(function (response) {
              _this2.posts = response.data;
            });
          });
        }
        this.name = null;
        this.body = null;
      }
    }, {
      key: 'showPostModal',
      value: function showPostModal(postID) {
        var _this3 = this;

        this.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID).then(function (response) {
          _this3.postDetail = response.data;
          _this3.postDetail.created_at = new Date('yyyy-MM-dd');
        });

        this.showModal = 1;
      }
    }, {
      key: 'deletePost',
      value: function deletePost(postID) {
        var _this4 = this;

        this.$http.delete('http://hotel-miss.ddns.net/api/v1/posts/' + postID, {
          params: {
            api_token: this.api_token
          }
        }).then(function (response) {
          _this4.$http.get('http://hotel-miss.ddns.net/api/v1/posts').then(function (response) {
            _this4.posts = response.data;
          });
        });
      }
    }, {
      key: 'addComment',
      value: function addComment(postID) {
        var _this5 = this;

        if (!this.commentName) {
          this.commentName = "匿名";
        }
        if (this.commentBody) {
          this.$http.post('http://hotel-miss.ddns.net/api/v1/comments', {
            name: this.commentName,
            body: this.commentBody,
            post_id: postID
          }).then(function (response) {
            _this5.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID).then(function (response) {
              _this5.postDetail = response.data;
              _this5.postDetail.created_at = new Date('yyyy-MM-dd');
            });
          });
        }

        this.commentBody = null;
      }
    }, {
      key: 'deleteComment',
      value: function deleteComment(commentID, postID) {
        var _this6 = this;

        this.$http.delete('http://hotel-miss.ddns.net/api/v1/comments/' + commentID, {
          params: {
            api_token: this.api_token
          }
        }).then(function (response) {
          _this6.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID).then(function (response) {
            _this6.postDetail = response.data;
            _this6.postDetail.created_at = new Date('yyyy-MM-dd');
          });
        });
      }
    }]);

    return MainController;
  }();

  angular.module('finalProjectApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('finalProjectApp').config(function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
});
//# sourceMappingURL=main.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var RegistComponent = function () {
    function RegistComponent($http) {
      _classCallCheck(this, RegistComponent);

      this.$http = $http;
    }

    _createClass(RegistComponent, [{
      key: 'regist',
      value: function regist() {
        var _this = this;

        if (this.name && this.email && this.password && this.passwordConfirm) {
          this.$http.post('http://hotel-miss.ddns.net/api/v1/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirm
          }).then(function (response) {
            console.log(response.status);
            if (response.status == 200) {
              swal({
                title: '管理員' + _this.name + '註冊成功',
                type: 'success'
              });
            }
          }).catch(function (response) {
            swal({
              title: 'email格式不正確 or 驗證密碼不同',
              type: "error"
            });
          });
        } else {
          swal({
            title: '資料不完整',
            type: 'error'
          });
        }
      }
    }]);

    return RegistComponent;
  }();

  angular.module('finalProjectApp').component('regist', {
    templateUrl: 'app/regist/regist.html',
    controller: RegistComponent
  });
})();
//# sourceMappingURL=regist.controller.js.map

'use strict';

angular.module('finalProjectApp').config(function ($stateProvider) {
  $stateProvider.state('regist', {
    url: '/regist',
    template: '<regist></regist>'
  });
});
//# sourceMappingURL=regist.js.map

'use strict';

angular.module('finalProjectApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var NavbarController = function () {
    function NavbarController($http, localStorageService, $state) {
      _classCallCheck(this, NavbarController);

      this.isCollapsed = false;
      this.$http = $http;
      this.localStorageService = localStorageService;
      this.$state = $state;
      this.navClass = "nav-collapse";
      this.hamburgerClass = "navbar-toggle nav-hamburger";
    }

    _createClass(NavbarController, [{
      key: "$onInit",
      value: function $onInit() {
        this.api_token = this.localStorageService.get('api_token');
      }
    }, {
      key: "logout",
      value: function logout() {
        var _this = this;

        swal({
          title: "確定登出",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "登出",
          cancelButtonText: "取消"
        }, function (isConfirm) {
          if (isConfirm) {
            _this.localStorageService.set('api_token', null);
            _this.api_token = _this.localStorageService.get('api_token');
            _this.$state.reload();
          }
        });
      }
    }, {
      key: "clickHamburger",
      value: function clickHamburger() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          this.navClass = "nav-collapse nav-collapse-appear";
          this.hamburgerClass = "navbar-toggle nav-hamburger nav-hamburger-active";
        } else {
          this.navClass = "nav-collapse";
          this.hamburgerClass = "navbar-toggle nav-hamburger";
        }
      }
    }]);

    return NavbarController;
  }();

  //end-non-standard

  angular.module('finalProjectApp').controller('NavbarController', NavbarController);
})();
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('finalProjectApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});
//# sourceMappingURL=navbar.directive.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */

      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },


      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },


      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          var hostnameCheck = url.hostname === o.hostname;
          var protocolCheck = url.protocol === o.protocol;
          // 2nd part of the special treatment for IE fix (see above):
          // This part is when using well-known ports 80 or 443 with IE,
          // when $window.location.port==='' instead of the real port number.
          // Probably the same cause as this IE bug: https://goo.gl/J9hRta
          var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port === '443');
          return hostnameCheck && protocolCheck && portCheck;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('finalProjectApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map

angular.module("finalProjectApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/login/login.html","<div class=\"login\">\n  <div class=\"login-input\">\n    <div class=\"row\">\n      <label for=\"account\">Email：</label>\n      <input type=\"text\" id=\"account\" ng-model=\"$ctrl.email\">\n    </div>\n    <div class=\"row\">\n      <label for=\"password\">密碼：</label>\n      <input type=\"password\" id=\"password\" ng-model=\"$ctrl.password\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <button class=\"btn btn-default\" ng-click=\"$ctrl.login()\">登入</button>\n  </div>\n</div>\n");
$templateCache.put("app/main/main.html","<div class=\"main\">\n  <div class=\"container\">\n    <div class=\"row publish-div\">\n      <div class=\"publish col-xs-12 col-md-8 border-slive\">\n        <div class=\"publich-name\">\n          <label for=\"name-input\">稱呼：</label>\n          <input type=\"text\" id=\"name-input\" placeholder=\"匿名\" ng-model=\"$ctrl.name\">\n        </div>\n        <textarea name=\"\" id=\"\"  rows=\"5\" class=\"border-slive\" placeholder=\"我想說些話!!\" ng-model=\"$ctrl.body\"></textarea>\n        <button class=\"btn btn-primary\" ng-click=\"$ctrl.publish()\">發布</button>\n      </div>\n    </div>\n\n    <div class=\"row article-div\">\n      <div masonry class=\"masonry\">\n        <div class=\"masonry-brick col-xs-12 col-sm-6 col-md-4\" ng-repeat=\"post in $ctrl.posts\">\n          <div class=\"item border-slive\">\n            <i class=\"fa fa-times fa-2x\" aria-hidden=\"true\" ng-click=\"$ctrl.deletePost(post.id)\" ng-if=\"$ctrl.localStorageService.get(\'api_token\')\"></i>\n            <div class=\"post-name\">\n              <h3>{{post.name}}</h3>\n            </div>\n            <div class=\"post-body\">\n              <p>{{post.body}}</p>\n            </div>\n            <div class=\"more\">\n              <div class=\"time\">\n                <label>{{post.created_at | dateOnly}}</label>\n              </div>\n              <button class=\"btn btn-black\" ng-click=\"$ctrl.showPostModal(post.id)\">\n                <span>更多及評論</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"back-black\" ng-if=\"$ctrl.showModal\" ng-click=\"$ctrl.showModal = 0\"></div>\n  <div class=\"info-modal border-slive\" ng-if=\"$ctrl.showModal\">\n    <div class=\"post-name\">\n      <h2>{{$ctrl.postDetail.name}}</h2>\n    </div>\n    <div class=\"post-body\">\n      <p>{{$ctrl.postDetail.body}}</p>\n    </div>\n    <div class=\"add-comment border-slive\">\n      <input type=\"text\" placeholder=\"匿名\" class=\"border-slive col-sm-2 col-xs-4\" ng-model=\"$ctrl.commentName\">\n      <textarea  rows=\"1\" class=\"border-slive col-sm-8 col-xs-12\" ng-model=\"$ctrl.commentBody\"></textarea>\n      <button class=\"btn btn-black\" ng-click=\"$ctrl.addComment($ctrl.postDetail.id)\">\n        <span>送出</span>\n      </button>\n    </div>\n    <div class=\"all-comments\">\n      <div class=\"comment-item border-slive\" ng-repeat=\"comment in $ctrl.postDetail.comments\">\n        <label class=\"col-xs-2\">{{comment.name}}</label>\n        <label class=\"col-xs-9\">{{comment.body}}</label>\n        <i class=\"fa fa-times col-xs-1\" aria-hidden=\"true\" ng-click=\"$ctrl.deleteComment(comment.id, comment.post_id)\" ng-if=\"$ctrl.localStorageService.get(\'api_token\')\"></i>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n");
$templateCache.put("app/regist/regist.html","<div class=\"regist\">\n  <div class=\"regist-input\">\n    <div class=\"row\">\n      <label for=\"name\">姓名：</label>\n      <input type=\"text\" id=\"name\" ng-model=\"$ctrl.name\">\n    </div>\n    <div class=\"row\">\n      <label for=\"account\">Email：</label>\n      <input type=\"text\" id=\"account\" ng-model=\"$ctrl.email\">\n    </div>\n    <div class=\"row\">\n      <label for=\"password\">密碼：</label>\n      <input type=\"password\" id=\"password\" ng-model=\"$ctrl.password\">\n    </div>\n    <div class=\"row\">\n      <label for=\"passwordConfirm\">再輸入一次密碼：</label>\n      <input type=\"password\" id=\"passwordConfirm\" ng-model=\"$ctrl.passwordConfirm\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <button class=\"btn btn-default\" ng-click=\"$ctrl.regist()\">註冊</button>\n  </div>\n</div>\n");
$templateCache.put("components/footer/footer.html","<div class=\"container\">\n  <p>© Design By  郭鎧瑋 丁偉哲 劉至峻 鄭宇傑 </p>\n</div>\n");
$templateCache.put("components/navbar/navbar.html","<div class=\"navbar navbar-default navbar-static-top\" ng-controller=\"NavbarController\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button ng-class=\"nav.hamburgerClass\" type=\"button\" ng-click=\"nav.clickHamburger()\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"/\" class=\"navbar-brand\">酒店小姐辛酸血淚史</a>\n    </div>\n    <div ng-class=\"nav.navClass\" id=\"navbar-main\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"nav-item\">\n          <a ui-sref=\"main\" ng-click=\"nav.clickHamburger()\">關於我們</a>\n        </li>\n        <li class=\"nav-item\" ng-if=\"nav.localStorageService.get(\'api_token\')\">\n          <a ui-sref=\"regist\" ng-click=\"nav.clickHamburger()\">新增管理員</a>\n        </li>\n        <li  class=\"nav-item\" ng-if=\"!nav.localStorageService.get(\'api_token\')\">\n          <a ui-sref=\"login\" ng-click=\"nav.clickHamburger()\">登入</a>\n        </li>\n        <li class=\"nav-item\" ng-if=\"nav.localStorageService.get(\'api_token\')\">\n          <a ui-sref=\"main\"  ng-click=\"nav.logout()\">登出</a>\n        </li>\n      </ul>\n    </div>\n\n    <div class=\"black-back\" ng-if=\"nav.isCollapsed\" ng-click=\"nav.clickHamburger()\"></div>\n  </div>\n</div>\n");}]);