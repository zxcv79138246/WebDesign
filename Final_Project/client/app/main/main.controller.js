'use strict';

(function() {

  class MainController {

    constructor($http, localStorageService) {
      this.$http = $http;
      this.showModal = 0;
      this.localStorageService = localStorageService;
      console.log(this.api_token);
    }

    $onInit() {
      this.$http.get('http://hotel-miss.ddns.net/api/v1/posts')
        .then(response => {
          console.log(response.data);
          this.posts = response.data;
        });
      this.api_token = this.localStorageService.get('api_token');
    }

    publish() {
      if (!this.name){
        this.name="匿名"
      }
      if (this.body){
        this.$http.post('http://hotel-miss.ddns.net/api/v1/posts',{
          name: this.name,
          body: this.body
        })
          .then(response => {
            this.$http.get('http://hotel-miss.ddns.net/api/v1/posts')
              .then(response => {
                this.posts = response.data;
              });
          })
      }
      this.name = null;
      this.body = null;
    }

    showPostModal(postID){
      this.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID)
        .then(response => {
          this.postDetail = response.data;
          this.postDetail.created_at = new Date('yyyy-MM-dd');
        });

      this.showModal = 1;
    }

    closeModal(){
      this.showModal = 0;
    }

    deletePost(postID){
      this.$http.delete('http://hotel-miss.ddns.net/api/v1/posts/' + postID, {
        params: {
          api_token: this.api_token
        }
      })
        .then(response => {
          this.$http.get('http://hotel-miss.ddns.net/api/v1/posts')
            .then(response => {
              this.posts = response.data;
            });
        });
    }

    addComment(postID){
      if (!this.commentName){
        this.commentName="匿名"
      }
      if (this.commentBody){
        this.$http.post('http://hotel-miss.ddns.net/api/v1/comments',{
          name: this.commentName,
          body: this.commentBody,
          post_id: postID
        })
          .then(response => {
            this.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID)
              .then(response => {
                this.postDetail = response.data;
                this.postDetail.created_at = new Date('yyyy-MM-dd');
              });
          })
      }

      this.commentBody = null;
    }

    deleteComment(commentID, postID){
      this.$http.delete('http://hotel-miss.ddns.net/api/v1/comments/' + commentID, {
       params: {
         api_token: this.api_token
       }
      })
        .then(response => {
          this.$http.get('http://hotel-miss.ddns.net/api/v1/posts/' + postID)
            .then(response => {
              this.postDetail = response.data;
              this.postDetail.created_at = new Date('yyyy-MM-dd');
            });
        });
    }
  }

  angular.module('finalProjectApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
