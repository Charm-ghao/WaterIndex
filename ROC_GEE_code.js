
/*
Before you begin, please define the following variables: 
'NF': center point  // See file "01 Study area"
'W':: Water samples  // See file "02 Samples"
'NW': Non-water samples  // See file "02 Samples"
Quick access links:  Site 11: https://code.earthengine.google.com/6c56255154f17425d2161b82ab1f3346
*/


Map.centerObject(NF, 10);

function index2(img){
     var ndwi = img.normalizedDifference(['B3', 'B8']).rename(['NDWI']);
     
     var mndwi = img.normalizedDifference(['B3', 'B11']).rename(['MNDWI']);
     
     var ewi = img.expression('(GREEN - NIR - SWIR1) / (GREEN + NIR + SWIR1)', {
    'GREEN': img.select('B3').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000)
  }).rename(['EWI']);
  
     var nwi = img.expression('100 * (BLUE - NIR - SWIR1 - SWIR2) / (BLUE + NIR + SWIR1 + SWIR2)', {
    'BLUE': img.select('B2').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['NWI']);  
  
     var wri = img.expression('(GREEN + RED) / (NIR + SWIR1)', {
    'GREEN': img.select('B3').divide(10000),
    'RED'  : img.select('B4').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000)
  }).rename(['WRI']);  
  
     var lswi = img.normalizedDifference(['B8', 'B11']).rename(['LSWI']);

    var iws = img.expression('2 * (4 * SWIR1 - BLUE) / SWIR1 - 2 * (SWIR1 / BLUE)', {
    'BLUE': img.select('B2').divide(10000),
    'SWIR1': img.select('B11').divide(10000)
  }).rename(['IWS']);
  
    var tcw = img.expression('0.2578 * BLUE + 0.2305 * GREEN + 0.0883 * RED + 0.1071 * NIR - 0.7611 * SWIR1 - 0.5308 * SWIR2', {
    'BLUE' : img.select('B2').divide(10000),
    'GREEN': img.select('B3').divide(10000),
    'RED'  : img.select('B4').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['TCW']);    
  
     var aweinsh = img.expression('4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)', {
    'GREEN': img.select('B3').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['AWEInsh']);    
  
     var aweish = img.expression('BLUE + 2.5 * GREEN - 1.5 * (NIR + SWIR1) - 0.25 * SWIR2', {
    'BLUE': img.select('B2').divide(10000),
    'GREEN': img.select('B3').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['AWEIsh']);  
  
     var mbwi = img.expression('2 * GREEN - RED - NIR - SWIR1 - SWIR2', {
    'GREEN': img.select('B3').divide(10000),
    'RED'  : img.select('B4').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['MBWI']);
  
     var abwi = img.expression('((COASTAL + BLUE + GREEN + RED) - (NIR + SWIR1 + SWIR2)) / ((COASTAL + BLUE + GREEN + RED) + (NIR + SWIR1 + SWIR2))', {
    'COASTAL': img.select('B1').divide(10000),
    'BLUE': img.select('B2').divide(10000),
    'GREEN': img.select('B3').divide(10000),
    'RED'  : img.select('B4').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['ABWI']);   

     var swi = img.normalizedDifference(['B5', 'B12']).rename(['SWI']);
     
     var wi2015 = img.expression('1.7204 + 171 * GREEN + 3 * RED - 70 * NIR - 45 * SWIR1 - 71 * SWIR2', {
    'GREEN': img.select('B3').divide(10000),
    'RED'  : img.select('B4').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['WI2015']);       

     var muwi = img.expression('-4 * (BLUE - GREEN)/(BLUE + GREEN) + 2 * (GREEN - NIR)/(GREEN + NIR) + 2 * (GREEN - SWIR2)/(GREEN + SWIR2) - (GREEN - SWIR1)/(GREEN + SWIR1)', {
    'BLUE': img.select('B2').divide(10000),
    'GREEN': img.select('B3').divide(10000),
    'NIR'  : img.select('B8').divide(10000),
    'SWIR1': img.select('B11').divide(10000),
    'SWIR2': img.select('B12').divide(10000)
  }).rename(['MuWI']);  

// cal CDWI
      var band6 = ['B2', 'B3', 'B4', 'B8', 'B11','B12'];
      var selecBand6 = img.select(band6);
      var maxBand6 = selecBand6.reduce(ee.Reducer.max()).divide(10000);
      var minBand6 = selecBand6.reduce(ee.Reducer.min()).divide(10000);
      var band_3=img.select('B3').divide(10000);
      var band_11=img.select('B11').divide(10000);
      var cdwi = (band_3.subtract(band_11).divide(maxBand6.subtract(minBand6))).rename(['CDWI']);
      
// cal SDWI
      var band2 = ['B3', 'B4'];
      var selecBand2 = img.select(band2);
      var maxBand2 = selecBand2.reduce(ee.Reducer.max()).divide(10000);
      var band_2=img.select('B2').divide(10000);
      var sdwi = (((maxBand2.subtract(band_2)).divide(maxBand2.add(band_2))).add(mndwi)).rename(['SDWI']);
            
// name
  var index = ndwi.addBands(mndwi)
                  .addBands(ewi)
                  .addBands(nwi)
                  .addBands(wri)
                  .addBands(lswi)
                  .addBands(aweinsh)
                  .addBands(aweish)
                  .addBands(wi2015)
                  .addBands(mbwi)
                  .addBands(abwi)
                  .addBands(muwi)
                  .addBands(swi)
                  .addBands(cdwi)
                  .addBands(sdwi)
                  .addBands(iws)
                  .addBands(tcw)
                  .select([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], ['NDWI','MNDWI','EWI','NWI','WRI','LSWI','AWEInsh','AWEIsh','WI2015','MBWI','ABWI','MuWI','SWI','CDWI','SDWI','IWS','TCW'])
  return index;
}

var S2_NF = ee.ImageCollection("COPERNICUS/S2_SR")
                  .filterDate('2023-03-11','2023-10-15')    // should adjust according to the study area
                  .filterBounds(NF)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',5))
                  .first()
                  .select('B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12')

var S2_index = index2(S2_NF);

var imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":-500,"max":5000,"gamma":1},

print(S2_NF)
print(S2_index,'S2_index')

Map.addLayer(S2_NF, imageVisParam, 'S2_NF');


// //Print bands

// var GW1 = S2_NF.sampleRegions({
//     collection: siteGW1,
//     scale:10
// })
// print('01GW1_bands', GW1)

// Export.table.toDrive({
//   collection: GW1,
//   description: '01GW1_bands',
//   folder:'01Samples_GW',
// })  


// var GW2 = S2_NF.sampleRegions({
//     collection: siteGW2,
//     scale:10
// })
// print('02GW2_bands', GW2)

// Export.table.toDrive({
//   collection: GW2,
//   description: '02GW2_bands',
//   folder:'01Samples_GW',
// }) 


// //Print index

// var GW3 = S2_index.sampleRegions({
//     collection: siteGW1,
//     scale:10
// })
// print('01GW1_index', GW3)

// Export.table.toDrive({
//   collection: GW3,
//   description: '01GW1_index',
//   folder:'01Samples_GW',
// })  


// var GW4 = S2_index.sampleRegions({
//     collection: siteGW2,
//     scale:10
// })
// print('02GW2_index', GW4)

// Export.table.toDrive({
//   collection: GW4,
//   description: '02GW2_index',
//   folder:'01Samples_GW',
// }) 




//-----Samples----- 

var samplesAWithClass = W.map(function(feature) {       
        return feature.set('class', 1);   // Set 'W' is 1       
});       
var samplesBWithClass = NW.map(function(feature) {
        return feature.set('class', 0);  // Set 'NW' is 0
});
var samples = samplesAWithClass.merge(samplesBWithClass);
print('samples', samples);
var trueClassList = samples.aggregate_array('class');



//--------------ROC----------------

//**-01NDWI

var msi1 = S2_index.select('NDWI');

var extractNDVI1 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue1 = msi1.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('NDWI'); 
        
    var thresholds1 = ee.List.sequence(-0.45, 0.15, 0.03);                                                             /// Samples
    var thresholdedNDVI1 = thresholds1.map(function(threshold) {
        return ee.Number(ndviValue1).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI1);
};

var ndviFeatures1 = samples.map(extractNDVI1);
var ndviList1 = ndviFeatures1.aggregate_array('Thresholded_NDVI');

var thresholds1 = ee.List.sequence(-0.45, 0.15, 0.03);                                                                 /// Samples

var confusionMatrixMetrics1 = [];
thresholds1.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives1 = ee.Number(0);
        var trueNegatives1 = ee.Number(0);
        var falsePositives1 = ee.Number(0);
        var falseNegatives1 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                           /// Samples (should adjust according to the study area)
            var trueClass1 = ee.Number(trueClassList.get(i));
            var row1 = ee.List(ndviList1.get(i));
            var processedNDVI1 = ee.Number(row1.get((ee.Number(threshold).add(0.45)).divide(0.03).round()));          /// Samples
             
            truePositives1 = truePositives1.add(trueClass1.eq(1).and(processedNDVI1.eq(1)))
            trueNegatives1 = trueNegatives1.add(trueClass1.eq(0).and(processedNDVI1.eq(0)))
            falsePositives1 = falsePositives1.add(trueClass1.eq(0).and(processedNDVI1.eq(1)))
            falseNegatives1 = falseNegatives1.add(trueClass1.eq(1).and(processedNDVI1.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy1 = truePositives1.divide(truePositives1.add(falseNegatives1));
      var consumersAccuracy1 = trueNegatives1.divide(trueNegatives1.add(falsePositives1));
      var overallAccuracy1 = truePositives1.add(trueNegatives1)
                                        .divide(truePositives1
                                        .add(trueNegatives1)
                                        .add(falsePositives1)
                                        .add(falseNegatives1));
      var f1Score1 = ee.Number(2).multiply(producersAccuracy1).multiply(consumersAccuracy1)
                                .divide(producersAccuracy1.add(consumersAccuracy1));

// print(producersAccuracy)
      confusionMatrixMetrics1.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy1,
            'ConsumerAccuracy/Precision': consumersAccuracy1,
            'OverallAccuracy': overallAccuracy1,
            'F1Score': f1Score1
        }));
    });
  
      var confusionMatrixFC1 = ee.FeatureCollection(confusionMatrixMetrics1);
  
      print('01NDWI_ROC', confusionMatrixFC1);
  
      Export.table.toDrive({
      collection: confusionMatrixFC1,
      description: '01GT_01NDWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**--02MNDWI

var msi2 = S2_index.select('MNDWI');

var extractNDVI2 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue2 = msi2.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('MNDWI'); 
        
    var thresholds2 = ee.List.sequence(-0.41, 0.21, 0.031);                                                             /// Samples
    var thresholdedNDVI2 = thresholds2.map(function(threshold) {
        return ee.Number(ndviValue2).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI2);
};

var ndviFeatures2 = samples.map(extractNDVI2);
var ndviList2 = ndviFeatures2.aggregate_array('Thresholded_NDVI');

var thresholds2 = ee.List.sequence(-0.41, 0.21, 0.031);                                                                 /// Samples

var confusionMatrixMetrics2 = [];
thresholds2.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives2 = ee.Number(0);
        var trueNegatives2 = ee.Number(0);
        var falsePositives2 = ee.Number(0);
        var falseNegatives2 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass2 = ee.Number(trueClassList.get(i));
            var row2 = ee.List(ndviList2.get(i));
            var processedNDVI2 = ee.Number(row2.get((ee.Number(threshold).add(0.41)).divide(0.031).round()));          /// Samples
             
            truePositives2 = truePositives2.add(trueClass2.eq(1).and(processedNDVI2.eq(1)))
            trueNegatives2 = trueNegatives2.add(trueClass2.eq(0).and(processedNDVI2.eq(0)))
            falsePositives2 = falsePositives2.add(trueClass2.eq(0).and(processedNDVI2.eq(1)))
            falseNegatives2 = falseNegatives2.add(trueClass2.eq(1).and(processedNDVI2.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy2 = truePositives2.divide(truePositives2.add(falseNegatives2));
      var consumersAccuracy2 = trueNegatives2.divide(trueNegatives2.add(falsePositives2));
      var overallAccuracy2 = truePositives2.add(trueNegatives2)
                                        .divide(truePositives2
                                        .add(trueNegatives2)
                                        .add(falsePositives2)
                                        .add(falseNegatives2));
      var f1Score2 = ee.Number(2).multiply(producersAccuracy2).multiply(consumersAccuracy2)
                                .divide(producersAccuracy2.add(consumersAccuracy2));

// print(producersAccuracy)
      confusionMatrixMetrics2.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy2,
            'ConsumerAccuracy/Precision': consumersAccuracy2,
            'OverallAccuracy': overallAccuracy2,
            'F1Score': f1Score2
        }));
    });
  
      var confusionMatrixFC2 = ee.FeatureCollection(confusionMatrixMetrics2);
  
      print('02MNDWI_ROC', confusionMatrixFC2);
  
      Export.table.toDrive({
      collection: confusionMatrixFC2,
      description: '01GT_02MNDWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-03EWI

var msi3 = S2_index.select('EWI');

var extractNDVI3 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue3 = msi3.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('EWI'); 
        
    var thresholds3 = ee.List.sequence(-0.68, -0.22, 0.023);                                                            /// Samples
    var thresholdedNDVI3 = thresholds3.map(function(threshold) {
        return ee.Number(ndviValue3).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI3);
};

var ndviFeatures3 = samples.map(extractNDVI3);
var ndviList3 = ndviFeatures3.aggregate_array('Thresholded_NDVI');

var thresholds3 = ee.List.sequence(-0.68, -0.22, 0.023);                                                                 /// Samples

var confusionMatrixMetrics3 = [];
thresholds3.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives3 = ee.Number(0);
        var trueNegatives3 = ee.Number(0);
        var falsePositives3 = ee.Number(0);
        var falseNegatives3 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                           /// Samples (should adjust according to the study area)
            var trueClass3 = ee.Number(trueClassList.get(i));
            var row3 = ee.List(ndviList3.get(i));
            var processedNDVI3 = ee.Number(row3.get((ee.Number(threshold).add(0.68)).divide(0.023).round()));          /// Samples
             
            truePositives3 = truePositives3.add(trueClass3.eq(1).and(processedNDVI3.eq(1)))
            trueNegatives3 = trueNegatives3.add(trueClass3.eq(0).and(processedNDVI3.eq(0)))
            falsePositives3 = falsePositives3.add(trueClass3.eq(0).and(processedNDVI3.eq(1)))
            falseNegatives3 = falseNegatives3.add(trueClass3.eq(1).and(processedNDVI3.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy3 = truePositives3.divide(truePositives3.add(falseNegatives3));
      var consumersAccuracy3 = trueNegatives3.divide(trueNegatives3.add(falsePositives3));
      var overallAccuracy3 = truePositives3.add(trueNegatives3)
                                        .divide(truePositives3
                                        .add(trueNegatives3)
                                        .add(falsePositives3)
                                        .add(falseNegatives3));
      var f1Score3 = ee.Number(2).multiply(producersAccuracy3).multiply(consumersAccuracy3)
                                .divide(producersAccuracy3.add(consumersAccuracy3));

// print(producersAccuracy)
      confusionMatrixMetrics3.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy3,
            'ConsumerAccuracy/Precision': consumersAccuracy3,
            'OverallAccuracy': overallAccuracy3,
            'F1Score': f1Score3
        }));
    });
  
      var confusionMatrixFC3 = ee.FeatureCollection(confusionMatrixMetrics3);
  
      print('03EWI_ROC', confusionMatrixFC3);
  
      Export.table.toDrive({
      collection: confusionMatrixFC3,
      description: '01GT_03EWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});



//**-04NWI

var msi4 = S2_index.select('NWI');

var extractNDVI4 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue4 = msi4.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('NWI'); 
        
    var thresholds4 = ee.List.sequence(-80.0, -46.0, 1.7);                                                           /// Samples
    var thresholdedNDVI4 = thresholds4.map(function(threshold) {
        return ee.Number(ndviValue4).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI4);
};

var ndviFeatures4 = samples.map(extractNDVI4);
var ndviList4 = ndviFeatures4.aggregate_array('Thresholded_NDVI');

var thresholds4 = ee.List.sequence(-80.0, -46.0, 1.7);                                                                 /// Samples

var confusionMatrixMetrics4 = [];
thresholds4.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives4 = ee.Number(0);
        var trueNegatives4 = ee.Number(0);
        var falsePositives4 = ee.Number(0);
        var falseNegatives4 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                          /// Samples (should adjust according to the study area)
            var trueClass4 = ee.Number(trueClassList.get(i));
            var row4 = ee.List(ndviList4.get(i));
            var processedNDVI4 = ee.Number(row4.get((ee.Number(threshold).add(80.0)).divide(1.7).round()));          /// Samples
             
            truePositives4 = truePositives4.add(trueClass4.eq(1).and(processedNDVI4.eq(1)))
            trueNegatives4 = trueNegatives4.add(trueClass4.eq(0).and(processedNDVI4.eq(0)))
            falsePositives4 = falsePositives4.add(trueClass4.eq(0).and(processedNDVI4.eq(1)))
            falseNegatives4 = falseNegatives4.add(trueClass4.eq(1).and(processedNDVI4.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy4 = truePositives4.divide(truePositives4.add(falseNegatives4));
      var consumersAccuracy4 = trueNegatives4.divide(trueNegatives4.add(falsePositives4));
      var overallAccuracy4 = truePositives4.add(trueNegatives4)
                                        .divide(truePositives4
                                        .add(trueNegatives4)
                                        .add(falsePositives4)
                                        .add(falseNegatives4));
      var f1Score4 = ee.Number(2).multiply(producersAccuracy4).multiply(consumersAccuracy4)
                                .divide(producersAccuracy4.add(consumersAccuracy4));

// print(producersAccuracy)
      confusionMatrixMetrics4.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy4,
            'ConsumerAccuracy/Precision': consumersAccuracy4,
            'OverallAccuracy': overallAccuracy4,
            'F1Score': f1Score4
        }));
    });
  
      var confusionMatrixFC4 = ee.FeatureCollection(confusionMatrixMetrics4);
  
      print('04NWI_ROC', confusionMatrixFC4);
  
      Export.table.toDrive({
      collection: confusionMatrixFC4,
      description: '01GT_04NWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});


//**-05WRI

var msi5 = S2_index.select('WRI');

var extractNDVI5 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue5 = msi5.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('WRI'); 
        
    var thresholds5 = ee.List.sequence(0.5, 1.2, 0.035);                                                             /// Samples
    var thresholdedNDVI5 = thresholds5.map(function(threshold) {
        return ee.Number(ndviValue5).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI5);
};

var ndviFeatures5 = samples.map(extractNDVI5);
var ndviList5 = ndviFeatures5.aggregate_array('Thresholded_NDVI');

var thresholds5 = ee.List.sequence(0.5, 1.2, 0.035);                                                                 /// Samples

var confusionMatrixMetrics5 = [];
thresholds5.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives5 = ee.Number(0);
        var trueNegatives5 = ee.Number(0);
        var falsePositives5 = ee.Number(0);
        var falseNegatives5 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass5 = ee.Number(trueClassList.get(i));
            var row5 = ee.List(ndviList5.get(i));
            var processedNDVI5 = ee.Number(row5.get((ee.Number(threshold).add(-0.5)).divide(0.035).round()));          /// Samples
             
            truePositives5 = truePositives5.add(trueClass5.eq(1).and(processedNDVI5.eq(1)))
            trueNegatives5 = trueNegatives5.add(trueClass5.eq(0).and(processedNDVI5.eq(0)))
            falsePositives5 = falsePositives5.add(trueClass5.eq(0).and(processedNDVI5.eq(1)))
            falseNegatives5 = falseNegatives5.add(trueClass5.eq(1).and(processedNDVI5.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy5 = truePositives5.divide(truePositives5.add(falseNegatives5));
      var consumersAccuracy5 = trueNegatives5.divide(trueNegatives5.add(falsePositives5));
      var overallAccuracy5 = truePositives5.add(trueNegatives5)
                                        .divide(truePositives5
                                        .add(trueNegatives5)
                                        .add(falsePositives5)
                                        .add(falseNegatives5));
      var f1Score5 = ee.Number(2).multiply(producersAccuracy5).multiply(consumersAccuracy5)
                                .divide(producersAccuracy5.add(consumersAccuracy5));

// print(producersAccuracy)
      confusionMatrixMetrics5.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy5,
            'ConsumerAccuracy/Precision': consumersAccuracy5,
            'OverallAccuracy': overallAccuracy5,
            'F1Score': f1Score5
        }));
    });
  
      var confusionMatrixFC5 = ee.FeatureCollection(confusionMatrixMetrics5);
  
      print('05WRI_ROC', confusionMatrixFC5);
  
      Export.table.toDrive({
      collection: confusionMatrixFC5,
      description: '01GT_05WRI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});



//**-06TCW

var msi6 = S2_index.select('TCW');

var extractNDVI6 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue6 = msi6.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('TCW'); 
        
    var thresholds6 = ee.List.sequence(-0.3, -0.05, 0.0125);                                                             /// Samples
    var thresholdedNDVI6 = thresholds6.map(function(threshold) {
        return ee.Number(ndviValue6).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI6);
};

var ndviFeatures6 = samples.map(extractNDVI6);
var ndviList6 = ndviFeatures6.aggregate_array('Thresholded_NDVI');

var thresholds6 = ee.List.sequence(-0.3, -0.05, 0.0125);                                                                 /// Samples

var confusionMatrixMetrics6 = [];
thresholds6.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives6 = ee.Number(0);
        var trueNegatives6 = ee.Number(0);
        var falsePositives6 = ee.Number(0);
        var falseNegatives6 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                          /// Samples (should adjust according to the study area)
            var trueClass6 = ee.Number(trueClassList.get(i));
            var row6 = ee.List(ndviList6.get(i));
            var processedNDVI6 = ee.Number(row6.get((ee.Number(threshold).add(0.3)).divide(0.0125).round()));          /// Samples
             
            truePositives6 = truePositives6.add(trueClass6.eq(1).and(processedNDVI6.eq(1)))
            trueNegatives6 = trueNegatives6.add(trueClass6.eq(0).and(processedNDVI6.eq(0)))
            falsePositives6 = falsePositives6.add(trueClass6.eq(0).and(processedNDVI6.eq(1)))
            falseNegatives6 = falseNegatives6.add(trueClass6.eq(1).and(processedNDVI6.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy6 = truePositives6.divide(truePositives6.add(falseNegatives6));
      var consumersAccuracy6 = trueNegatives6.divide(trueNegatives6.add(falsePositives6));
      var overallAccuracy6 = truePositives6.add(trueNegatives6)
                                        .divide(truePositives6
                                        .add(trueNegatives6)
                                        .add(falsePositives6)
                                        .add(falseNegatives6));
      var f1Score6 = ee.Number(2).multiply(producersAccuracy6).multiply(consumersAccuracy6)
                                .divide(producersAccuracy6.add(consumersAccuracy6));

// print(producersAccuracy)
      confusionMatrixMetrics6.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy6,
            'ConsumerAccuracy/Precision': consumersAccuracy6,
            'OverallAccuracy': overallAccuracy6,
            'F1Score': f1Score6
        }));
    });
  
      var confusionMatrixFC6 = ee.FeatureCollection(confusionMatrixMetrics6);
  
      print('06TCW_ROC', confusionMatrixFC6);
  
      Export.table.toDrive({
      collection: confusionMatrixFC6,
      description: '01GT_06TCW_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});



//**-07AWEInsh

var msi7 = S2_index.select('AWEInsh');

var extractNDVI7 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue7 = msi7.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('AWEInsh'); 
        
    var thresholds7 = ee.List.sequence(-1.55, -0.05, 0.075);                                                            /// Samples
    var thresholdedNDVI7 = thresholds7.map(function(threshold) {
        return ee.Number(ndviValue7).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI7);
};

var ndviFeatures7 = samples.map(extractNDVI7);
var ndviList7 = ndviFeatures7.aggregate_array('Thresholded_NDVI');

var thresholds7 = ee.List.sequence(-1.55, -0.05, 0.075);                                                                 /// Samples

var confusionMatrixMetrics7 = [];
thresholds7.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives7 = ee.Number(0);
        var trueNegatives7 = ee.Number(0);
        var falsePositives7 = ee.Number(0);
        var falseNegatives7 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass7 = ee.Number(trueClassList.get(i));
            var row7 = ee.List(ndviList7.get(i));
            var processedNDVI7 = ee.Number(row7.get((ee.Number(threshold).add(1.55)).divide(0.075).round()));          /// Samples
             
            truePositives7 = truePositives7.add(trueClass7.eq(1).and(processedNDVI7.eq(1)))
            trueNegatives7 = trueNegatives7.add(trueClass7.eq(0).and(processedNDVI7.eq(0)))
            falsePositives7 = falsePositives7.add(trueClass7.eq(0).and(processedNDVI7.eq(1)))
            falseNegatives7 = falseNegatives7.add(trueClass7.eq(1).and(processedNDVI7.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy7 = truePositives7.divide(truePositives7.add(falseNegatives7));
      var consumersAccuracy7 = trueNegatives7.divide(trueNegatives7.add(falsePositives7));
      var overallAccuracy7 = truePositives7.add(trueNegatives7)
                                        .divide(truePositives7
                                        .add(trueNegatives7)
                                        .add(falsePositives7)
                                        .add(falseNegatives7));
      var f1Score7 = ee.Number(2).multiply(producersAccuracy7).multiply(consumersAccuracy7)
                                .divide(producersAccuracy7.add(consumersAccuracy7));

// print(producersAccuracy)
      confusionMatrixMetrics7.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy7,
            'ConsumerAccuracy/Precision': consumersAccuracy7,
            'OverallAccuracy': overallAccuracy7,
            'F1Score': f1Score7
        }));
    });
  
      var confusionMatrixFC7 = ee.FeatureCollection(confusionMatrixMetrics7);
  
      print('07AWEInsh_ROC', confusionMatrixFC7);
  
      Export.table.toDrive({
      collection: confusionMatrixFC7,
      description: '01GT_07AWEInsh_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-08AWEIsh

var msi8 = S2_index.select('AWEIsh');

var extractNDVI8 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue8 = msi8.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('AWEIsh'); 
        
    var thresholds8 = ee.List.sequence(-0.70, 0.15, 0.0425);                                                             /// Samples
    var thresholdedNDVI8 = thresholds8.map(function(threshold) {
        return ee.Number(ndviValue8).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI8);
};

var ndviFeatures8 = samples.map(extractNDVI8);
var ndviList8 = ndviFeatures8.aggregate_array('Thresholded_NDVI');

var thresholds8 = ee.List.sequence(-0.70, 0.15, 0.0425);                                                                 /// Samples

var confusionMatrixMetrics8 = [];
thresholds8.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives8 = ee.Number(0);
        var trueNegatives8 = ee.Number(0);
        var falsePositives8 = ee.Number(0);
        var falseNegatives8 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                           /// Samples (should adjust according to the study area)
            var trueClass8 = ee.Number(trueClassList.get(i));
            var row8 = ee.List(ndviList8.get(i));
            var processedNDVI8 = ee.Number(row8.get((ee.Number(threshold).add(0.70)).divide(0.0425).round()));          /// Samples
             
            truePositives8 = truePositives8.add(trueClass8.eq(1).and(processedNDVI8.eq(1)))
            trueNegatives8 = trueNegatives8.add(trueClass8.eq(0).and(processedNDVI8.eq(0)))
            falsePositives8 = falsePositives8.add(trueClass8.eq(0).and(processedNDVI8.eq(1)))
            falseNegatives8 = falseNegatives8.add(trueClass8.eq(1).and(processedNDVI8.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy8 = truePositives8.divide(truePositives8.add(falseNegatives8));
      var consumersAccuracy8 = trueNegatives8.divide(trueNegatives8.add(falsePositives8));
      var overallAccuracy8 = truePositives8.add(trueNegatives8)
                                        .divide(truePositives8
                                        .add(trueNegatives8)
                                        .add(falsePositives8)
                                        .add(falseNegatives8));
      var f1Score8 = ee.Number(2).multiply(producersAccuracy8).multiply(consumersAccuracy8)
                                .divide(producersAccuracy8.add(consumersAccuracy8));

// print(producersAccuracy)
      confusionMatrixMetrics8.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy8,
            'ConsumerAccuracy/Precision': consumersAccuracy8,
            'OverallAccuracy': overallAccuracy8,
            'F1Score': f1Score8
        }));
    });
  
      var confusionMatrixFC8 = ee.FeatureCollection(confusionMatrixMetrics8);
  
      print('08AWEIsh_ROC', confusionMatrixFC8);
  
      Export.table.toDrive({
      collection: confusionMatrixFC8,
      description: '01GT_08AWEIsh_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});





//**-09WI2015

var msi9 = S2_index.select('WI2015');

var extractNDVI9 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue9 = msi9.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('WI2015'); 
        
    var thresholds9 = ee.List.sequence(-40.0, 6, 2.30);                                                             /// Samples
    var thresholdedNDVI9 = thresholds9.map(function(threshold) {
        return ee.Number(ndviValue9).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI9);
};

var ndviFeatures9 = samples.map(extractNDVI9);
var ndviList9 = ndviFeatures9.aggregate_array('Thresholded_NDVI');

var thresholds9 = ee.List.sequence(-40.0, 6, 2.30);                                                                 /// Samples

var confusionMatrixMetrics9 = [];
thresholds9.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives9 = ee.Number(0);
        var trueNegatives9 = ee.Number(0);
        var falsePositives9 = ee.Number(0);
        var falseNegatives9 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass9 = ee.Number(trueClassList.get(i));
            var row9 = ee.List(ndviList9.get(i));
            var processedNDVI9 = ee.Number(row9.get((ee.Number(threshold).add(40.0)).divide(2.30).round()));          /// Samples
             
            truePositives9 = truePositives9.add(trueClass9.eq(1).and(processedNDVI9.eq(1)))
            trueNegatives9 = trueNegatives9.add(trueClass9.eq(0).and(processedNDVI9.eq(0)))
            falsePositives9 = falsePositives9.add(trueClass9.eq(0).and(processedNDVI9.eq(1)))
            falseNegatives9 = falseNegatives9.add(trueClass9.eq(1).and(processedNDVI9.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy9 = truePositives9.divide(truePositives9.add(falseNegatives9));
      var consumersAccuracy9 = trueNegatives9.divide(trueNegatives9.add(falsePositives9));
      var overallAccuracy9 = truePositives9.add(trueNegatives9)
                                        .divide(truePositives9
                                        .add(trueNegatives9)
                                        .add(falsePositives9)
                                        .add(falseNegatives9));
      var f1Score9 = ee.Number(2).multiply(producersAccuracy9).multiply(consumersAccuracy9)
                                .divide(producersAccuracy9.add(consumersAccuracy9));

// print(producersAccuracy)
      confusionMatrixMetrics9.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy9,
            'ConsumerAccuracy/Precision': consumersAccuracy9,
            'OverallAccuracy': overallAccuracy9,
            'F1Score': f1Score9
        }));
    });
  
      var confusionMatrixFC9 = ee.FeatureCollection(confusionMatrixMetrics9);
  
      print('09WI2015_ROC', confusionMatrixFC9);
  
      Export.table.toDrive({
      collection: confusionMatrixFC9,
      description: '01GT_09WI2015_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-10MBWI

var msi10 = S2_index.select('MBWI');

var extractNDVI10 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue10 = msi10.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('MBWI'); 
        
    var thresholds10 = ee.List.sequence(-0.9, -0.15, 0.0375);                                                            /// Samples
    var thresholdedNDVI10 = thresholds10.map(function(threshold) {
        return ee.Number(ndviValue10).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI10);
};

var ndviFeatures10 = samples.map(extractNDVI10);
var ndviList10 = ndviFeatures10.aggregate_array('Thresholded_NDVI');

var thresholds10 = ee.List.sequence(-0.9, -0.15, 0.0375);                                                                 /// Samples

var confusionMatrixMetrics10 = [];
thresholds10.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives10 = ee.Number(0);
        var trueNegatives10 = ee.Number(0);
        var falsePositives10 = ee.Number(0);
        var falseNegatives10 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                           /// Samples (should adjust according to the study area)
            var trueClass10 = ee.Number(trueClassList.get(i));
            var row10 = ee.List(ndviList10.get(i));
            var processedNDVI10 = ee.Number(row10.get((ee.Number(threshold).add(0.9)).divide(0.0375).round()));          /// Samples
             
            truePositives10 = truePositives10.add(trueClass10.eq(1).and(processedNDVI10.eq(1)))
            trueNegatives10 = trueNegatives10.add(trueClass10.eq(0).and(processedNDVI10.eq(0)))
            falsePositives10 = falsePositives10.add(trueClass10.eq(0).and(processedNDVI10.eq(1)))
            falseNegatives10 = falseNegatives10.add(trueClass10.eq(1).and(processedNDVI10.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy10 = truePositives10.divide(truePositives10.add(falseNegatives10));
      var consumersAccuracy10 = trueNegatives10.divide(trueNegatives10.add(falsePositives10));
      var overallAccuracy10 = truePositives10.add(trueNegatives10)
                                        .divide(truePositives10
                                        .add(trueNegatives10)
                                        .add(falsePositives10)
                                        .add(falseNegatives10));
      var f1Score10 = ee.Number(2).multiply(producersAccuracy10).multiply(consumersAccuracy10)
                                .divide(producersAccuracy10.add(consumersAccuracy10));

// print(producersAccuracy)
      confusionMatrixMetrics10.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy10,
            'ConsumerAccuracy/Precision': consumersAccuracy10,
            'OverallAccuracy': overallAccuracy10,
            'F1Score': f1Score10
        }));
    });
  
      var confusionMatrixFC10 = ee.FeatureCollection(confusionMatrixMetrics10);
  
      print('10MBWI_ROC', confusionMatrixFC10);
  
      Export.table.toDrive({
      collection: confusionMatrixFC10,
      description: '01GT_10MBWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-11ABWI

var msi11 = S2_index.select('ABWI');

var extractNDVI11 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue11 = msi11.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('ABWI'); 
        
    var thresholds11 = ee.List.sequence(-0.3, 0.2, 0.025);                                                              /// Samples
    var thresholdedNDVI11 = thresholds11.map(function(threshold) {
        return ee.Number(ndviValue11).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI11);
};

var ndviFeatures11 = samples.map(extractNDVI11);
var ndviList11 = ndviFeatures11.aggregate_array('Thresholded_NDVI');

var thresholds11 = ee.List.sequence(-0.3, 0.2, 0.025);                                                                 /// Samples

var confusionMatrixMetrics11 = [];
thresholds11.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives11 = ee.Number(0);
        var trueNegatives11 = ee.Number(0);
        var falsePositives11 = ee.Number(0);
        var falseNegatives11 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                           /// Samples (should adjust according to the study area)
            var trueClass11 = ee.Number(trueClassList.get(i));
            var row11 = ee.List(ndviList11.get(i));
            var processedNDVI11 = ee.Number(row11.get((ee.Number(threshold).add(0.3)).divide(0.025).round()));          /// Samples
             
            truePositives11 = truePositives11.add(trueClass11.eq(1).and(processedNDVI11.eq(1)))
            trueNegatives11 = trueNegatives11.add(trueClass11.eq(0).and(processedNDVI11.eq(0)))
            falsePositives11 = falsePositives11.add(trueClass11.eq(0).and(processedNDVI11.eq(1)))
            falseNegatives11 = falseNegatives11.add(trueClass11.eq(1).and(processedNDVI11.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy11 = truePositives11.divide(truePositives11.add(falseNegatives11));
      var consumersAccuracy11 = trueNegatives11.divide(trueNegatives11.add(falsePositives11));
      var overallAccuracy11 = truePositives11.add(trueNegatives11)
                                        .divide(truePositives11
                                        .add(trueNegatives11)
                                        .add(falsePositives11)
                                        .add(falseNegatives11));
      var f1Score11 = ee.Number(2).multiply(producersAccuracy11).multiply(consumersAccuracy11)
                                .divide(producersAccuracy11.add(consumersAccuracy11));

// print(producersAccuracy)
      confusionMatrixMetrics11.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy11,
            'ConsumerAccuracy/Precision': consumersAccuracy11,
            'OverallAccuracy': overallAccuracy11,
            'F1Score': f1Score11
        }));
    });
  
      var confusionMatrixFC11 = ee.FeatureCollection(confusionMatrixMetrics11);
  
      print('11ABWI_ROC', confusionMatrixFC11);
  
      Export.table.toDrive({
      collection: confusionMatrixFC11,
      description: '01GT_11ABWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-12MuWI

var msi12 = S2_index.select('MuWI');

var extractNDVI12 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue12 = msi12.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('MuWI'); 
        
    var thresholds12 = ee.List.sequence(-0.4, 0.9, 0.065);                                                           /// Samples
    var thresholdedNDVI12 = thresholds12.map(function(threshold) {
        return ee.Number(ndviValue12).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI12);
};

var ndviFeatures12 = samples.map(extractNDVI12);
var ndviList12 = ndviFeatures12.aggregate_array('Thresholded_NDVI');

var thresholds12 = ee.List.sequence(-0.4, 0.9, 0.065);                                                                 /// Samples

var confusionMatrixMetrics12 = [];
thresholds12.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives12 = ee.Number(0);
        var trueNegatives12 = ee.Number(0);
        var falsePositives12 = ee.Number(0);
        var falseNegatives12 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass12 = ee.Number(trueClassList.get(i));
            var row12 = ee.List(ndviList12.get(i));
            var processedNDVI12 = ee.Number(row12.get((ee.Number(threshold).add(0.4)).divide(0.065).round()));          /// Samples
             
            truePositives12 = truePositives12.add(trueClass12.eq(1).and(processedNDVI12.eq(1)))
            trueNegatives12 = trueNegatives12.add(trueClass12.eq(0).and(processedNDVI12.eq(0)))
            falsePositives12 = falsePositives12.add(trueClass12.eq(0).and(processedNDVI12.eq(1)))
            falseNegatives12 = falseNegatives12.add(trueClass12.eq(1).and(processedNDVI12.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy12 = truePositives12.divide(truePositives12.add(falseNegatives12));
      var consumersAccuracy12 = trueNegatives12.divide(trueNegatives12.add(falsePositives12));
      var overallAccuracy12 = truePositives12.add(trueNegatives12)
                                        .divide(truePositives12
                                        .add(trueNegatives12)
                                        .add(falsePositives12)
                                        .add(falseNegatives12));
      var f1Score12 = ee.Number(2).multiply(producersAccuracy12).multiply(consumersAccuracy12)
                                .divide(producersAccuracy12.add(consumersAccuracy12));

// print(producersAccuracy)
      confusionMatrixMetrics12.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy12,
            'ConsumerAccuracy/Precision': consumersAccuracy12,
            'OverallAccuracy': overallAccuracy12,
            'F1Score': f1Score12
        }));
    });
  
      var confusionMatrixFC12 = ee.FeatureCollection(confusionMatrixMetrics12);
  
      print('12MuWI_ROC', confusionMatrixFC12);
  
      Export.table.toDrive({
      collection: confusionMatrixFC12,
      description: '01GT_12MuWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});



//**-13SWI

var msi13 = S2_index.select('SWI');

var extractNDVI13 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue13 = msi13.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('SWI'); 
        
    var thresholds13 = ee.List.sequence(-0.06, 0.14, 0.01);                                                            /// Samples
    var thresholdedNDVI13 = thresholds13.map(function(threshold) {
        return ee.Number(ndviValue13).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI13);
};

var ndviFeatures13 = samples.map(extractNDVI13);
var ndviList13 = ndviFeatures13.aggregate_array('Thresholded_NDVI');

var thresholds13 = ee.List.sequence(-0.06, 0.14, 0.01);                                                                 /// Samples

var confusionMatrixMetrics13 = [];
thresholds13.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives13 = ee.Number(0);
        var trueNegatives13 = ee.Number(0);
        var falsePositives13 = ee.Number(0);
        var falseNegatives13 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass13 = ee.Number(trueClassList.get(i));
            var row13 = ee.List(ndviList13.get(i));
            var processedNDVI13 = ee.Number(row13.get((ee.Number(threshold).add(0.06)).divide(0.01).round()));          /// Samples
             
            truePositives13 = truePositives13.add(trueClass13.eq(1).and(processedNDVI13.eq(1)))
            trueNegatives13 = trueNegatives13.add(trueClass13.eq(0).and(processedNDVI13.eq(0)))
            falsePositives13 = falsePositives13.add(trueClass13.eq(0).and(processedNDVI13.eq(1)))
            falseNegatives13 = falseNegatives13.add(trueClass13.eq(1).and(processedNDVI13.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy13 = truePositives13.divide(truePositives13.add(falseNegatives13));
      var consumersAccuracy13 = trueNegatives13.divide(trueNegatives13.add(falsePositives13));
      var overallAccuracy13 = truePositives13.add(trueNegatives13)
                                        .divide(truePositives13
                                        .add(trueNegatives13)
                                        .add(falsePositives13)
                                        .add(falseNegatives13));
      var f1Score13 = ee.Number(2).multiply(producersAccuracy13).multiply(consumersAccuracy13)
                                .divide(producersAccuracy13.add(consumersAccuracy13));

// print(producersAccuracy)
      confusionMatrixMetrics13.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy13,
            'ConsumerAccuracy/Precision': consumersAccuracy13,
            'OverallAccuracy': overallAccuracy13,
            'F1Score': f1Score13
        }));
    });
  
      var confusionMatrixFC13 = ee.FeatureCollection(confusionMatrixMetrics13);
  
      print('13SWI_ROC', confusionMatrixFC13);
  
      Export.table.toDrive({
      collection: confusionMatrixFC13,
      description: '01GT_13SWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-14CDWI

var msi14 = S2_index.select('CDWI');

var extractNDVI14 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue14 = msi14.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('CDWI'); 
        
    var thresholds14 = ee.List.sequence(-0.75, 1.05, 0.09);                                                            /// Samples
    var thresholdedNDVI14 = thresholds14.map(function(threshold) {
        return ee.Number(ndviValue14).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI14);
};

var ndviFeatures14 = samples.map(extractNDVI14);
var ndviList14 = ndviFeatures14.aggregate_array('Thresholded_NDVI');

var thresholds14 = ee.List.sequence(-0.75, 1.05, 0.09);                                                                 /// Samples

var confusionMatrixMetrics14 = [];
thresholds14.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives14 = ee.Number(0);
        var trueNegatives14 = ee.Number(0);
        var falsePositives14 = ee.Number(0);
        var falseNegatives14 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass14 = ee.Number(trueClassList.get(i));
            var row14 = ee.List(ndviList14.get(i));
            var processedNDVI14 = ee.Number(row14.get((ee.Number(threshold).add(0.75)).divide(0.09).round()));          /// Samples
             
            truePositives14 = truePositives14.add(trueClass14.eq(1).and(processedNDVI14.eq(1)))
            trueNegatives14 = trueNegatives14.add(trueClass14.eq(0).and(processedNDVI14.eq(0)))
            falsePositives14 = falsePositives14.add(trueClass14.eq(0).and(processedNDVI14.eq(1)))
            falseNegatives14 = falseNegatives14.add(trueClass14.eq(1).and(processedNDVI14.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy14 = truePositives14.divide(truePositives14.add(falseNegatives14));
      var consumersAccuracy14 = trueNegatives14.divide(trueNegatives14.add(falsePositives14));
      var overallAccuracy14 = truePositives14.add(trueNegatives14)
                                        .divide(truePositives14
                                        .add(trueNegatives14)
                                        .add(falsePositives14)
                                        .add(falseNegatives14));
      var f1Score14 = ee.Number(2).multiply(producersAccuracy14).multiply(consumersAccuracy14)
                                .divide(producersAccuracy14.add(consumersAccuracy14));

// print(producersAccuracy)
      confusionMatrixMetrics14.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy14,
            'ConsumerAccuracy/Precision': consumersAccuracy14,
            'OverallAccuracy': overallAccuracy14,
            'F1Score': f1Score14
        }));
    });
  
      var confusionMatrixFC14 = ee.FeatureCollection(confusionMatrixMetrics14);
  
      print('14CDWI_ROC', confusionMatrixFC14);
  
      Export.table.toDrive({
      collection: confusionMatrixFC14,
      description: '01GT_14CDWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});




//**-15SDWI

var msi15 = S2_index.select('SDWI');

var extractNDVI15 = function(feature) {
    var geometry = feature.geometry();
    var ndviValue15 = msi15.reduceRegion({
            reducer: ee.Reducer.first(),
            geometry: geometry,
            scale: 10
        }).get('SDWI'); 
        
    var thresholds15 = ee.List.sequence(-0.22, 0.28, 0.025);                                                            /// Samples
    var thresholdedNDVI15 = thresholds15.map(function(threshold) {
        return ee.Number(ndviValue15).gt(threshold).toInt();
      });
  return feature.set('Thresholded_NDVI', thresholdedNDVI15);
};

var ndviFeatures15 = samples.map(extractNDVI15);
var ndviList15 = ndviFeatures15.aggregate_array('Thresholded_NDVI');

var thresholds15 = ee.List.sequence(-0.22, 0.28, 0.025);                                                                 /// Samples

var confusionMatrixMetrics15 = [];
thresholds15.evaluate(function(thresholdsArray) {
      thresholdsArray.forEach(function(threshold) {
        var truePositives15 = ee.Number(0);
        var trueNegatives15 = ee.Number(0);
        var falsePositives15 = ee.Number(0);
        var falseNegatives15 = ee.Number(0);
        for (var i = 0; i < 300; i++) {                                                            /// Samples (should adjust according to the study area)
            var trueClass15 = ee.Number(trueClassList.get(i));
            var row15 = ee.List(ndviList15.get(i));
            var processedNDVI15 = ee.Number(row15.get((ee.Number(threshold).add(0.22)).divide(0.025).round()));          /// Samples
             
            truePositives15 = truePositives15.add(trueClass15.eq(1).and(processedNDVI15.eq(1)))
            trueNegatives15 = trueNegatives15.add(trueClass15.eq(0).and(processedNDVI15.eq(0)))
            falsePositives15 = falsePositives15.add(trueClass15.eq(0).and(processedNDVI15.eq(1)))
            falseNegatives15 = falseNegatives15.add(trueClass15.eq(1).and(processedNDVI15.eq(0)))
      }
   
// print('count',truePositives,trueNegatives,falsePositives,falseNegatives)
      var producersAccuracy15 = truePositives15.divide(truePositives15.add(falseNegatives15));
      var consumersAccuracy15 = trueNegatives15.divide(trueNegatives15.add(falsePositives15));
      var overallAccuracy15 = truePositives15.add(trueNegatives15)
                                        .divide(truePositives15
                                        .add(trueNegatives15)
                                        .add(falsePositives15)
                                        .add(falseNegatives15));
      var f1Score15 = ee.Number(2).multiply(producersAccuracy15).multiply(consumersAccuracy15)
                                .divide(producersAccuracy15.add(consumersAccuracy15));

// print(producersAccuracy)
      confusionMatrixMetrics15.push(ee.Feature(null, {
            'Threshold': threshold,
            'ProducerAccuracy/Recall': producersAccuracy15,
            'ConsumerAccuracy/Precision': consumersAccuracy15,
            'OverallAccuracy': overallAccuracy15,
            'F1Score': f1Score15
        }));
    });
  
      var confusionMatrixFC15 = ee.FeatureCollection(confusionMatrixMetrics15);
  
      print('15SDWI_ROC', confusionMatrixFC15);
  
      Export.table.toDrive({
      collection: confusionMatrixFC15,
      description: '01GT_15SDWI_confusionMatrixFC',
      fileFormat: 'CSV',
      folder: '01GT'
    });

});


// print(S2_index.select('01NDWI'))
// print(S2_index.select('02MNDWI'))
// print(S2_index.select('03EWI'))
// print(S2_index.select('04NWI'))
// print(S2_index.select('05WRI'))
// print(S2_index.select('06TCW'))
// print(S2_index.select('07AWEInsh'))
// print(S2_index.select('08AWEIsh'))
// print(S2_index.select('09WI2015'))
// print(S2_index.select('10MBWI'))
// print(S2_index.select('11ABWI'))
// print(S2_index.select('13SWI'))
// print(S2_index.select('12MuWI'))
// print(S2_index.select('14CDWI'))
// print(S2_index.select('15SDWI'))


// Map.addLayer(S2_index.select('NDWI'), { }, '01NDWI');
// Map.addLayer(S2_index.select('MNDWI'), { }, '02MNDWI');
// Map.addLayer(S2_index.select('EWI'), { }, '03EWI');
// Map.addLayer(S2_index.select('NWI'), { }, '04NWI');
// Map.addLayer(S2_index.select('WRI'), { }, '05WRI');
// Map.addLayer(S2_index.select('TCW'), { }, '06TCW');
// Map.addLayer(S2_index.select('AWEInsh'), { }, '07AWEInsh');
// Map.addLayer(S2_index.select('WI2015'), { }, '09WI2015');
// Map.addLayer(S2_index.select('AWEIsh'), { }, '08AWEIsh');
// Map.addLayer(S2_index.select('MBWI'), { }, '10MBWI');
// Map.addLayer(S2_index.select('ABWI'), { }, '11ABWI');
// Map.addLayer(S2_index.select('SWI'), { }, '13SWI');
// Map.addLayer(S2_index.select('MuWI'), { }, '12MuWI');
// Map.addLayer(S2_index.select('CDWI'), { }, '14CDWI');
// Map.addLayer(S2_index.select('SDWI'), { }, '15SDWI');



/*

// // .................Export....................
Export.image.toDrive({
  image: S2_NF.select('B2', 'B3', 'B4', 'B8', 'B12'),
  description: '16_S2_CHA',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('NDWI'),
  description: '16_01NDWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('MNDWI'),
  description: '16_02MNDWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('EWI'),
  description: '16_03EWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('NWI'),
  description: '16_04NWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('WRI'),
  description: '16_05WRI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('TCW'),
  description: '16_06TCW',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('AWEInsh'),
  description: '16_07AWEInsh',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('AWEIsh'),
  description: '16_08AWEIsh',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('WI2015'),
  description: '16_09WI2015',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('MBWI'),
  description: '16_10MBWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('ABWI'),
  description: '16_11ABWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('MuWI'),
  description: '16_12MuWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('SWI'),
  description: '16_13SWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('CDWI'),
  description: '16_14CDWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

Export.image.toDrive({
  image: S2_index.select('SDWI'),
  description: '16_15SDWI',
  scale: 10,
  maxPixels:1e13,
  fileFormat: 'GeoTIFF',
  folder:'16'
});

*/
