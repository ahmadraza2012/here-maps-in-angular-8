import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';  
declare var H: any;  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title = 'HereMapDemo';
  
  @ViewChild("map", { static: false }) public mapElement: ElementRef;  
  
  public lat: any = 52.5159;  
  public lng: any = 13.3777;  
  
  public width: any = '1830px';  
  public height: any = '930px';  
  
  private platform: any;  
  private map: any;  
  
  private _apykey: string = 'mzTXiIynIYkP4lliCoMD2-dRi7C9HOXY2I-BH47KGGc'
  public query: string;  
   
  public address: string = '';
  
  private ui: any;
  
  public constructor() {  
    this.query = "";  
  }
  private defaultIcon = new H.map.Icon("assets/imgs/03.icon", {size: {w: 45, h: 45}});
  
  public ngOnInit() {  

      this.platform = new H.service.Platform({
        apikey: this._apykey
      });
  }  
  
  public ngAfterViewInit() {  
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

    this.places();

  }  

  private places() {  

    this.platform.getPlacesService().explore({
      at: '52.5159,13.3777',
      cat: 'restaurant',
      }, 
      (data) => {
        console.log(data.results.items);
      
        for (let i = 0; i < data.results.items.length; i++) {  
          this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);  
            
        } 
    }, error => console.log(error));
   
  } 
  
  private dropMarker(coordinates: any, data: any) {  
    // let marker = new H.map.Marker(coordinates);  
    // marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");  
    
    // this.map.addObject(marker);


    let marker = new H.map.Marker(coordinates,{icon: this.defaultIcon,});
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('click', event => {
        let bubble =  new H.ui.InfoBubble(event.target.getGeometry(), {
            content: event.target.getData()
        });
        this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  
  }  
  
} 