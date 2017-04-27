import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef,Component,OnInit,ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Marker} from './marker';
import { HomeService} from './home.service';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl : 'home.html',
})
export class HomePage {
  constructor(public navCtrl: NavController, private homeService : HomeService) {
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public markers = this.homeService.getMarkers();

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: any, name:string) {
    if(name===undefined) {
      alert("Please enter name of the place.");

    }else {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: name,
        draggable :true
      });
    }
    console.log(this.markers);
  }


  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

//Searc a Place with its name.
  searchPlace(value){
    var num:number = 0;
    var i:number;
    for(i=num;i<this.markers.length;i++){
      if(this.markers[i].label===value) {
          let lat = this.markers[i].lat;
          let long = this.markers[i].lng;
         let myOptions = {
           zoom: 12,
           center: new google.maps.LatLng(lat, long),
           mapTypeId: google.maps.MapTypeId.ROADMAP
         };
        this.map = new google.maps.Map(document.getElementById("map"), myOptions);
        let myCenter = new google.maps.LatLng(lat,long);
        let marker = new google.maps.Marker({
          position: myCenter,
          animation: google.maps.Animation.BOUNCE
        });
        marker.setMap(this.map);
        }
    }
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
            let myCenter = new google.maps.LatLng(lat,long);
            let marker = new google.maps.Marker({
              position: myCenter,
              animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(this.map);
         }else{
                console.log("Else Part..");
           }
       });
     };

// demo(name){
//   this.findInMarkersArray(name);
// }
     public findInMarkersArray(value:string) : void {
       console.log(this.markers);
       var num:number = 0;
       var i:number;
       for(i=num;i<this.markers.length;i++){
         if(this.markers[i].label===value) {
             let lat = this.markers[i].lat;
             let long = this.markers[i].lng;
            let myOptions = {
              zoom: 12,
              center: new google.maps.LatLng(lat, long),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
           this.map = new google.maps.Map(document.getElementById("map"), myOptions);
           }
       }
     }


}
