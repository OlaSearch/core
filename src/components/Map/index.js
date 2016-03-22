import React from 'react';
import GoogleMaps from './utils/loader';

class Map extends React.Component{

    constructor( props ){
        super(props)

        this.markers = [];

        this.places = [];
    }

    componentDidMount(){

        let { apiKey } = this.props;

        GoogleMaps.load({ apiKey }, this.initMap)

    }

    componentDidUpdate(){

        this.updateMap()
    }

    handleMarkerClick = ( marker ) => {

        this.infowindow.setContent(marker.title);
        this.infowindow.open( this.map, marker)
    };

    handleMapClick = ( event ) => {

        if(this.infowindow) this.infowindow.close()
    };

    updateMap = () => {

        let { results } = this.props;

        if(this.map){

            results.forEach( result => {

                let { location, title, placeId } = result;

                if(location) {
                    
                    let [ lat, lng ] = location.split(',');
                    let position = {lat: parseFloat(lat), lng: parseFloat(lng)};                                        
                    
                    let marker = new google.maps.Marker({
                        position: position,
                        map: this.map,
                        title: title
                    });

                    let handleMarkerClick = this.handleMarkerClick.bind(this, marker);

                    marker.addListener('click', handleMarkerClick);

                    this.markers.push( marker )

                    this.places.push( placeId )

                    // this.bounds.extend( position )
                }
            })

            // this.map.fitBounds( this.bounds );
        }

    };

    initMap = () => {

        this.map = new google.maps.Map( this.refs.map, {
          center: {lat: -34.0622928, lng: 23.3755341},
          zoom: 8
        });

        this.map.addListener('click', this.handleMapClick)

        // this.bounds = new google.maps.LatLngBounds();
        
        this.infowindow = new google.maps.InfoWindow({
            content: 'Loading'
        });


        var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.CIRCLE,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    draggable: true,
                    drawingModes: [
                        google.maps.drawing.OverlayType.CIRCLE
                    ]
                },
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0,
                    strokeWeight: 2,
                    clickable: true,
                    editable: true,
                    zIndex: 1
                }
        });

        drawingManager.setMap( this.map )

        drawingManager.setDrawingMode(null);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
            
            this.onDragEnd.call(this, event.overlay );
            
            // Switch back to non-drawing mode after drawing a shape.
            
            drawingManager.setDrawingMode(null);
        });

        google.maps.event.addListener(drawingManager, 'circlecomplete', circle => {
            
            google.maps.event.addListener(circle, 'radius_changed', () => this.onDragEnd.call(this, circle) );
            google.maps.event.addListener(circle, 'center_changed', () => this.onDragEnd.call(this, circle) );

        })

        this.updateMap();
    };

    onDragEnd = ( circle ) => {

        let { onCircleDragEnd } = this.props;

        let center = circle.center;
        let radius = circle.radius;

        onCircleDragEnd && onCircleDragEnd.call(this, center, radius)
    };

    render(){

        var { results } = this.props;

        return (
            <div className="ola-map">

                <div id="map" ref = "map" style = {{ width: '100%', height: '400'}}></div>
            </div>
        )
    }
}

module.exports = Map