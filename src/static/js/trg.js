import $ from 'jquery';
import Konva from 'konva';
import changeTRGDigitizationAnalysisType from './case'
let scaleBy = 1.1;
let strokeWidth = 0.2;
let circleRadius = 3;
let caseId = 1306
// let changeTRGDigitizationAnalysisType = undefined
function magnifyWheel(stage, e) {
    e.evt.preventDefault();
    let oldScale = stage.scaleX();
    let pointer = stage.getPointerPosition();

    let mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
        direction = -direction;
    }

    let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    let newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };

    magnify(stage, newScale, newPos);
}

function magnify(stage, scale, pos) {
    if (scale < 0.7 || scale > 10) {
        return;
    }

    stage.scale({ x: scale, y: scale });
    if (pos !== null) {
        stage.position(pos);
    }
}

function updateLine(layer, magnifierLayer, circleTypeToPoint, circleTypeToPosition, point1, point2, extension) {
    if (circleTypeToPosition[point1] === undefined || circleTypeToPosition[point2] === undefined
        || !circleTypeToPoint.hasOwnProperty(point1) || !circleTypeToPoint.hasOwnProperty(point2)) {
        return;
    }
    let connector = layer.findOne(`#connector-${point1}-${point2}`);
    if (connector === undefined) {
        connector = new Konva.Line({
            stroke: '#00008b',
            id: `connector-${point1}-${point2}`,
            fill: 'black',
            dash: [10, 5],
            strokeWidth: strokeWidth * 4,
        });
        layer.add(connector);
        connector.zIndex(0);
        if (magnifierLayer !== null && magnifierLayer !== undefined) {
            let magnifierLine = connector.clone({listening: false});
            magnifierLine.strokeWidth(strokeWidth);
            magnifierLayer.add(magnifierLine);
        }
    }

    if (connector !== undefined) {
        const points = getConnectorPoints(
            circleTypeToPosition[point1],
            circleTypeToPosition[point2],
            extension
        );
        connector.points(points);
        connector.show();
        if (magnifierLayer !== null && magnifierLayer !== undefined) {
            magnifierLayer.findOne(`#connector-${point1}-${point2}`).points(points);
            magnifierLayer.findOne(`#connector-${point1}-${point2}`).show();
        }
    }
}

function updateMeasurement(distanceName, value, measurementType) {
    distanceName = escapeCharacters(distanceName);
    let distanceTr = $(`#${measurementType}-${distanceName}-tr`);
    if (distanceTr.length <= 0) return;

    if (value === undefined) {
        distanceTr.children().eq(2).html("");
    }
    distanceTr.children().eq(2).html(value);
}

function updateAngle3Points(layer, circleTypeToPoint, circleTypeToPosition, point1, middlePoint, point2, angleName, textPosition, complementary) {
    angleName = escapeCharacters(angleName);
    let angleTr = $(`#angle-${angleName}-tr`);
    if (angleTr.length <= 0) return;

    if (circleTypeToPosition[middlePoint] === undefined
        || circleTypeToPosition[point1] === undefined || circleTypeToPosition[point2] === undefined) {
        angleTr.children().eq(2).html("");
        return;
    }

    let angle = getAngle(
        circleTypeToPosition[middlePoint],
        circleTypeToPosition[point1],
        circleTypeToPosition[point2]);
    if (complementary) {
        if (angle > 90) {
            angle = 180 - 90;
        }
        angle = 90 - angle;
    }

    if (angleTr.length > 0) {
        angleTr.children().eq(2).html(`${angle}`);
    }
}

function updateAngle2Lines(layer, circleTypeToPoint, circleTypeToPosition, line1point1, line1point2, line2point1, line2point2, angleName, textPosition, complementary) {
    angleName = escapeCharacters(angleName);
    let angleTr = $(`#angle-${angleName}-tr`);
    if (angleTr.length <= 0) return;

    if (circleTypeToPosition[line1point1] === undefined || circleTypeToPosition[line1point2] === undefined
        || circleTypeToPosition[line2point1] === undefined || circleTypeToPosition[line2point2] === undefined) {
        angleTr.children().eq(2).html("");
        return;
    }

    let intersection = getIntersection(
        circleTypeToPosition[line1point1], circleTypeToPosition[line1point2],
        circleTypeToPosition[line2point1], circleTypeToPosition[line2point2]
    );
    let angle;
    if (intersection === undefined) {
        angle = undefined;
    }
    else {
        angle = getAngle(intersection, circleTypeToPosition[line1point1], circleTypeToPosition[line2point1]);
    }

    if (angleTr.length > 0) {
        if (angle === undefined) {
            angleTr.children().eq(2).html("");
        } else {
            angleTr.children().eq(2).html(angle);
        }
    }
}

function updateAngleTriangle(layer, circleTypeToPoint, circleTypeToPosition, angleName, textPosition, complementary) {
    angleName = escapeCharacters(angleName);
    let angleTr = $(`#angle-${angleName}-tr`);
    if (angleTr.length <= 0) return;

    if (circleTypeToPosition['or'] === undefined || circleTypeToPosition['po'] === undefined
        || circleTypeToPosition['me'] === undefined || circleTypeToPosition['go'] === undefined
        || circleTypeToPosition['li'] === undefined || circleTypeToPosition['lai'] === undefined) {
        angleTr.children().eq(2).html("");
        return;
    }

    let intersection1 = getIntersection(
        circleTypeToPosition['or'], circleTypeToPosition['po'],
        circleTypeToPosition['me'], circleTypeToPosition['go']
    );
    let intersection2 = getIntersection(
        circleTypeToPosition['or'], circleTypeToPosition['po'],
        circleTypeToPosition['li'], circleTypeToPosition['lai']
    );
    let intersection3 = getIntersection(
        circleTypeToPosition['li'], circleTypeToPosition['lai'],
        circleTypeToPosition['me'], circleTypeToPosition['go']
    );
    let angle1, angle2, angle3;
    if (intersection1 === undefined) {
        angle1 = undefined;
    }
    else {
        angle1 = getAngle(intersection1, circleTypeToPosition['or'], circleTypeToPosition['me']);
    }
    if (intersection2 === undefined) {
        angle2 = undefined;
    }
    else {
        angle2 = getAngle(intersection2, circleTypeToPosition['or'], circleTypeToPosition['li']);
    }
    if (intersection3 === undefined) {
        angle3 = undefined;
    }
    else {
        angle3 = getAngle(intersection1, circleTypeToPosition['li'], circleTypeToPosition['me']);
    }

    if (angleTr.length > 0) {
        if (angle1 === undefined || angle2 === undefined || angle3 === undefined) {
            angleTr.children().eq(2).html("");
        } else {
            angleTr.children().eq(2).html(parseFloat(angle1) + parseFloat(angle2) + parseFloat(angle3));
        }
    }
}

function lenSegment(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function getIntersection(p1, p2, p3, p4) {
    let denom = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    if (denom === 0) {
        return undefined;
    }
    return {
        "x": ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) / denom,
        "y": ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) / denom
    };
}

function getAngle(p1, p2, p3) {
    let p12 = lenSegment(p1, p2);
    let p23 = lenSegment(p2, p3);
    let p13 = lenSegment(p1, p3);
    return (Math.acos((p12*p12 + p13*p13 - p23*p23)/(2 * p12 * p13)) / Math.PI * 180).toFixed(2);
}

function getConnectorPoints(from, to, extension) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = circleRadius;

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + extension * Math.cos(angle),
        to.y + -extension * Math.sin(angle),
    ];
}

function drawPoints(layer, magnifierLayer, imgSizes, containerSizes, pointToCircleType, circleTypeToPosition, circleType, points) {
    points["points"].forEach((point) => {
        if (imgSizes.width === undefined || imgSizes.height === undefined) {
            return;
        }
        if (!pointToCircleType.hasOwnProperty(point.name)) {
            return;
        }
        let pointCircleType = pointToCircleType[point.name];
        let circle = layer.findOne(`#${pointCircleType}`);
        let pointText = layer.findOne(`#${pointCircleType}-text`);
        if (circle === undefined) {
            circle = new Konva.Circle({
                id: pointCircleType,
                x: point.data[0] * containerSizes.ratio,
                y: point.data[1] * containerSizes.ratio,
                fill: pointCircleType === circleType ? 'rgba(255,0,0,1)' : 'rgba(0,255,0,0.5)',
                radius: circleRadius,
                name: 'point'
            });
            let pointText = new Konva.Text({
                x: point.data[0] * containerSizes.ratio + circleRadius,
                y: point.data[1] * containerSizes.ratio,
                text: `${pointCircleType}`,
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: 'green',
                id: `${pointCircleType}-text`,
            });
            layer.add(circle);
            layer.add(pointText);
            pointText.zIndex(0);
            circle.zIndex(1);

            if (magnifierLayer !== null && magnifierLayer !== undefined) {
                magnifierLayer.add(circle.clone({ listening: false }));
                magnifierLayer.add(pointText.clone({ listening: false }));
            }
        }
        else {
            circle.x(point.data[0] * containerSizes.ratio);
            circle.y(point.data[1] * containerSizes.ratio);
            pointText.x(point.data[0] * containerSizes.ratio + circleRadius);
            pointText.y(point.data[1] * containerSizes.ratio);
            circle.show();
            pointText.show();

            if (magnifierLayer !== null && magnifierLayer !== undefined) {
                magnifierLayer.findOne(`#${pointCircleType}`).x(point.data[0] * containerSizes.ratio);
                magnifierLayer.findOne(`#${pointCircleType}`).y(point.data[1] * containerSizes.ratio);
                magnifierLayer.findOne(`#${pointCircleType}-text`).x(point.data[0] * containerSizes.ratio + circleRadius);
                magnifierLayer.findOne(`#${pointCircleType}-text`).y(point.data[1] * containerSizes.ratio);
                magnifierLayer.findOne(`#${pointCircleType}`).show();
                magnifierLayer.findOne(`#${pointCircleType}-text`).show();
            }
        }
        circleTypeToPosition[pointCircleType] = circle.position();
    });
}

function updatePoints(layer, magnifierLayer, stage, circleTypeToPosition, circleType, newPosition, needText) {
    let circle = layer.findOne(`#${circleType}`);
    let pointText = layer.findOne(`#${circleType}-text`);

    if (circle === undefined) {
        circle = new Konva.Circle({
            id: circleType,
            x: newPosition.x,
            y: newPosition.y,
            fill: 'rgba(255,0,0,1)',
            radius: circleRadius,
            name: 'point'
        });
        layer.add(circle);
        circle.zIndex(1);

        if (magnifierLayer !== null && magnifierLayer !== undefined) {
            magnifierLayer.add(circle.clone({listening: false}));
        }

        if (needText) {
            pointText = new Konva.Text({
                x: newPosition.x + circleRadius,
                y: newPosition.y,
                text: `${circleType}`,
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: 'green',
                id: `${circleType}-text`
            });
            layer.add(pointText);
            pointText.zIndex(0);

            if (magnifierLayer !== null && magnifierLayer !== undefined) {
                magnifierLayer.add(pointText.clone({listening: false}));
            }
        }
    } else {
        circle.x(newPosition.x);
        circle.y(newPosition.y);

        if (magnifierLayer !== null && magnifierLayer !== undefined) {
            magnifierLayer.findOne(`#${circleType}`).x(newPosition.x);
            magnifierLayer.findOne(`#${circleType}`).y(newPosition.y);
        }
        if (needText) {
            pointText.x(newPosition.x + circleRadius);
            pointText.y(newPosition.y);

            if (magnifierLayer !== null && magnifierLayer !== undefined) {
                magnifierLayer.findOne(`#${circleType}-text`).x(newPosition.x + circleRadius);
                magnifierLayer.findOne(`#${circleType}-text`).y(newPosition.y);
            }
        }
    }
    circleTypeToPosition[circleType] = circle.position();
}

export default function loadImage(layer, imageLayer, magnifierLayer, magnifierImageLayer, imgSizes, containerSizes, pointToCircleType, circleTypeToPosition, circleType, url, updateLines, updateMeasurements, isDigitization) {
    let img = new Image();
    img.src = url;
    img.onload = function () {
        imgSizes.width = img.width;
        imgSizes.height = img.height;
        containerSizes.ratio = containerSizes.height / imgSizes.height;
        // now load the Konva image
        let theImg = new Konva.Image({
            image: img,
            x: 0,
            y: 0,
            width: imgSizes.width * containerSizes.ratio,
            height: imgSizes.height * containerSizes.ratio
        });
        imageLayer.removeChildren();
        imageLayer.add(theImg);

        if (magnifierImageLayer !== null && magnifierImageLayer !== undefined) {
            magnifierImageLayer.removeChildren();
            magnifierImageLayer.add(theImg.clone({listening: false}));
        }
        if (isDigitization) {
            $.getJSON(`/s3/cases/${caseId}/trg/points.json`, function(points) {
                drawPoints(layer, magnifierLayer, imgSizes, containerSizes, pointToCircleType, circleTypeToPosition, circleType, points);
                updateLines();
                updateMeasurements();
                hideAll(layer, magnifierLayer);
                changeTRGDigitizationAnalysisType(document.getElementById('trg-digitization-analysis-type').options[document.getElementById('trg-digitization-analysis-type').selectedIndex].value);
            });
        }

    }
}

function dotProduct(point1, point2) {
    return point1.x * point2.x + point1.y * point2.y;
}

function getDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    return Math.sqrt(dy * dy + dx * dx);
}

function getDistanceFromPointToLine(linePoint1, linePoint2, point) {
    const numerator = Math.abs((linePoint2.x - linePoint1.x)*(linePoint1.y - point.y) - (linePoint1.x - point.x)*(linePoint2.y - linePoint1.y));
    const denominator = getDistance(linePoint2, linePoint1);

    return numerator / denominator;
}

function getProjectionFromPointToLine(linePoint1, linePoint2, point) {
    let m = (linePoint2.y - linePoint1.y) / (linePoint2.x - linePoint1.x);
    let b = linePoint1.y - (m * linePoint1.x);
    return {
        x: (m * point.y + point.x - m * b) / (m * m + 1),
        y: (m * m * point.y + m * point.x + b) / (m * m + 1),
    }
}

function hideAll(layer, magnifierLayer) {
    layer.find('Circle,Line,Text').forEach(function(circle) {
        circle.hide();
    });
    if (magnifierLayer !== null && magnifierLayer !== undefined) {
        magnifierLayer.find('Circle,Line,Text').forEach(function(circle) {
            circle.hide();
        });
    }
}

function extractData(layer, containerSizes, circleTypeToPoint) {
    let points = {
        "points": [],
        "angles": [],
    };

    layer.find('Circle').forEach(function(circle) {
        points["points"].push({
            "name": circleTypeToPoint[circle.id()],
            "data": [circle.x() / containerSizes.ratio, circle.y() / containerSizes.ratio]
        });
    });

    $('#trg-digitization-info-table tbody').children().each(function() {
        points["angles"].push({
            "name": $(this).children().eq(0).html(),
            "data": $(this).children().eq(2).html(),
        });
    });
    return points;
}

function escapeCharacters( str ) {
    return (str + '').replace(/[\\"'\/ ]/g, '\\$&').replace(/\u0000/g, '\\0');
}

function chooseCircleType(e) {
    // console.log(this);
    console.log(this.attrs.id);
}