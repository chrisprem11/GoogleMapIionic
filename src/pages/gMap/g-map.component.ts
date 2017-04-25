import {Component,ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

declare var google;

@Component({
  selector : 'gMap-page',
  templateUrl: 'g-map.html',

})
export class GMapPage {
  @ViewChild('map') mapElement: ElementRef;
   map: any;

   constructor(public navCtrl: NavController) {

   }

   ionViewDidLoad(){
     this.loadMap();
   }

   loadMap(){

     let latLng = new google.maps.LatLng(12.972442, 77.580643);

     let mapOptions = {
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

   }
}
