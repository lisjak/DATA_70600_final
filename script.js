var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
        console.log('hello collapse')
    });
}


console.log('loaded');

let map = L.map('map', {
  zoomControl: true
}).setView([40.7, -74.0], 12)

map.zoomControl.setPosition('topright');

let basemap_urls = {
    toner: 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png',
    osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
};

// L.tileLayer(basemap_urls.osm, {
// maxZoom: 19,
// attribution:
// '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
}).addTo(map);

// const marker = L.marker([40.74860435246981, -73.98388941596163]).addTo(map);

// const message = 'hello!';

// marker.bindPopup(`<b>CUNY GC</b> ${message}`);
// //
//show each borough on the map
// L.geoJSON(nyc, {
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup(`
//             ${feature.properties.borough}
//             <hr>
//            ${feature.properties.neighborhood}
//         `);
//     },
// }).addTo(map);

console.log('hi')
    // console.log(nychaHousing)

console.log(nyc)
console.log(nyc.data)

// console.log(sealevel2020s.data)

// add some fill color to the map
// L.geoJSON(nyc, {
//     style: function(feature) {
//         return {
//             color: "black",
//             fillColor: "white",
//             fillOpacity: 1,
//             weight: 1
//         };
//     }
// }).addTo(map).bringToBack();


// var marker = L.marker([y, x]).addTo(map);


// let sealevel2020s = axios('./data/sealevel_2020s.geojson').then((resp) => {
//     console.log(resp.data);
//     L.geoJSON(resp.data, {
//             style: function(feature) {
//                 {
//                     // switch (feature.properties.fld_zone) {
//                     //     // case 'AE':
//                     //     // case 'VE':
//                     //     // case 'AO':
//                     // case '':
//                     //     return { color: "transparent", weight: 0 };
//                     // case 'AE':
//                     // case 'VE':
//                     // case 'AO':
//                     return {
//                         color: 'blue',
//                         weight: 0,
//                         lineCap: 'square',
//                         smoothFactor: 1,
//                         opacity: 0.9,
//                     };
//                     // }
//                 }
//             },
//         })
//         .addTo(map)
//         .bringToBack();
// });

var riskMarkerYes = {
    radius: 10,
    fillColor: "blue",
    color: "white",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
};


var riskMarkerDefault = {
    radius: 5,
    fillColor: "grey",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


L.geoJSON(nychaHousing, {
        onEachFeature: function(feature, layer) {
        layer.bindPopup(`<b>Housing development name:</b> ${feature.properties.DEVELOPMENT} <b>Address:</b> ${feature.properties.ADDRESS}`);
    },
 pointToLayer: function (feature, latlng) {
    switch (feature.properties.FLOODRISK) {
        case 'YES':
         return L.circleMarker(latlng, riskMarkerYes);
        default:
            return L.circleMarker(latlng, riskMarkerDefault);
    }
    }
}
).addTo(map).bringToBack();


// show each borough on the map
// L.geoJSON(nychaHousing, {
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup(`Site name: ${feature.properties.DEVELOPMENT} <hr> Site address: ${feature.properties.ADDRESS}`);
//     }
// })
//.addTo(map);

var states = [{
        type: 'Feature',
        properties: { party: 'Republican' },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-104.05, 48.99],
                    [-97.22, 48.98],
                    [-96.58, 45.94],
                    [-104.03, 45.94],
                    [-104.05, 48.99],
                ],
            ],
        },
    },
    {
        type: 'Feature',
        properties: { party: 'Democrat' },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-109.05, 41.0],
                    [-102.06, 40.99],
                    [-102.03, 36.99],
                    [-109.04, 36.99],
                    [-109.05, 41.0],
                ],
            ],
        },
    },
];

L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican':
                return { color: '#ff0000' };
            case 'Democrat':
                return { color: '#0000ff' };
        }
    },
}).addTo(map);

// var housing_geojsonLayer = new L.GeoJSON.AJAX("/data/housing.geojson");

// sealevel_2020s_geojsonLayer.addTo(map);

// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };

// housing_geojsonLayer.addTo(map);



// L.geoJSON(nyc, {
//     style: function(feature) {
//         return {
//             color: "black",
//             fillColor: "white",
//             fillOpacity: 1,
//             weight: 1
//         };
//     }
// }).addTo(map).bringToBack();


// L.geoJSON(sealevel2020s, {
//     style: function(feature) {
//         return {
//             color: 'red',
//             weight: 0,
//             lineCap: 'square',
//             smoothFactor: 1,
//             opacity: 0.9,
//         };
//     }
// }).addTo(map).bringToBack();





let sealevel2020s = axios('./data/sealevel_2020s.geojson').then((resp) => {
    console.log(resp.data);
    L.geoJSON(resp.data, {
            style: function(feature) {
                {
                    // switch (feature.properties.fld_zone) {
                    //     // case 'AE':
                    //     // case 'VE':
                    //     // case 'AO':
                    // case '':
                    //     return { color: "transparent", weight: 0 };
                    // case 'AE':
                    // case 'VE':
                    // case 'AO':
                    return {
                        color: 'blue',
                        weight: 0,
                        lineCap: 'square',
                        smoothFactor: 1,
                        opacity: 0.9,
                    };
                    // }
                }
            },
        })
        .addTo(map)
        .bringToBack();
});

var sealevel2050s = axios('./data/sealevel_2050s.geojson').then((resp) => {
    console.log(resp.data);
    L.geoJSON(resp.data, {
            style: function(feature) {
                {
                    // switch (feature.properties.fld_zone) {
                    //     // case 'AE':
                    //     // case 'VE':
                    //     // case 'AO':
                    //     case '':
                    return {
                        color: 'cyan',
                        weight: 0,
                        lineCap: 'square',
                        smoothFactor: 1,
                    };
                    // }
                }
            },
        })
        .addTo(map)
        .bringToBack();
});

// var sealevel2050s_smooth = axios('./data/sealevel_2050s.geojson').then(resp => {
//     console.log(resp.data)
//     multiPolygon(resp.data)
// })

// var smoothed = turf.polygonSmooth(sealevel2050s_smooth, { iterations: 3 })

// L.geoJSON(smoothed, {
//     style: function(feature) {

//             return { color: "#0000ff" };
//         }
//         // }
// }).addTo(map);

var housing = axios('./data/nycha.geojson').then((resp) => {
    console.log(resp.data);
    L.geoJSON(
            resp.data, {
                style: function(feature) {
                    {
                        //         // switch (feature.properties.fld_zone) {
                        //         //     // case 'AE':
                        //         //     // case 'VE':
                        //         //     // case 'AO':
                        //         //     case '':
                        return {
                            color: 'black',
                            // weight: 0,
                            // lineCap: "square",
                            // smoothFactor: 1
                        };
                    }
                },
            }
            // }
        )
        .addTo(map)
        .bringToBack();
    // ).addTo(map);
});

// let housingLayer = L.geoJSON(housing).addTo(map);

// var sealevel_2050s_geojsonLayer = new L.GeoJSON.AJAX("/data/sealevel_2050s.geojson");

// sealevel_2050s_geojsonLayer.setStyle({ fillColor: '#000000' }).addTo(map);

// show each borough on the map
// L.geoJSON(housing, {
// onEachFeature: function(feature, layer) {
// layer.bindPopup(
// '<h3>' +
// feature.properties.borough +
// '</h3> <hr> <h3>' +
// feature.properties.neighborhood +
// '</h3>'
// );
// },
// }).addTo(nycMap);


// axios('https://raw.githubusercontent.com/Willjfield/FOSS-for-WebGIS/main/6-21/site/data/subways.geojson').then(resp => {
//     console.log(resp.data)
//     L.geoJSON(resp.data, {
//         style: function(feature) {
//             switch (feature.properties.rt_symbol) {
//                 case 'A':
//                 case 'C':
//                 case 'E':
//                     return { color: "blue" };
//                 case 'B':
//                 case 'M':
//                 case 'D':
//                     return { color: "orange" };
//                 case 'N':
//                 case 'Q':
//                 case 'R':
//                 case 'W':
//                     return { color: "yellow" };
//                 case '1':
//                 case '2':
//                 case '3':
//                     return { color: "red" };
//                 case 'J':
//                 case 'Z':
//                     return { color: "brown" };
//                 case '4':
//                 case '5':
//                 case '6':
//                     return { color: "green" };
//                 case '7':
//                     return { color: "purple" };
//                 case 'G':
//                     return { color: "lightgreen" };
//                 case 'S':
//                 case 'L':
//                     return { color: "gray" };
//                 default:
//                     return { color: "black" };

//             }
//         }
//     }).addTo(map).bringToBack();
// })

// var line1 = turf.lineString([
//     [115, -35],
//     [125, -30],
//     [135, -30],
//     [145, -35],
// ]);
// var line2 = turf.lineString([
//     [115, -25],
//     [125, -30],
//     [135, -30],
//     [145, -25],
// ]);

// var overlapping1 = turf.lineOverlap(line1, line2);

// L.geoJSON(overlapping1, {
//     // style: function(feature) {
//     //     switch (feature.properties.party) {
//     //         case 'Republican':
//     //             return { color: "#ff0000" };
//     //         case 'Democrat':
//     //             return { color: "#0000ff" };
//     //     }
//     // }
// }).addTo(map);

console.log('end000');

// var overlapping = turf.lineOverlap(housing, sealevel2020s)

console.log('end00');

// L.geoJSON(overlapping, {
//     style: function(feature) {

//             return { color: "#0000ff" };
//         }
//         // }
// }).addTo(map);

console.log('end0');

// L.control.Legend({
//     position: "bottomleft",
//     collapsed: false,
//     symbolWidth: 50,
//     legends: [{
//             label: "Sea Levels 2020s",
//             type: "polygon",
//             sides: 4,
//             fillColor: "#FF0000",
//             layers: [sealevel2020s]
//         },
//         {
//             label: "Sea Levels 2050s",
//             type: "polygon",
//             sides: 4,
//             fillColor: "orange",
//             layers: [sealevel2050s]
//         },
//         {
//             label: "NYCHA Housing",
//             type: "polyline",
//             weight: 4,
//             color: "#FF0000",
//             fillColor: "#FF0000",
//             layers: [housing],
//             inactive: true
//         }
//     ]
// }).addTo(map);

// var housing_geojsonLayer = require("/data/housing.geojson");

// console.log('end1')
// console.log(housing_geojsonLayer)

// var sealevel2050s_turf = turf.multiPolygon(housing_geojsonLayer.features.geometry.coordinates);

// console.log('end2')

// L.geoJSON(sealevel2050s_turf, {
//     style: function(feature) {

//             return { color: "#0000ff" };
//         }
//         // }
// }).addTo(map);

// console.log('end3')

// console.log('end3')
// console.log('end3')

// var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


// var baseLayers = {
//     "Mapbox": mapbox,
//     "OpenStreetMap": osm
// };

// var overlays = {
//     "Marker": marker,
//     "Roads": roadsLayer
// };

// L.control.layers(baseLayers, overlays).addTo(map);






// var intersection = turf.lineIntersect(nychaHousing.toGeoJSON(), sealevel2020s.toGeoJSON());
// var intersectionCoord = intersection.features[0].geometry.coordinates;

// intersectionCoord
// console.log('end-intersect')

//===========================================================================================

// L.control
//     .Legend({
//         position: 'bottomleft',
//         collapsed: false,
//         symbolWidth: 50,
//         legends: [{
//                 label: 'Sea Levels 2020s',
//                 type: 'polygon',
//                 sides: 4,
//                 fillColor: 'blue',
//                 layers: [sealevel2020s],
//             },
//             {
//                 label: 'Sea Levels 2050s',
//                 type: 'polygon',
//                 sides: 4,
//                 fillColor: 'cyan',
//                 layers: [sealevel2050s],
//             },
//             {
//                 label: 'NYCHA Housing',
//                 type: 'polyline',
//                 weight: 4,
//                 color: '#FF0000',
//                 fillColor: '#FF0000',
//                 layers: [housing],
//                 inactive: true,
//             },
//         ],
//     })
//     .addTo(map);

(function(factory, window) {
    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);

        // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== 'undefined' && window.L) {
        factory(L);
    }
})(function(L) {
    class LegendSymbol {
        constructor(control, container, legend) {
            this._control = control;
            this._container = container;
            this._legend = legend;
            this._width = this._control.options.symbolWidth;
            this._height = this._control.options.symbolHeight;
        }
    }

    class GeometricSymbol extends LegendSymbol {
        constructor(control, container, legend) {
            super(control, container, legend);

            this._canvas = this._buildCanvas();
            if (this._drawSymbol) {
                this._drawSymbol();
            }
            this._style();
        }

        _buildCanvas() {
            var canvas = L.DomUtil.create('canvas', null, this._container);
            canvas.height = this._control.options.symbolHeight;
            canvas.width = this._control.options.symbolWidth;
            return canvas;
        }

        _drawSymbol() {}

        _style() {
            var ctx = (this._ctx = this._canvas.getContext('2d'));
            if (this._legend.fill || this._legend.fillColor) {
                ctx.globalAlpha = this._legend.fillOpacity || 1;
                ctx.fillStyle = this._legend.fillColor || this._legend.color;
                ctx.fill(this._legend.fillRule || 'evenodd');
            }

            if (this._legend.stroke || this._legend.color) {
                if (this._legend.dashArray) {
                    ctx.setLineDash(this._legend.dashArray || []);
                }
                ctx.globalAlpha = this._legend.opacity || 1.0;
                ctx.lineWidth = this._legend.weight || 2;
                ctx.strokeStyle = this._legend.color || '#3388ff';
                ctx.lineCap = this._legend.lineCap || 'round';
                ctx.lineJoin = this._legend.lineJoin || 'round';
                ctx.stroke();
            }
        }

        rescale() {}

        center() {}
    }

    class CircleSymbol extends GeometricSymbol {
        _drawSymbol() {
            var ctx = (this._ctx = this._canvas.getContext('2d'));

            var legend = this._legend;
            var linelWeight = legend.weight || 3;

            var centerX = this._control.options.symbolWidth / 2;
            var centerY = this._control.options.symbolHeight / 2;
            var maxRadius = Math.min(centerX, centerY) - linelWeight;
            var radius = maxRadius;
            if (legend.radius) {
                radius = Math.min(legend.radius, maxRadius);
            }

            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        }
    }

    class PolylineSymbol extends GeometricSymbol {
        _drawSymbol() {
            var ctx = (this._ctx = this._canvas.getContext('2d'));

            var x1 = 0;
            var x2 = this._control.options.symbolWidth;
            var y = this._control.options.symbolHeight / 2;

            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
        }
    }

    class RectangleSymbol extends GeometricSymbol {
        _drawSymbol() {
            var ctx = (this._ctx = this._canvas.getContext('2d'));
            var linelWeight = this._legend.weight || 3;

            var x0 = this._control.options.symbolWidth / 2;
            var y0 = this._control.options.symbolHeight / 2;

            var rx = x0 - linelWeight;
            var ry = y0 - linelWeight;
            if (rx == ry) {
                ry = ry / 2;
            }
            ctx.rect(x0 - rx, y0 - ry, rx * 2, ry * 2);
        }
    }

    /**
     * 圆心坐标：(x0,y0) 半径：r 角度(X轴顺时针旋转)：a
     * 弧度 = 角度 * Math.PI / 180
     * 则圆上任一点为：（x1,y1）
     * x1   =   x0   +   r   *   Math.cos( a  * Math.PI / 180)
     * y1   =   y0   +   r   *   Math.sin( a  * Math.PI / 180)
     */
    class PolygonSymbol extends GeometricSymbol {
        _drawSymbol() {
            var ctx = (this._ctx = this._canvas.getContext('2d'));

            var linelWeight = this._legend.weight || 3;
            var x0 = this._control.options.symbolWidth / 2;
            var y0 = this._control.options.symbolHeight / 2;
            var r = Math.min(x0, y0) - linelWeight;
            var a = 360 / this._legend.sides;
            ctx.beginPath();
            for (var i = 0; i <= this._legend.sides; i++) {
                var x1 = x0 + r * Math.cos(((a * i + (90 - a / 2)) * Math.PI) / 180);
                var y1 = y0 + r * Math.sin(((a * i + (90 - a / 2)) * Math.PI) / 180);
                if (i == 0) {
                    ctx.moveTo(x1, y1);
                } else {
                    ctx.lineTo(x1, y1);
                }
            }
        }
    }

    class ImageSymbol extends LegendSymbol {
        constructor(control, container, legend) {
            super(control, container, legend);
            this._img = null;
            this._loadImages();
        }

        _loadImages() {
            var imageLoaded = () => {
                this.rescale();
            };
            var img = L.DomUtil.create('img', null, this._container);
            this._img = img;
            img.onload = imageLoaded;
            img.src = this._legend.url;
        }

        rescale() {
            if (this._img) {
                var _options = this._control.options;
                if (
                    this._img.width > _options.symbolWidth ||
                    this._img.height > _options.symbolHeight
                ) {
                    var imgW = this._img.width;
                    var imgH = this._img.height;
                    var scaleW = _options.symbolWidth / imgW;
                    var scaleH = _options.symbolHeight / imgH;
                    var scale = Math.min(scaleW, scaleH);
                    this._img.width = imgW * scale;
                    this._img.height = imgH * scale;
                }
                this.center();
            }
        }

        center() {
            var containerCenterX = this._container.offsetWidth / 2;
            var containerCenterY = this._container.offsetHeight / 2;
            var imageCenterX = parseInt(this._img.width) / 2;
            var imageCenterY = parseInt(this._img.height) / 2;

            var shiftX = containerCenterX - imageCenterX;
            var shiftY = containerCenterY - imageCenterY;

            this._img.style.left = shiftX.toString() + 'px';
            this._img.style.top = shiftY.toString() + 'px';
        }
    }

    L.Control.Legend = L.Control.extend({
        options: {
            position: 'topleft',
            title: 'Layers Legend',
            legends: [],
            symbolWidth: 24,
            symbolHeight: 24,
            opacity: 1.0,
            column: 1,
            collapsed: false,
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._legendSymbols = [];
            this._buildContainer();
        },

        onAdd: function(map) {
            this._map = map;
            this._initLayout();
            return this._container;
        },

        _buildContainer: function() {
            this._container = L.DomUtil.create(
                'div',
                'leaflet-legend leaflet-bar leaflet-control'
            );
            this._container.style.backgroundColor =
                'rgba(255,255,255, ' + this.options.opacity + ')';

            this._contents = L.DomUtil.create(
                'section',
                'leaflet-legend-contents',
                this._container
            );
            this._link = L.DomUtil.create(
                'a',
                'leaflet-legend-toggle',
                this._container
            );
            this._link.title = 'Layers Legend';
            this._link.href = '#';

            var title = L.DomUtil.create(
                'h3',
                'leaflet-legend-title',
                this._contents
            );
            title.innerText = this.options.title || 'Layers Legend';

            var len = this.options.legends.length;
            var colSize = Math.ceil(len / this.options.column);
            var legendContainer = this._contents;
            for (var i = 0; i < len; i++) {
                if (i % colSize == 0) {
                    legendContainer = L.DomUtil.create(
                        'div',
                        'leaflet-legend-column',
                        this._contents
                    );
                }
                var legend = this.options.legends[i];
                this._buildLegendItems(legendContainer, legend);
            }
        },

        _buildLegendItems: function(legendContainer, legend) {
            var legendItemDiv = L.DomUtil.create(
                'div',
                'leaflet-legend-item',
                legendContainer
            );
            if (legend.inactive) {
                L.DomUtil.addClass(legendItemDiv, 'leaflet-legend-item-inactive');
            }
            var symbolContainer = L.DomUtil.create('i', null, legendItemDiv);

            var legendSymbol;
            if (legend.type === 'image') {
                legendSymbol = new ImageSymbol(this, symbolContainer, legend);
            } else if (legend.type === 'circle') {
                legendSymbol = new CircleSymbol(this, symbolContainer, legend);
            } else if (legend.type === 'rectangle') {
                legendSymbol = new RectangleSymbol(this, symbolContainer, legend);
            } else if (legend.type === 'polygon') {
                legendSymbol = new PolygonSymbol(this, symbolContainer, legend);
            } else if (legend.type === 'polyline') {
                legendSymbol = new PolylineSymbol(this, symbolContainer, legend);
            } else {
                L.DomUtil.remove(legendItemDiv);
                return;
            }
            this._legendSymbols.push(legendSymbol);

            symbolContainer.style.width = this.options.symbolWidth + 'px';
            symbolContainer.style.height = this.options.symbolHeight + 'px';

            var legendLabel = L.DomUtil.create('span', null, legendItemDiv);
            legendLabel.innerText = legend.label;
            if (legend.layers) {
                L.DomUtil.addClass(legendItemDiv, 'leaflet-legend-item-clickable');
                L.DomEvent.on(
                    legendItemDiv,
                    'click',
                    function() {
                        this._toggleLegend.call(this, legendItemDiv, legend.layers);
                    },
                    this
                );
            }
        },

        _initLayout: function() {
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.disableScrollPropagation(this._container);

            if (this.options.collapsed) {
                this._map.on('click', this.collapse, this);

                L.DomEvent.on(
                    this._container, {
                        mouseenter: this.expand,
                        mouseleave: this.collapse,
                    },
                    this
                );
            } else {
                this.expand();
            }
        },

        _toggleLegend: function(legendDiv, layers) {
            if (L.DomUtil.hasClass(legendDiv, 'leaflet-legend-item-inactive')) {
                L.DomUtil.removeClass(legendDiv, 'leaflet-legend-item-inactive');
                if (L.Util.isArray(layers)) {
                    for (var i = 0, len = layers.length; i < len; i++) {
                        this._map.addLayer(layers[i]);
                    }
                } else {
                    this._map.addLayer(layers);
                }
            } else {
                L.DomUtil.addClass(legendDiv, 'leaflet-legend-item-inactive');
                if (L.Util.isArray(layers)) {
                    for (var i = 0, len = layers.length; i < len; i++) {
                        this._map.removeLayer(layers[i]);
                    }
                } else {
                    this._map.removeLayer(layers);
                }
            }
        },

        expand: function() {
            this._link.style.display = 'none';
            L.DomUtil.addClass(this._container, 'leaflet-legend-expanded');
            for (var legendSymbol of this._legendSymbols) {
                legendSymbol.rescale();
            }
            return this;
        },

        collapse: function() {
            this._link.style.display = 'block';
            L.DomUtil.removeClass(this._container, 'leaflet-legend-expanded');
            return this;
        },

        redraw: function() {
            L.DomUtil.empty(this._contents);
            this._buildLegendItems();
        },
    });

    L.control.legend = L.control.Legend = function(options) {
        return new L.Control.Legend(options);
    };
}, window);

L.control
    .Legend({
        position: 'bottomleft',
        collapsed: false,
        symbolWidth: 50,
        legends: [{
                label: 'Flood Plain 2020s',
                type: 'polygon',
                sides: 4,
                fillColor: 'blue',
                layers: [sealevel2020s],
            },
            {
                label: 'Flood Plain 2050s',
                type: 'polygon',
                sides: 4,
                fillColor: 'cyan',
                layers: [sealevel2050s],
            },
            {
                label: 'NYCHA Housing Polygon',
                type: 'polyline',
                weight: 2,
                color: 'black',
                fillColor: 'black',
                layers: [housing],
                // inactive: true,
            },
                        {
                label: 'NYCHA Housing',
                type: 'circle',
                weight: 2,
                color: 'black',
                fillColor: 'grey',
                layers: [housing],
                // inactive: true,
            },
                        {
                label: 'NYCHA Housing - At Risk',
                type: 'circle',
                weight: 2,
                color: 'white',
                fillColor: 'blue',
                layers: [housing],
                // inactive: true,
            },
        ],
    })
    .addTo(map);

console.log('end final')