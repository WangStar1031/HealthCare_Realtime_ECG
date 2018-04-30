/**
 * @author v.lugovsky
 * created on 16.12.2015
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts')
      .controller('LineChartCtrl', LineChartCtrl);

  var line_data_chart = [];
  var line_server_data = [];
  var line_data_hr = [];
  var check_init = false;
  var lineChart = null;
  var lastTime = "";
  for( var i = 0; i <1250; i++){
    var item_obj = {};
    item_obj.value = 0;
    line_data_chart.push(item_obj);
  }
  function __get_dataset_for_chart() {
    for(var i = 0; i < 25; i ++){
      if( line_server_data.length == 0){
        var item_obj = {};
        item_obj.value = 0.1;
        line_data_chart.push(item_obj);
      } else{
        line_data_chart.push(line_server_data[0]);
        line_server_data.shift();
      }
      line_data_chart.shift();
    }
    return line_data_chart;
  }
  function __get_dataset_for_hr(){
    return line_data_hr.shift();
  }

  /** @ngInject */
  function getECGData(){
    if(line_server_data.length >= 6250)return;
    $.get("http://esl-ninja.com/apptesting/getData.php", {lastTime:lastTime}, function(response){
      var arrValues = JSON.parse(response);
      lastTime = arrValues[arrValues.length - 1].time;
      for( var i = 0; i < arrValues.length; i++){
        var arrHeartRates = JSON.parse(arrValues[i].HeartRate);
        for( var j = 0; j < arrHeartRates.length - 1; j ++){
          line_data_hr.push(arrHeartRates[j]);
        }
        var arrECGDatas = JSON.parse(arrValues[i].Datas);
        for( var j = 0; j < arrECGDatas.length - 1; j++){
          var item_obj = {};
          item_obj.value = arrECGDatas[j];
          line_server_data.push(item_obj);
        }
      }
    });
  }
  getECGData();
  function LineChartCtrl($scope, baConfig, $element, layoutPaths) {
    if(check_init) return;
    if(!($element[0].getAttribute('id'))) return;
    check_init = true;

    setInterval(function(){
      getECGData();
    }, 5000);
    setTimeout(function(){
      setInterval( function(){
        __DrawChart($scope, baConfig, $element, layoutPaths);
      }, 100);
      setInterval( function(){
        __DrawHeartRates($scope, baConfig, $element, layoutPaths);
      }, 1000);
    }, 1000);
  }
  function __DrawHeartRates($scope, baConfig, $element, layoutPaths){
    var hr = __get_dataset_for_hr();
    if(hr == 255)return;
    $("#nHeartRates").html(hr);
  }

  function __DrawChart($scope, baConfig, $element, layoutPaths){
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    if(!(id)) return;
    if($("#"+id).length == 0) return;
    var elem = $("#lineChart");
    if(lineChart != null && elem.html() != ""){
      lineChart.dataProvider = __get_dataset_for_chart();
      lineChart.validateData();
    } else {
    lineChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      marginTop: 0,
      marginRight: 15,
      dataProvider: __get_dataset_for_chart(),
      // backgroundColor: "#00FF00",
      // backgroundAlpha: 0.1,
      valueAxes: [
        {
          autoGridCount: false,
          gridCount: 20,
          labelFrequency: 1,
          axisAlpha: 0,
          position: 'left',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          minimum: -100,
          maximum: 100
        }
      ],
      graphs: [
        {
          id: 'g1',
          balloonText: '[[value]]',
          bullet: '',//previous 'round'
          bulletSize: 8,
          lineColor: layoutColors.danger,
          lineThickness: 2  ,
          negativeLineColor: layoutColors.warning,
          type: 'line',
          valueField: 'value'
        }
      ],
      categoryField: 'year',
      categoryAxis: {
        labelsEnabled: false
      },
      export: {
        enabled: true
      },
      allLabels: [{
        "text": "Value axis",
        "rotation": 270,
        "x": "0",
        "y": "0",
        "width": "100%",
        "size": 15,
        "bold": false,
        "align": "right"
      }],
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    });
  }
  }

})();
