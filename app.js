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
          type: "text",
          in_details: true,
          in_addform: true,
          showname: true
        },
        amount: {
          name: "Сумма",
          type: "number",
          in_table: true,
          in_details: true,
          in_addform: true,
          showname: true
        },
        curr: {
          name: "Валюта",
          type: "select",
          in_table: true,
          in_details: true,
          in_addform: true,
          vals: ["EUR", "USD", "RUB"],
          showname: true
        },
        payer_id: {
          name: "Плательщик",
          in_table: true,
          in_details: true,
          in_addform: true,
          showname: true,
          type: "text"
        },
        descr: {
          name: "Описание",
          in_table: false,
          in_details: true,
          in_addform: true,
          type: "text",
          showname: true
        },
        income: {
          name: "Приход",
          in_table: true,
          in_details: true,
          in_addform: true,
          showname: false,
          type: "checkbox",
          true_val: "+",
          false_val: "-",
          true_class: "income",
          false_class: "outcome"
        },
        date: {
          name: "Дата",
          in_table: true,
          in_details: true,
          in_addform: true,
          showname: false
        },
        type: {
          name: "Тип данных",
          in_table: false,
          in_details: false,
          in_addform: false
        }
      },
      news: {
        title: {
          name: "Заголовок",
          in_table: true,
          in_details: true,
          in_addform: true,
          class: "header"
        },
        text: {
          name: "Описание",
          in_table: false,
          in_details: true,
          in_addform: true
        },
        type: {
          name: "Тип данных",
          in_table: false,
          in_details: false,
          in_addform: false
        },
        date: {
          name: "Дата",
          in_table: false,
          in_details: true,
          in_addform: true
        },
        checked: {
          name: "Я ознакомился",
          in_table: false,
          in_details: false,
          in_addform: false,
          showname: true,
          true_class: "income",
          false_class: "outcome"
        },
        deleted: {
          name: "Удалено",
          in_table: false,
          in_addform: false,
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
    $scope.additem = function(newitem) {
      $scope.pdata[newitem.type].push(newitem);
      $scope.alldata.push(newitem);
    };

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
        index = Math.floor(Math.random() * ctr);

        ctr--;

        temp = $scope.alldata[ctr];
        $scope.alldata[ctr] = $scope.alldata[index];
        $scope.alldata[index] = temp;
      }
    };
  }
]);
