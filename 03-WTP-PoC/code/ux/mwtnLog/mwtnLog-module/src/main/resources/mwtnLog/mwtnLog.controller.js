/*
 * Copyright (c) 2016 highstreet technologies GmbH and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */

define(['app/mwtnLog/mwtnLog.module',
        'app/mwtnLog/mwtnLog.services',
        'app/mwtnCommons/mwtnCommons.services',
        'app/mwtnCommons/bower_components/angular-ui-grid/ui-grid.min', 
        'app/mwtnCommons/bower_components/angular-bootstrap/ui-bootstrap-tpls.min'], function(mwtnLogApp) {

  mwtnLogApp.register.controller('mwtnLogCtrl', ['$scope', '$rootScope', '$mwtnLogView', '$mwtnCommons', '$mwtnLog', 'uiGridConstants', function($scope, $rootScope, $mwtnLogView, $mwtnCommons, $mwtnLog, uiGridConstants) {

    var COMPONENT = 'mwtnLogCtrl';
    $mwtnLog.info({component: COMPONENT, message: 'mwtnLogCtrl started!'});
    $mwtnLog.error({component: COMPONENT, message: 'Just a test of logging an error.'});
    $mwtnLog.warning({component: COMPONENT, message: 'Just a test of logging a warning.'});
    $mwtnLog.debug({component: COMPONENT, message: 'Just a test of logging debug information.'});
    
    $rootScope['section_logo'] = 'src/app/mwtnLog/images/mwtnLog.png'; // Add your topbar logo location here such as 'assets/images/logo_topology.gif'

    $scope.highlightFilteredHeader = $mwtnCommons.highlightFilteredHeader;
 
    var rowTemplate = '<div ng-click="grid.appScope.fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" ng-class="[\'ui-grid-cell\', row.entity.type]" ui-grid-cell></div>';
    var iconCell = '<div class="ui-grid-cell-contents tooltip-uigrid" title="TOOLTIP"><i ng-class="{\'fa\':true, \'{{COL_FIELD}}\':true}" aria-hidden="true"></i></div>'
      
    $scope.gridOptions = $mwtnCommons.gridOptions;
    $scope.gridOptions.rowTemplate = rowTemplate;
    $scope.gridOptions.columnDefs = [
       // { field: 'id', type: 'number', displayName: 'No.',  headerCellClass: $scope.highlightFilteredHeader, width : 50, cellClass: 'number', pinnedLeft : true },
       { field: 'icon',  type: 'string', displayName: '',  headerCellClass: $scope.highlightFilteredHeader, width: 25, enableSorting: false, enableFiltering:false, cellTemplate: iconCell },
       { field: 'timestamp',  type: 'string', displayName: 'Timestamp',  headerCellClass: $scope.highlightFilteredHeader, width : 200,sort: {
         direction: uiGridConstants.DESC,
         priority: 1
       } },
       { field: 'type',  type: 'string', displayName: 'Type',  headerCellClass: $scope.highlightFilteredHeader, width: 70 },
       { field: 'component',  type: 'string', displayName: 'Component',  headerCellClass: $scope.highlightFilteredHeader, width : 200 },
       { field: 'message',  type: 'string', displayName: 'Message',  headerCellClass: $scope.highlightFilteredHeader, width : 500 }
     ];
    
    $scope.progress = {
        show: true,
        max: 200,
        value: 160
    };
    
    $scope.clearLog = function() {
      var i = 0;
      $scope.gridOptions.data.map(function(item){
        // console.log('delete:', i++, item.id, item.type);
        $mwtnLogView.deleteLogEntry(item.id, function(deleted){
          // console.log('delete', JSON.stringify(deleted));
        });
      });
      $scope.gridOptions.data = [];
    };
    

    var getIconFromType = function(type) {
      var mapping = {
        debug : '',
        info : 'fa-info-circle',
        warning : 'fa-exclamation-triangle',
        error : 'fa-times-circle'
      };
      return mapping[type];
    };
    
    var processLogEntries = function(logEntries) {
      if (logEntries.data.hits.hits) {
        logEntries.data.hits.hits.map(function(entry){
          var log = {
              id: entry._id,
              icon: getIconFromType(entry._source.type),
              timestamp: entry._source.timestamp,
              type: entry._source.type,
              component: entry._source.component,
              message: entry._source.message,
          };
          $scope.gridOptions.data.push(log);
        });
        $scope.progress.max = logEntries.data.hits.total;         
        $scope.progress.value = $scope.gridOptions.data.length;         
        $scope.progress.show = $scope.gridOptions.data.length < logEntries.data.hits.total;
      }
    };
    
    $scope.refreshLog = function() {
      $scope.gridOptions.data = [];
      var from = 0;
      var size = 20;
      $mwtnLogView.getAllLogEntries(from, size, function(logEntries){
        processLogEntries(logEntries);
        from = from + size;
        while (from < $scope.progress.max) {
          $mwtnLogView.getAllLogEntries(from, size, function(logEntries){
            processLogEntries(logEntries);
          });
          from = from + size;
        }
      });      
    }
    $scope.refreshLog();

  }]);


});
