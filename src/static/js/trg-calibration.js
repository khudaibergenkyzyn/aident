// import $ from 'jquery';
// import Konva from 'konva';
// import loadImage from './trg'
// let calibrationContainerId = 'trg-calibration-container';

// let pointToCircleTypeCalibration = {
//     1: "first-point",
//     2: "second-point",
// }
// let caseId = 1306
// let circleTypeToPointCalibration = {};
// for (let key in pointToCircleTypeCalibration) {
//     circleTypeToPointCalibration[pointToCircleTypeCalibration[key]] = key;
// }
// let circleTypeToPositionCalibration = {};
// let circleTypeCalibration = '';

// let containerCalibration = $(`#${calibrationContainerId}`);

// let imgSizesCalibration = {
//     width: 0,
//     height: 0
// }

// let containerSizesCalibration = {
//     width: containerCalibration.parent().width(),
//     height: window.innerHeight * 0.7,
//     ratio: 1
// }

// let imageFileCalibration;

// let movingCalibration = false;

// Konva.dragButtons = [2];

// const stageCalibration = new Konva.Stage({
//     container: calibrationContainerId,
//     width: containerSizesCalibration.width,
//     height: containerSizesCalibration.height,
//     draggable: true,
// });

// const imageLayerCalibration = new Konva.Layer();
// const layerCalibration = new Konva.Layer();
// stageCalibration.add(imageLayerCalibration);
// stageCalibration.add(layerCalibration);

// $(document).ready(function () {
//     let url = `/cases/trgs/image/${caseId}`;
//     fetch(url)
//         .then(res => res.blob())
//         .then(blob => {
//             let filename = url.substring(url.lastIndexOf('/')+1);
//             imageFileCalibration = new File([blob], filename);
//         });
//     loadImage(layerCalibration, imageLayerCalibration, null, null, imgSizesCalibration, containerSizesCalibration, pointToCircleTypeCalibration, circleTypeToPositionCalibration, circleTypeCalibration, url, null, null, false);
// });

// $("#start-calibration-button").click(function(e) {
//     firstStepCalibration();
// });

// $("#trg-calibration-confirm-button").click(function(e) {
//     fourthStepCalibration();
// });

// $("#zoom-reset-button").click(function(e) {
//     let centerPos = {
//         x: 0,
//         y: 0,
//     }
//     magnify(stageCalibration, 1, centerPos);
// });

// $("#zoom-in-button").click(function(e) {
//     let position = {
//         x: stageCalibration.x() * scaleBy,
//         y: stageCalibration.y() * scaleBy,
//     };
//     magnify(stageCalibration, stageCalibration.scaleX() * scaleBy, position);
// });

// $("#zoom-out-button").click(function(e) {
//     let position = {
//         x: stageCalibration.x() / scaleBy,
//         y: stageCalibration.y() / scaleBy,
//     };
//     magnify(stageCalibration, stageCalibration.scaleX() / scaleBy, position);
// });

// stageCalibration.on('mousedown touchstart', function (e) {
//     if (e.evt.button !== 0 || !(circleTypeCalibration in circleTypeToPointCalibration)) {
//         return;
//     }
//     movingCalibration = true;
//     updatePoints(layerCalibration, null, stageCalibration, circleTypeToPositionCalibration, circleTypeCalibration, stageCalibration.getRelativePointerPosition(), false);
//     updateLinesCalibration();
// });

// stageCalibration.on('mouseup touchend', function (e) {
//     if (e.evt.button !== 0) {
//         return;
//     }
//     movingCalibration = false;
//     if (circleTypeCalibration === "first-point") {
//         secondStepCalibration();
//     }
//     else if (circleTypeCalibration === "second-point") {
//         thirdStepCalibration();
//     }
// });

// stageCalibration.on('mousemove touchmove', function (e) {
//     if (e.evt.button !== 0 || !movingCalibration || !(circleTypeCalibration in circleTypeToPointCalibration)) {
//         return;
//     }
//     updatePoints(layerCalibration, null, stageCalibration, circleTypeToPositionCalibration, circleTypeCalibration, stageCalibration.getRelativePointerPosition(), false);
//     updateLinesCalibration();
// });

// imageLayerCalibration.on('wheel', function (e) {
//     magnifyWheel(stageCalibration, e);
// });

// layerCalibration.on('wheel', function (e) {
//     magnifyWheel(stageCalibration, e);
// });

// stageCalibration.on('contextmenu', function(e) {
//     e.evt.preventDefault();
// });

// function firstStepCalibration() {
//     $('#calibration-first-point-text').removeClass('mt-2');
//     $('#calibration-first-point-text').addClass('mt-4');
//     $('#calibration-first-point-text').removeClass('active');
//     $('#calibration-second-point-text').removeClass('active');
//     $('#calibration-second-point-text').addClass('d-none');
//     $('#calibration-distance-text').addClass('d-none');
//     $('#calibration-form').addClass('d-none');
//     layerCalibration.removeChildren();
//     circleTypeCalibration = "first-point";

//     $('#calibration-first-point-text').removeClass('d-none');
// }

// function secondStepCalibration() {
//     $('#calibration-first-point-text').addClass('active');
//     $('#calibration-second-point-text').removeClass('d-none');
//     circleTypeCalibration = "second-point";
// }

// function thirdStepCalibration() {
//     $('#calibration-second-point-text').addClass('active');
//     $('#calibration-form').removeClass('d-none');

//     $('#trg-length-in-pixels').val(
//         getDistance(
//             layerCalibration.findOne(`#first-point`).position(),
//             layerCalibration.findOne(`#second-point`).position()
//         ) / containerSizesCalibration.ratio
//     );

//     circleTypeCalibration = "done";
// }

// function fourthStepCalibration() {
//     $('#calibration-distance').text($('#trg-length-in-mm').val());
//     $('#calibration-distance-text').removeClass('d-none');
//     $('#calibration-first-point-text').removeClass('mt-4');
//     $('#calibration-first-point-text').addClass('mt-2');
//     $('#trg-calibration-send-button').removeClass('d-none');

//     console.log($('#trg-length-in-mm').val());
//     console.log($('#trg-length-in-pixels').val());
// }

// function updateLinesCalibration() {
//     updateLine(layerCalibration, null, circleTypeToPointCalibration, circleTypeToPositionCalibration, "first-point", "second-point", 0);
// }