// import $ from 'jquery';
// import Konva from 'konva';
// let digitizationContainerId = 'trg-digitization-container';
// let AngleTypes = { POINTS: 'points', LINES: 'lines', TRIANGLE: 'triangle' };
// let previousPositionsDigitization = [];
// let previousPositionsIndexDigitization = -1;
// let pointToCircleTypeDigitizationDefault = {
//     1: "s",
//     2: "n",
//     3: "or",
//     4: "po",
//     5: "a",
//     6: "b",
//     7: "pog",
//     8: "me",
//     9: "gn",
//     10: "go",
//     11: "li",
//     12: "ls",
//     13: "lsul",
//     14: "lill",
//     15: "sn",
//     16: "pg",
//     17: "pns",
//     18: "ans",
//     // 19: "ar",
//     20: "ba",
//     21: "c",
//     22: "co",
//     23: "las",
//     24: "lai",
//     25: "gl",
//     26: "en",
//     27: "cm",
//     28: "go2",
//     // 29: "go3",
//     30: "ocp1",
//     31: "ocp2",
// }
// let circleTypeToPointDigitizationDefault = {};
// for (let key in pointToCircleTypeDigitizationDefault) {
//     circleTypeToPointDigitizationDefault[pointToCircleTypeDigitizationDefault[key]] = key;
// }
// let pointToCircleTypeDigitization = pointToCircleTypeDigitizationDefault;
// let circleTypeToPointDigitization = {};
// for (let key in pointToCircleTypeDigitization) {
//     circleTypeToPointDigitization[pointToCircleTypeDigitization[key]] = key;
// }
// let circleTypeToPositionDigitization = {};
// let circleTypeDigitization = '';

// let containerDigitization = $(`#${digitizationContainerId}`);

// let imgSizesDigitization = {
//     width: 0,
//     height: 0
// }

// let containerSizesDigitization = {
//     width: containerDigitization.parent().width(),
//     height: window.innerHeight * 0.7,
//     ratio: 1
// }

// let imageFileDigitization;

// const circleTypeInputDigitization = $('input[type=radio][name=circle-type]');

// let movingDigitization = false;


// Konva.dragButtons = [2];

// const stageDigitization = new Konva.Stage({
//     container: digitizationContainerId,
//     width: containerSizesDigitization.width,
//     height: containerSizesDigitization.height,
//     draggable: true,
// });

// const imageLayerDigitization = new Konva.Layer();
// const layerDigitization = new Konva.Layer();
// stageDigitization.add(imageLayerDigitization);
// stageDigitization.add(layerDigitization);

// let magnifierScaleDigitization = 2;
// const magnifierStageDigitization = new Konva.Stage({
//     container: 'trg-digitization-magnifier-container',
//     width: containerSizesDigitization.width / 1.25,
//     height: containerSizesDigitization.height / 2,
//     scaleX: magnifierScaleDigitization,
//     scaleY: magnifierScaleDigitization,
// });

// let magnifierImageLayerDigitization = imageLayerDigitization.clone({ listening: false });
// let magnifierLayerDigitization = new Konva.Layer();
// magnifierStageDigitization.add(magnifierImageLayerDigitization);
// magnifierStageDigitization.add(magnifierLayerDigitization);

// $(document).ready(function () {
//     let url = `/s3/${trgImagePath}`;
//     fetch(url)
//         .then(res => res.blob())
//         .then(blob => {
//             let filename = url.substring(url.lastIndexOf('/')+1);
//             imageFileDigitization = new File([blob], filename);
//         });
//     loadImage(layerDigitization, imageLayerDigitization, magnifierLayerDigitization, magnifierImageLayerDigitization, imgSizesDigitization, containerSizesDigitization, pointToCircleTypeDigitization, circleTypeToPositionDigitization, circleTypeDigitization, url, updateLinesDigitization, updateMeasurementsDigitization, true);
// });

// function changeTRGDigitizationCircleType(newCircleType, newCircleTypeId) {
//     layerDigitization.find('Circle').forEach(function(circle) {
//         circle.fill('rgba(0,255,0,0.5)');
//     });
//     magnifierLayerDigitization.find('Circle').forEach(function(circle) {
//         circle.fill('rgba(0,255,0,0.5)');
//     });
//     circleTypeDigitization = newCircleType;
//     const circle = layerDigitization.findOne(`#${circleTypeDigitization}`);

//     if (circle !== undefined) {
//         circle.fill('rgba(255,0,0,1)');
//         magnifierLayerDigitization.findOne(`#${circleTypeDigitization}`).fill('rgba(255,0,0,1)');
//     }

//     previousPositionsDigitization = [];
//     previousPositionsIndexDigitization = -1;

//     let url = `/trg_points/${newCircleTypeId}`;
//     $.ajax({
//         type: 'GET',
//         url: url,
//         success: function (data) {
//             let tooltipDiv = $('#trg-digitization-tooltip');
//             tooltipDiv.html("");
//             let textDiv = $("<div>", {"class": "ms-4 text-grey"});
//             let pointName =$("<div>", {"class": "fw-bold"});
//             let tooltipText =$("<div>", {"class": ""});
//             pointName.html(data.name);
//             tooltipText.html(data.tooltip);
//             textDiv.append(pointName);
//             textDiv.append(tooltipText);
//             let image = $("<img>", {"class": "rounded", "src": `/s3/${data.imagePath}`});
//             tooltipDiv.append(image);
//             tooltipDiv.append(textDiv);
//         }
//     });
// }

// $("#trg-digitization-get-points").click(function(e) {
//     if (imageFileDigitization === undefined) {
//         return;
//     }
//     const token = $('#_csrf').attr('content');
//     const header = $('#_csrf_header').attr('content');
//     let formData = new FormData();
//     formData.append('image', imageFileDigitization, imageFileDigitization.name);
//     $.ajax({
//         type:'POST',
//         url: `/cases/${caseId}/trgs/points`,
//         contentType: false,
//         processData: false,
//         headers: {
//             'X-CSRF-Token': token
//         },
//         data: formData,
//         success:function(points){
//             console.log(points);
//             drawPoints(layerDigitization, magnifierLayerDigitization, imgSizesDigitization, containerSizesDigitization, pointToCircleTypeDigitization, circleTypeToPositionDigitization, circleTypeDigitization, points);
//             updateLinesDigitization();
//             updateMeasurementsDigitization();
//         },
//         error: function(data){
//             console.log("error");
//             console.log(data);
//         }
//     });
// });

// $("#digitization-form").on("submit", function(e) {
//     const token = $('#_csrf').attr('content');
//     const header = $('#_csrf_header').attr('content');
//     let trgPointsWithData = extractData(layerDigitization, containerSizesDigitization, circleTypeToPointDigitizationDefault);
//     let pointsFile = new Blob([JSON.stringify(trgPointsWithData)], {type:"text/plain"});
//     let formData = new FormData();
//     formData.append('points', pointsFile, "points.json");
//     $.ajax({
//         type:'POST',
//         url: `/cases/${caseId}/trgs/save_file`,
//         contentType: false,
//         processData: false,
//         headers: {
//             'X-CSRF-Token': token
//         },
//         data: formData,
//         success:function(data){
//         },
//         error: function(data){
//             console.log("error");
//         }
//     });
//     return true;
// });

// $("#trg-digitization-undo").click(function(e) {
//     if (previousPositionsIndexDigitization <= 0) return;
//     previousPositionsIndexDigitization--;
//     updatePoints(
//         layerDigitization,
//         magnifierLayerDigitization,
//         stageDigitization,
//         circleTypeToPositionDigitization,
//         previousPositionsDigitization[previousPositionsIndexDigitization].circleType,
//         previousPositionsDigitization[previousPositionsIndexDigitization].position,
//         true
//     );
//     updateLinesDigitization();
//     updateMeasurementsDigitization();
// });

// $("#trg-digitization-redo").click(function(e) {
//     if (previousPositionsIndexDigitization === previousPositionsDigitization.length - 1) return;
//     previousPositionsIndexDigitization++;

//     updatePoints(
//         layerDigitization,
//         magnifierLayerDigitization,
//         stageDigitization,
//         circleTypeToPositionDigitization,
//         previousPositionsDigitization[previousPositionsIndexDigitization].circleType,
//         previousPositionsDigitization[previousPositionsIndexDigitization].position,
//         true
//     );
//     updateLinesDigitization();
//     updateMeasurementsDigitization();
// });

// stageDigitization.on('mousedown touchstart', function (e) {
//     if (e.evt.button !== 0) {
//         return;
//     }
//     if (e.target.attrs.name === 'point') {
//         $('#trg-digitization-circle-type~.select-items').children().each(function () {
//             if ($(this).html() === e.target.attrs.id) {
//                 $(this).click();
//             }
//         });
//     }
//     if (!(circleTypeDigitization in circleTypeToPointDigitization)) {
//         return;
//     }
//     if (previousPositionsIndexDigitization === -1) {
//         updatePreviousPositionsDigitization();
//     }
//     movingDigitization = true;
//     updatePoints(layerDigitization, magnifierLayerDigitization, stageDigitization, circleTypeToPositionDigitization, circleTypeDigitization, stageDigitization.getRelativePointerPosition(), true);
//     updateLinesDigitization();
//     updateMeasurementsDigitization();
//     updatePreviousPositionsDigitization();
// });

// stageDigitization.on('mouseup touchend', function (e) {
//     if (e.evt.button !== 0) {
//         return;
//     }
//     movingDigitization = false;
// });

// stageDigitization.on('mousemove touchmove', function (e) {
//     if (e.evt.button !== 0 || !movingDigitization || !(circleTypeDigitization in circleTypeToPointDigitization)) {
//         return;
//     }
//     updatePoints(layerDigitization, magnifierLayerDigitization, stageDigitization, circleTypeToPositionDigitization, circleTypeDigitization, stageDigitization.getRelativePointerPosition(), true);
//     updateLinesDigitization();
//     updateMeasurementsDigitization();
// });

// stageDigitization.on('mousemove touchmove', function () {
//     magnifierStageDigitization.offsetX(stageDigitization.getRelativePointerPosition().x - magnifierStageDigitization.width() / 2 / magnifierScaleDigitization);
//     magnifierStageDigitization.offsetY(stageDigitization.getRelativePointerPosition().y - magnifierStageDigitization.height() / 2 / magnifierScaleDigitization);
// });

// imageLayerDigitization.on('wheel', function (e) {
//     magnifyWheel(stageDigitization, e);
// });

// layerDigitization.on('wheel', function (e) {
//     magnifyWheel(stageDigitization, e);
// });

// stageDigitization.on('contextmenu', function(e) {
//     e.evt.preventDefault();
// });

// function updateLineDigitization(point1, point2, extension) {
//     updateLine(layerDigitization, magnifierLayerDigitization, circleTypeToPointDigitization, circleTypeToPositionDigitization, point1, point2, extension);       // NSL
// }

// function updateAngleDigitization(angleType, middlePoint, point1, point2, line2point1, line2point2, angleName, textPosition, complementary) {
//     switch(angleType)
//     {
//         case AngleTypes.POINTS:
//             updateAngle3Points(layerDigitization, circleTypeToPointDigitization, circleTypeToPositionDigitization, point1, middlePoint, point2, angleName, textPosition, complementary);
//             break;
//         case AngleTypes.LINES:
//             updateAngle2Lines(layerDigitization, circleTypeToPointDigitization, circleTypeToPositionDigitization, point1, point2, line2point1, line2point2, angleName, textPosition, complementary);
//             break;
//         case AngleTypes.TRIANGLE:
//             updateAngleTriangle(layerDigitization, circleTypeToPointDigitization, circleTypeToPositionDigitization, angleName, textPosition, complementary);
//             break;
//         default:
//             break;
//     }
// }

// function updateNBPogDistanceDigitization() {
//     if (circleTypeToPositionDigitization["n"] === undefined
//         || circleTypeToPositionDigitization["b"] === undefined
//         || circleTypeToPositionDigitization["pog"] === undefined) {
//         updateMeasurement("NB-Pog", undefined, "distance");
//         return;
//     }
//     let distance = getDistanceFromPointToLine(
//         circleTypeToPositionDigitization["n"],
//         circleTypeToPositionDigitization["b"],
//         circleTypeToPositionDigitization["pog"]
//     ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//     updateMeasurement("NB-Pog", distance.toFixed(2), "distance");
// }

// function updateAOBODistanceDigitization() {
//     if (circleTypeToPositionDigitization["a"] === undefined
//         || circleTypeToPositionDigitization["b"] === undefined
//         || circleTypeToPositionDigitization["ocp1"] === undefined
//         || circleTypeToPositionDigitization["ocp2"] === undefined) {
//         updateMeasurement("AO-BO", undefined, "distance");
//         return;
//     }

//     let point1 = getProjectionFromPointToLine(
//         circleTypeToPositionDigitization["ocp1"],
//         circleTypeToPositionDigitization["ocp2"],
//         circleTypeToPositionDigitization["a"]
//     );

//     let point2 = getProjectionFromPointToLine(
//         circleTypeToPositionDigitization["ocp1"],
//         circleTypeToPositionDigitization["ocp2"],
//         circleTypeToPositionDigitization["b"]
//     );

//     let distance = getDistance(
//         point1,
//         point2
//     ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//     updateMeasurement("AO-BO", distance.toFixed(2), "distance");
// }

// function updateANFrHDistanceDigitization() {
//     if (circleTypeToPositionDigitization["a"] === undefined
//         || circleTypeToPositionDigitization["n"] === undefined
//         || circleTypeToPositionDigitization["po"] === undefined
//         || circleTypeToPositionDigitization["or"] === undefined) {
//         updateMeasurement("A-N-FrH", undefined, "distance");
//         return;
//     }

//     let n1 = getProjectionFromPointToLine(
//         circleTypeToPositionDigitization["or"],
//         circleTypeToPositionDigitization["po"],
//         circleTypeToPositionDigitization["n"]
//     );

//     let distance = getDistanceFromPointToLine(
//         circleTypeToPositionDigitization["n"],
//         n1,
//         circleTypeToPositionDigitization["a"]
//     ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//     updateMeasurement("A-N-FrH", distance.toFixed(2), "distance");
// }

// function updateELineDistanceDigitization() {
//     if (circleTypeToPositionDigitization["en"] === undefined
//         || circleTypeToPositionDigitization["pg"] === undefined) {
//         updateMeasurement("E-line-upper", undefined, "distance");
//         updateMeasurement("E-line-lower", undefined, "distance");
//         return;
//     }
//     if (circleTypeToPositionDigitization["lsul"] !== undefined) {
//         let distance = getDistanceFromPointToLine(
//             circleTypeToPositionDigitization["en"],
//             circleTypeToPositionDigitization["pg"],
//             circleTypeToPositionDigitization["lsul"]
//         ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//         updateMeasurement("E-line-upper", distance.toFixed(2), "distance");
//     }
//     if (circleTypeToPositionDigitization["lill"] !== undefined) {
//         let distance = getDistanceFromPointToLine(
//             circleTypeToPositionDigitization["en"],
//             circleTypeToPositionDigitization["pg"],
//             circleTypeToPositionDigitization["lill"]
//         ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//         updateMeasurement("E-line-lower", distance.toFixed(2), "distance");
//     }
// }

// function updateSLineDistanceDigitization() {
//     if (circleTypeToPositionDigitization["cm"] === undefined
//         || circleTypeToPositionDigitization["pg"] === undefined) {
//         updateMeasurement("S-line-upper", undefined, "distance");
//         updateMeasurement("S-line-lower", undefined, "distance");
//         return;
//     }
//     if (circleTypeToPositionDigitization["lsul"] !== undefined) {
//         let distance = getDistanceFromPointToLine(
//             circleTypeToPositionDigitization["cm"],
//             circleTypeToPositionDigitization["pg"],
//             circleTypeToPositionDigitization["lsul"]
//         ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//         updateMeasurement("S-line-upper", distance.toFixed(2), "distance");
//     }
//     if (circleTypeToPositionDigitization["lill"] !== undefined) {
//         let distance = getDistanceFromPointToLine(
//             circleTypeToPositionDigitization["cm"],
//             circleTypeToPositionDigitization["pg"],
//             circleTypeToPositionDigitization["lill"]
//         ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//         updateMeasurement("S-line-lower", distance.toFixed(2), "distance");
//     }
// }

// function updateIVLPercentDigitization() {
//     if (circleTypeToPositionDigitization["s"] === undefined
//         || circleTypeToPositionDigitization["go"] === undefined
//         || circleTypeToPositionDigitization["n"] === undefined
//         || circleTypeToPositionDigitization["me"] === undefined) {
//         updateMeasurement("ИВЛ", undefined, "percent");
//         return;
//     }

//     let distance1 = getDistance(
//         circleTypeToPositionDigitization["s"],
//         circleTypeToPositionDigitization["go"]
//     );

//     let distance2 = getDistance(
//         circleTypeToPositionDigitization["n"],
//         circleTypeToPositionDigitization["me"]
//     );

//     updateMeasurement("ИВЛ", (distance1/distance2).toFixed(2) * 100, "percent");
// }

// function updateDistanceDigitization(point1, point2, distanceName) {
//     if (circleTypeToPositionDigitization[point1] === undefined
//         || circleTypeToPositionDigitization[point2] === undefined) {
//         updateMeasurement(distanceName, undefined, "distance");
//         return;
//     }

//     let distance = getDistance(
//         point1,
//         point2
//     ) / containerSizesCalibration.ratio * trgPixelLengthInMm;
//     updateMeasurement(distanceName, distance.toFixed(2), "distance");
// }

// function updateLinesDigitization() {
//     updateLineDigitization("n", "s", 1000);       // NSL
//     updateLineDigitization("n", "a", 1000);       // N-A
//     updateLineDigitization("n", "b", 1000);       // N-B
//     updateLineDigitization("ans", "pns", 1000);   // NL
//     updateLineDigitization("me", "go", 1000);     // ML
//     updateLineDigitization("pg", "en", 1000);     // EN-ДТ
//     updateLineDigitization("or", "po", 1000);     // FH
//     updateLineDigitization("s", "ba", 1000);      // SBa
//     updateLineDigitization("go2", "go", 1000);      // Линия заднего края
//     updateLineDigitization("ocp1", "ocp2", 1000);      // Линия заднего края
// }

// function updateMeasurementsDigitization() {
//     updateAngleDigitization(AngleTypes.POINTS, "n", "s", "a", null, null, "SNA", {"x": stageDigitization.width() - 100, "y": 15}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "n", "s", "b", null, null, "SNB", {"x": stageDigitization.width() - 100, "y": 30}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "n", "a", "b", null, null, "ANB", {"x": stageDigitization.width() - 100, "y": 45}, false);

//     updateAngleDigitization(AngleTypes.LINES, null, "n", "s", "ans", "pns", "NSL/NL", {"x": stageDigitization.width() - 100, "y": 60}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "ans", "pns", "me","go","NL/ML", {"x": stageDigitization.width() - 100, "y": 75}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "n", "s", "ls","las","1-SN", {"x": stageDigitization.width() - 100, "y": 90}, false);

//     updateAngleDigitization(AngleTypes.POINTS, "go", "go2", "me", null, null, "Go", {"x": stageDigitization.width() - 100, "y": 105}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "b", "c", "a", null, null, "β", {"x": stageDigitization.width() - 100, "y": 120}, true);
//     updateAngleDigitization(AngleTypes.POINTS, "me", "li", "go", null, null, "1-ML", {"x": stageDigitization.width() - 100, "y": 135}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "go", "n", "me", null, null, "NGoMe", {"x": stageDigitization.width() - 100, "y": 150}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "s", "n", "ba", null, null, "NS-Ba", {"x": stageDigitization.width() - 100, "y": 165}, false);

//     updateAngleDigitization(AngleTypes.TRIANGLE, null, null, null, null, null, "Треугольник Твида", {"x": stageDigitization.width() - 100, "y": 180}, false);

//     updateAngleDigitization(AngleTypes.LINES, null, "or", "po", "me", "go", "FMA", {"x": stageDigitization.width() - 100, "y": 195}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "li", "lai", "me", "go", "IMPA", {"x": stageDigitization.width() - 100, "y": 210}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "or", "po", "li", "lai", "FMIA", {"x": stageDigitization.width() - 100, "y": 225}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "n", "s", "me","go","NSL/ML", {"x": stageDigitization.width() - 100, "y": 240}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "ls", "las", "pns","ans","ILS/NL", {"x": stageDigitization.width() - 100, "y": 255}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "ls", "las", "n","s","ILS/NSL", {"x": stageDigitization.width() - 100, "y": 270}, false);
//     updateAngleDigitization(AngleTypes.LINES, null, "ls", "las", "li","lai","ILS/Ili", {"x": stageDigitization.width() - 100, "y": 285}, false);

//     updateAngleDigitization(AngleTypes.POINTS, "sn", "gl", "pg", null, null, "gl-sn-pg", {"x": stageDigitization.width() - 100, "y": 300}, false);
//     updateAngleDigitization(AngleTypes.POINTS, "sn", "cm", "ls", null, null, "cm-sn-ls", {"x": stageDigitization.width() - 100, "y": 315}, false);

//     updateNBPogDistanceDigitization();
//     updateAOBODistanceDigitization();

//     updateDistanceDigitization("a", "co", "A-Co");
//     updateDistanceDigitization("gn", "co", "Gn-Co");
//     updateDistanceDigitization("ans", "me", "ANS-Me");

//     updateANFrHDistanceDigitization();
//     updateELineDistanceDigitization();
//     updateSLineDistanceDigitization();

//     updateIVLPercentDigitization();
// }

// function updateTRGPoints(data) {
//     let points = data.map((elem) => elem.name);
//     hideAll(layerDigitization, magnifierLayerDigitization);
//     let trgPointsWithData = extractData(layerDigitization, containerSizesDigitization, circleTypeToPointDigitizationDefault);
//     pointToCircleTypeDigitization = {}
//     for (let key in pointToCircleTypeDigitizationDefault) {
//         if (points.find(point => point === pointToCircleTypeDigitizationDefault[key])) {
//             pointToCircleTypeDigitization[key] = pointToCircleTypeDigitizationDefault[key];
//         }
//     }
//     circleTypeToPointDigitization = {};
//     for (let key in pointToCircleTypeDigitization) {
//         circleTypeToPointDigitization[pointToCircleTypeDigitization[key]] = key;
//     }
//     drawPoints(layerDigitization, magnifierLayerDigitization, imgSizesDigitization, containerSizesDigitization, pointToCircleTypeDigitization, circleTypeToPositionDigitization, circleTypeDigitization, trgPointsWithData);
//     updateLinesDigitization();
//     updateMeasurementsDigitization();
// }

// function updatePreviousPositionsDigitization() {
//     while (previousPositionsIndexDigitization < previousPositionsDigitization.length - 1) {
//         previousPositionsDigitization.pop();
//     }
//     if (previousPositionsDigitization.length === 10) {
//         previousPositionsDigitization.shift();
//     }
//     previousPositionsDigitization.push({
//         circleType: circleTypeDigitization,
//         position: circleTypeToPositionDigitization[circleTypeDigitization]
//     });
//     previousPositionsIndexDigitization++;
// }