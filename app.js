var newsandactions = angular.module("newsandactions", []);
newsandactions.controller("list", [
  "$scope",
  "$filter",
  "$http",
  "$location",
  function($scope, $filter, $http, $location) {
    $scope.pdata = {};
    $scope.alldata = [];
    $scope.itemdetails = false;
    $scope.openadditem = false;
    $scope.this_item = {};
    $scope.fields = {
      action: {
        title: {
          name: "Заголовок",
          in_table: false,
          in_details: true,
          showname: true
        },
        amount: {
          name: "Сумма",
          in_table: true,
          in_details: true,
          showname: true
        },
        curr: {
          name: "Валюта",
          in_table: true,
          in_details: true,
          showname: true
        },
        payer_id: {
          name: "Плательщик",
          in_table: true,
          in_details: true,
          showname: true
        },
        descr: {
          name: "Описание",
          in_table: false,
          in_details: true,
          showname: true
        },
        income: {
          name: "Приход",
          in_table: true,
          in_details: true,
          showname: false,
          true_val: "+",
          false_val: "-",
          true_class: "income",
          false_class: "outcome"
        },
        date: {
          name: "Дата",
          in_table: true,
          in_details: true,
          showname: false
        },
        type: {
          name: "Тип данных",
          in_table: false,
          in_details: false
        }
      },
      news: {
        title: {
          name: "Заголовок",
          in_table: true,
          in_details: true,
          class: "header"
        },
        text: {
          name: "Описание",
          in_table: false,
          in_details: true
        },
        type: {
          name: "Тип данных",
          in_table: false,
          in_details: false
        },
        date: {
          name: "Дата",
          in_table: false,
          in_details: true
        },
        checked: {
          name: "Я ознакомился",
          in_table: false,
          in_details: false,
          showname: true,
          true_class: "income",
          false_class: "outcome"
        },
        deleted: {
          name: "Удалено",
          in_table: false,
          in_details: false,
          showname: true
        }
      }
    };
    $scope.props = {
      action: {
        deleted: {
          name: "Удалить",
          in_table: true,
          in_details: true,
          value: true,
          type: "button"
        }
      },
      news: {
        checked: {
          name: "Я ознакомлся",
          in_table: true,
          in_details: true,
          class: "checked",
          type: "checkbox"
        },
        deleted: {
          name: "Удалить",
          in_table: true,
          in_details: true,
          class: "deleted",
          value: true,
          type: "button"
        }
      }
    };
    $http
      .get("data.json", {
        headers: {
          "If-Modified-Since": "0",
          Pragma: "no-cache",
          Expires: -1,
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      })
      .then(function(response) {
        $scope.alldata = response.data;
        angular.forEach(response.data, function(item, ndx) {
          !$scope.pdata[item.type] ? ($scope.pdata[item.type] = []) : "";
          $scope.pdata[item.type].push(item);
        });
        $scope.shuffle();
      });

    $scope.closemodal = function() {
      $scope.itemdetails = false;
      $scope.openadditem = false;
    };
    $scope.opendetails = function(item) {
      $scope.this_item = item;
      $scope.itemdetails = true;
    };

    $scope.shuffle = function() {
      var ctr = $scope.alldata.length,
        temp,
        index;

      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);

        ctr--;

        temp = $scope.alldata[ctr];
        $scope.alldata[ctr] = $scope.alldata[index];
        $scope.alldata[index] = temp;
      }
    };
  }
]);
