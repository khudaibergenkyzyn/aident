// import $ from 'jquery';
// let trgDigitizationInfoUnitDegree = ''
// let trgDigitizationInfoUnitMm = ''
// let trgDigitizationInfoUnitPercent = ''
// export default function changeTRGDigitizationAnalysisType(trgAnalysisTypeId) {
//     let url = `/trg_measurements/rest?trgAnalysisType=${trgAnalysisTypeId}`;
//     $.ajax({
//         async: false,
//         type: 'GET',
//         url: url,
//         success: function (data) {
//             $('#trg-digitization-info-table tbody').html("");
//             $.each(data, function(key, value) {
//                 let trId, unit;

//                 switch (value.measurementType) {
//                     case 'ANGLE':
//                         trId = `angle-${value.name}-tr`;
//                         unit = trgDigitizationInfoUnitDegree;
//                         break;
//                     case 'DISTANCE':
//                         trId = `distance-${value.name}-tr`;
//                         unit = trgDigitizationInfoUnitMm;
//                         break;
//                     case 'PERCENT':
//                         trId = `percent-${value.name}-tr`;
//                         unit = trgDigitizationInfoUnitPercent;
//                         break;
//                     default:
//                         break;
//                 }

//                 let angleTr = $("<tr>", {"id": trId});
//                 let angleNameTd = $("<td>", {});
//                 let angleUnitTd = $("<td>", {});
//                 let angleValueTd = $("<td>", {});
//                 let angleNormalTd = $("<td>", {});
//                 let angleDifferenceTd = $("<td>", {});
//                 angleNameTd.html(value.name);
//                 angleUnitTd.html(unit);
//                 angleValueTd.html(undefined);
//                 angleNormalTd.html(value.mean);
//                 angleDifferenceTd.html(value.deviation);
//                 angleTr.append(angleNameTd);
//                 angleTr.append(angleUnitTd);
//                 angleTr.append(angleValueTd);
//                 angleTr.append(angleNormalTd);
//                 angleTr.append(angleDifferenceTd);
//                 $('#trg-digitization-info-table tbody').append(angleTr);
//             });
//         }
//     });
//     url = `/trg_points/rest?trgAnalysisType=${trgAnalysisTypeId}`;
//     $.ajax({
//         async: false,
//         type: 'GET',
//         url: url,
//         success: function (data) {
//             let trgCircleType = $('#trg-digitization-circle-type');
//             trgCircleType.children().not(":first").remove();
//             $.each(data, function(key,value) {
//                 trgCircleType.append($("<option></option>")
//                     .attr("value", value.id).text(value.name));
//             });

//             // updateCustomSelect();
//             // updateTRGPoints(data);
//         }
//     });
//     $('#trg-digitization-tooltip').html("");
// }