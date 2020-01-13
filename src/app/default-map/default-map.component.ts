import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';  
import { LocationService } from '../location.service';
import { environment } from 'src/environments/environment';

declare var H: any;  
@Component({
  selector: 'app-default-map',
  templateUrl: './default-map.component.html',
  styleUrls: ['./default-map.component.css']
}) 
export class DefaultMapComponent implements OnInit {
  
  @ViewChild("map", { static: false }) public mapElement: ElementRef;
  
  // Setting Default Location to Berlin, Germany 
  public lat: any = 52.5159;  
  public lng: any = 13.3777;  
  
  public width: any = '100%';  
  public height: any = '98vh';  
  
  private platform: any;  
  private map: any;  
  private ui: any;
  
  public constructor(private locationService: LocationService) {  
  }
  private defaultIcon = new H.map.Icon("assets/imgs/03.icon", {size: {w: 45, h: 45}});
  
  public ngOnInit() {  
      this.platform = new H.service.Platform({
        apikey: environment._apykey
      });
  }  
  
  public ngAfterViewInit() {
    this.locationService.getPosition().then(pos=>
    {
      this.lat = pos.lat;
      this.lng = pos.lng;
      this.showDefaultMap();
    })
    .catch(error => {
      alert("Please allow your current location in order to see hotels near you. Currently, showing default location: Berlin")
      this.showDefaultMap(false);
    }
    );
    
  }

  private showDefaultMap(get_hotels: boolean= true){
    let pixelRatio = window.devicePixelRatio || 1;  
    let defaultLayers = this.platform.createDefaultLayers({  
      tileSize: pixelRatio === 1 ? 256 : 512,  
      ppi: pixelRatio === 1 ? undefined : 320  
    });  
  
    this.map = new H.Map(this.mapElement.nativeElement,  
      defaultLayers.vector.normal.map, { pixelRatio: pixelRatio });  
  
    new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    this.map.setCenter({ lat: this.lat, lng: this.lng });  
    this.map.setZoom(14);
    if(get_hotels)  
      this.places(this.lat,this.lng);
  }

  private places(lat,lng) {  

    this.platform.getPlacesService().explore({
      at: `${lat},${lng}`,
      cat: 'restaurant',
      }, 
      (data) => {
        for (let i = 0; i < data.results.items.length; i++) {  
          this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
        } 
    }, error => console.log(error));
   
  } 
  
  private dropMarker(coordinates: any, data: any) {

    let marker = new H.map.Marker(coordinates,{icon: this.defaultIcon,});
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener("tap", event => {
        let bubble =  new H.ui.InfoBubble(event.target.getGeometry(), {
            content: event.target.getData()
        });
        this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

}