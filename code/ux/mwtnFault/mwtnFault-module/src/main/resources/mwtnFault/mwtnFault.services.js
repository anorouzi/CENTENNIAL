/*
 * Copyright (c) 2016 highstreet technologies GmbH and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */

define(['app/mwtnFault/mwtnFault.module','app/mwtnCommons/mwtnCommons.services'],function(mwtnFaultApp) {

  mwtnFaultApp.register.factory('$mwtnFault', function($q, $mwtnCommons, $mwtnDatabase, $mwtnLog) {
    
    var service = {};

    service.checkModules = $mwtnCommons.checkModules;
    service.getMmwtnWebSocketUrl = $mwtnCommons.getMmwtnWebSocketUrl;
    service.gridOptions = $mwtnCommons.gridOptions;
    service.formatData = $mwtnCommons.formatData;
    service.formatTimeStamp = $mwtnCommons.formatTimeStamp;
    service.deleteDocType = $mwtnDatabase.deleteDocType;
    service.odlKarafVersion = $mwtnCommons.odlKarafVersion;
    
    service.TimeStampToONFFormat=function(timestamp){

      timestamp=timestamp.split('-').join('');
      timestamp=timestamp.split(':').join('');
      timestamp=timestamp.split(' ').join('');
      timestamp=timestamp.replace('UTC','Z');
      return timestamp;
    };

    service.getAllLogEntries = function(from, size) {
      var sort = [ {
        "fault.timeStamp" : {
          order : 'desc'
        }
      }];
      var deferred = $q.defer();
      $mwtnDatabase.getAllData('org.opendaylight.mwtn.eventmanager', 'faultlog', from, size, sort).then(function(success){
        deferred.resolve(success);
      }, function(error){
        $mwtnLog.error({component: '$mwtnFault.getAllLogEntries', message: JSON.stringify(error.data)});
        deferred.reject(error);
      });
      return deferred.promise;
    };

    service.getAllLogEntriesWithSort= function(from, size, sort){
         var deferred = $q.defer();
         $mwtnDatabase.getAllData('org.opendaylight.mwtn.eventmanager', 'faultlog', from, size, sort).then(function(success){
         deferred.resolve(success);
      }, function(error){
        $mwtnLog.error({component: '$mwtnFault.getAllLogEntries', message: JSON.stringify(error.data)});
        deferred.reject(error);
      });
      return deferred.promise;
    };

    service.getFilteredSortedData=function(from, size, sort,query){
      var deferred = $q.defer();
         $mwtnDatabase.getFilteredSortedData('org.opendaylight.mwtn.eventmanager', 'faultlog', from, size,sort, query).then(function(success){
         deferred.resolve(success);
      }, function(error){
        $mwtnLog.error({component: '$mwtnFault.getFilteredSortedData', message: JSON.stringify(error.data)});
        deferred.reject(error);
      });
      return deferred.promise;

    };

    service.getFilteredData= function(from, size, query){
         var deferred = $q.defer();
         $mwtnDatabase.getFilteredData('org.opendaylight.mwtn.eventmanager', 'faultlog', from, size, query).then(function(success){
         deferred.resolve(success);
      }, function(error){
        $mwtnLog.error({component: '$mwtnFault.getFilteredData', message: JSON.stringify(error.data)});
        deferred.reject(error);
      });
      return deferred.promise;
    };

    service.getAllCurrentProblemEntries = function(from, size) {
      var sort = [ {
        "faultCurrent.timeStamp" : {
          order : 'desc'
        }
      }];
      var deferred = $q.defer();
      $mwtnDatabase.getAllData('org.opendaylight.mwtn.eventmanager', 'faultcurrent', from, size, sort).then(function(success){
        deferred.resolve(success);
      }, function(error){
        $mwtnLog.error({component: '$mwtnFault.getAllCurrentLogEntries', message: JSON.stringify(error.data)});
        deferred.reject(error);
      });
      return deferred.promise;
    };

    return service;
  });
});
