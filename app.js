// Initialize the map
var map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Load GeoJSON data from file
var geojsonLayer = L.geoJSON(geodata, 
    {
        style: function (feature) {
            // Customize this function based on the properties of your GeoJSON
            var value = feature.properties["Tình trạng đơn"];
            var color = 'gray'

            if (value === 'Đã trao'){
                color = 'green'
            } else if (value === 'Đã duyệt'){
                color = 'blue'
            } else {
                color = 'gray'
            }

            return {
                fillColor: color,
                weight: 2,
                opacity: 1,
                color: color,
                fillOpacity: 0.5
            };
        },
        onEachFeature: onEachFeature
    }).addTo(map);


// Function to handle click events on polygons
function onEachFeature(feature, layer) {
    layer.bindPopup(createPopupContent(feature));
}

// Function to create the content for the popup
function createPopupContent(feature) {
    // Customize this function based on the properties of your GeoJSON
    var content = '<h3>Thông tin</h3>';
    
    // Create a container with class popup-content
    content += '<div class="popup-content">';
    
    // Create a table with properties
    content += '<table>';
    for (var key in feature.properties) {
        if (feature.properties.hasOwnProperty(key)) {
            content += '<tr><td>' + key + '</td><td>' + feature.properties[key] + '</td></tr>';
        }
    }
    content += '</table>';
    
    // Close the container
    content += '</div>';

    return content;
}

function autoZoomToPolygons() {
    var bounds = L.geoJSON(geodata).getBounds();
    map.fitBounds(bounds);
}

autoZoomToPolygons()
