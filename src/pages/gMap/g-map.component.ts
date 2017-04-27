import {Component,ViewChild, ElementRef} from '@angular/core';
import { NgModule, ApplicationRef,OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NavController} from 'ionic-angular';
import {HomeService} from '../home/home.service';
import {Marker} from '../home/marker';

declare var google;


@Component({
  selector : 'gMap-page',
  templateUrl: 'g-map.html',

})
export class GMapPage {


    // @ViewChild('map') mapElement1: ElementRef;
    // map: any;
    @ViewChild('map') mapElement: ElementRef;
    map: any;

   constructor(public navCtrl: NavController , private homeService : HomeService) {}

  //  ionViewDidLoad(){
  //    this.loadMap();
  //  }
  //  loadMap(){
  //    let latLng = new google.maps.LatLng(12.972442, 77.580643);
  //    let mapOptions = {
  //      center: latLng,
  //      zoom: 15,
  //      mapTypeId: google.maps.MapTypeId.ROADMAP
  //    }
  //    this.map = new google.maps.Map(this.mapElement1.nativeElement, mapOptions);
  //  }


  markers : Marker[] = [];
  ngOnInit():void {
    this.markers=this.homeService.getMarkers();

  }
   searchPlace(value){
     let geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            'address': value
          }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
               let lat = results[0].geometry.location.lat();
               let long = results[0].geometry.location.lng();
              let myOptions = {
                zoom: 12,
                center: new google.maps.LatLng(lat, long),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
             this.map = new google.maps.Map(document.getElementById("map"), myOptions);
          }else{
            console.log("Else PArt ..." );
            console.log(this.markers);
              // for(let i of this.markers){
              //   console.log("Else part executed..."+this.markers[i]);
              //   if(this.markers[i].label===value) {
              //     let lat = this.markers[i].lat;
              //     let long = this.markers[i].lng;
              //    let myOptions = {
              //      zoom: 12,
              //      center: new google.maps.LatLng(lat, long),
              //      mapTypeId: google.maps.MapTypeId.ROADMAP
              //    };
              //   this.map = new google.maps.Map(document.getElementById("map"), myOptions);
              //   } else {
              //           alert("Unknown Place. Not found on Map.");
              //       }
              // }
            }
        });
      };

      addMarker(){
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
      }
      addInfoWindow(marker, content){
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });

    }
}
