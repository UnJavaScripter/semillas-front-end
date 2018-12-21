import {Component, OnInit, AfterViewInit} from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { element } from '@angular/core/src/render3/instructions';
import { semillaInfo } from '../models/semillaInfo';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl:'./map.component.html',
  styleUrls:['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
/// default settings 4.7258806,-74.2677694,15z
  map: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/satellite-streets-v9';
  currentSemilla:semillaInfo;
  lat = 17.760267;
  lng = -29.72925;
  objectsAddedToMap=[];
  objetosAnteriores;
  navigationSubscription;
  geojson2= {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Semilla",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40],
                "urlID": "edb76afd399b272b5f1090bd661c0447"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                  -74.2677694,15,
                    4.7258806
                ]
            }
        }
    ]
};
  geojson={
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [60, 60],
                "urlID": "6e0f6f63b0f2b8f1ef2eed991dcc75dc",
                "imagen":"",
                "audio1":""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    28.0289837,
                    1.6666663

                     
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar",
                "iconSize": [50, 50],
                "urlID": "f983bd17f999197fbe7ae42f45571deb"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -61.2158203125,
                    -15.97189158092897
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40],
                "urlID": "edb76afd399b272b5f1090bd661c0447"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -63.29223632812499,
                    -18.28151823530889
                ]
            }
        }
    ]
};
  constructor(public router: Router,private route:ActivatedRoute, private location: Location, private serviceSemillas:MapService ) {
   
    mapboxgl.accessToken = environment['mapbox'].accessToken;
    this.map= mapboxgl.Map;
   
    
  }
  ngAfterViewInit(){
    
  }
  ngOnInit() {
    this.initializeMap();
    console.log(this.route.snapshot.params.id)
    if( !(typeof this.route.snapshot.params.id === "undefined")){
       this.displayContent(this.route.snapshot.params.id)
    }

  }
  
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }
  public buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 3,
      center: [this.lng, this.lat]
    });
    
    this.pintarMarkers();
   
  
  }
  public pintarMarkers(){
    if(this.objetosAnteriores){
        this.objectsAddedToMap = this.objetosAnteriores;
        this.objectsAddedToMap.forEach((marker)=>{
            marker.addTo(this.map);
        })
        return;
        }
    this.geojson.features.forEach((marker)=>{
        var coloresSemillas = ['amarillo','blanco','verde','naranja'];
        var rand = coloresSemillas[Math.floor(Math.random() * coloresSemillas.length)];
        var el = document.createElement('div');
        el.innerHTML = 
        `<svg width="40" height="130" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

        <path style="fill:var(--color-${rand}" d="m16.4547,20.46156a8.40682,8.40682 0 0 0 -0.73364,-1.01971c-1.40729,-1.46266 -2.84226,-2.89763 -4.25878,-4.35106c-1.28732,-1.31962 -2.5931,-2.6254 -3.83429,-3.98655a4.43873,4.43873 0 0 1 -0.84437,-1.52264a1.04278,1.04278 0 0 1 0.46141,-1.33808a1.00586,1.00586 0 0 1 1.18581,0.35528c0.89051,0.8859 1.76719,1.78103 2.63924,2.68538q3.38672,3.50207 6.76883,7.00876c0.22147,0.2307 0.46141,0.42449 0.83976,0.74748a3.49285,3.49285 0 0 0 0.2307,-0.81669q-0.13381,-6.695 -0.2953,-13.38078q0,-0.99664 -0.02307,-1.99327a1.12122,1.12122 0 0 1 0.79362,-1.19504a1.49495,1.49495 0 0 1 1.49034,0.50293a2.89763,2.89763 0 0 1 0.51677,1.88254c0,1.73489 0,3.46977 0.02768,5.20466q0.05998,4.31876 0.17072,8.63291a2.43161,2.43161 0 0 0 0.30914,0.77055a2.51928,2.51928 0 0 0 0.72902,-0.35528c3.09604,-3.10988 6.17362,-6.24283 9.26965,-9.3527a7.5809,7.5809 0 0 1 1.28732,-1.03816a1.27348,1.27348 0 0 1 1.60569,0.22609a1.02894,1.02894 0 0 1 -0.19379,1.38422c-1.22734,1.22273 -2.47775,2.427 -3.72355,3.63127q-2.27012,2.19168 -4.54485,4.36952c-0.63674,0.60906 -1.29194,1.20427 -1.91945,1.84562c-0.26762,0.26762 -0.46141,0.5906 -0.86283,1.07508a8.41605,8.41605 0 0 0 1.0843,0q5.49535,-0.89513 10.98147,-1.80871a5.13545,5.13545 0 0 1 0.54907,-0.0323c0.42911,-0.02307 0.83053,0.02768 0.97357,0.52139a0.95511,0.95511 0 0 1 -0.46141,1.23657a6.32588,6.32588 0 0 1 -1.55955,0.50293c-2.60233,0.48448 -5.20928,0.92281 -7.81161,1.38422a12.15805,12.15805 0 0 1 -1.84562,0.28146c-1.58262,0.0323 -2.79612,0.79823 -3.8389,1.87792a1.84562,1.84562 0 0 0 -0.46141,1.05201c-0.06921,0.73364 0,1.4765 0,2.21475q0.05076,20.20959 0.11074,40.41918c0.02768,6.7919 0.11997,13.5838 0.14765,20.3757a2.30703,2.30703 0 0 0 1.13506,2.19629a3.54821,3.54821 0 0 1 1.2458,1.63338a13.84219,13.84219 0 0 1 0.92281,3.28521a54.09987,54.09987 0 0 1 0.60444,6.71346c0.03691,5.57379 -0.0646,11.14296 -0.14765,16.71675a18.35474,18.35474 0 0 1 -0.92281,5.66145a11.12912,11.12912 0 0 1 -1.25041,2.57003c-0.96434,1.43959 -2.44084,1.81794 -4.08806,1.64722a2.30703,2.30703 0 0 1 -1.76257,-1.21811a14.43279,14.43279 0 0 1 -1.2135,-2.47314c-0.92281,-2.51928 -1.26425,-5.15852 -1.55494,-7.80238c-0.76132,-7.0226 -0.76132,-14.0775 -0.66442,-21.12779a11.16603,11.16603 0 0 1 0.6229,-3.12833a4.46641,4.46641 0 0 1 2.40393,-2.76844c0.83515,-0.3922 1.07046,-0.95973 1.07508,-1.84562q0.04153,-21.87065 0.12458,-43.74131q0.0323,-9.68953 0.08767,-19.37906c0,-1.54571 -0.69672,-2.42238 -2.21014,-2.80996c-2.74075,-0.70134 -5.47689,-1.43497 -8.21764,-2.13631c-0.89051,-0.22609 -1.79948,-0.36912 -2.68538,-0.61367a3.36827,3.36827 0 0 1 -1.27809,-0.60444a1.16736,1.16736 0 0 1 -0.30453,-0.95973c0.04153,-0.20763 0.46141,-0.38297 0.75209,-0.46141a1.74412,1.74412 0 0 1 0.76132,0a42.67084,42.67084 0 0 1 7.3825,1.78564c1.30578,0.46141 2.67154,0.72902 4.00962,1.0843l0.21225,-0.22147l0,0.00001l0.00001,-0.00002z" id="svg_1" fill="black"/>
      
      </svg>
        `
        el.className = 'marker-semilla';
        el.id = marker.properties.urlID;
        el.childNodes[0].addEventListener('click', ()=>{
            this.displayContent(marker.properties.urlID)
          });
        //el.style.backgroundImage = 'url("../../assets/mapbox-icon.png")';
  
  
        // el.addEventListener('click', ()=>{
        //   this.displayContent(marker.properties.urlID)
        // });
  
      // add marker to map
    
       var markeri =  new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);
        
        this.objectsAddedToMap.push(markeri);
      })
   
  }

  public displayContent(idSemilla){
    console.log(idSemilla);

    this.objetosAnteriores = this.objectsAddedToMap;
    this.objectsAddedToMap.forEach(element => {
      
      if(!(element.getElement().id == idSemilla))
        { element.remove()}
    });

    this.location.replaceState(`/map/${idSemilla}`);
    document.getElementById("aside").classList.add("aside-active");
    document.getElementById(`${idSemilla}`).classList.add("marker-big")
    this.currentSemilla = this.serviceSemillas.getSemilla(idSemilla)
    this.map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.48369693756104, 37.83381888486939],
                        [-122.48348236083984, 37.83317489144141],
                        [-122.48339653015138, 37.83270036637107],
                        [-122.48356819152832, 37.832056363179625],
                        [-122.48404026031496, 37.83114119107971],
                        [-122.48404026031496, 37.83049717427869],
                        [-122.48348236083984, 37.829920943955045],
                        [-122.48356819152832, 37.82954808664175],
                        [-122.48507022857666, 37.82944639795659],
                        [-122.48610019683838, 37.82880236636284],
                        [-122.48695850372314, 37.82931081282506],
                        [-122.48700141906738, 37.83080223556934],
                        [-122.48751640319824, 37.83168351665737],
                        [-122.48803138732912, 37.832158048267786],
                        [-122.48888969421387, 37.83297152392784],
                        [-122.48987674713133, 37.83263257682617],
                        [-122.49043464660643, 37.832937629287755],
                        [-122.49125003814696, 37.832429207817725],
                        [-122.49163627624512, 37.832564787218985],
                        [-122.49223709106445, 37.83337825839438],
                        [-122.49378204345702, 37.83368330777276],
                        [
                            -63.29223632812499,
                            -18.28151823530889
                        ]

                    ]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "red",
            "line-width": 3
        }
    });
   
    this.map.removeLayer()
 

  }

  public closeAside(){
      console.log("funcionando")
      this.location.replaceState(`/map`);
      document.getElementById("aside").classList.remove("aside-active");
      this.pintarMarkers();
      this.router.navigate(['/map'])
  }
}