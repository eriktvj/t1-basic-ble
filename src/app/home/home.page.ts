import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices:any[] = [];
  
  constructor(private ble:BLE,private ngZone: NgZone) 
  {
    
  }
  Scan(){
    this.devices = [];
    this.ble.scan([], 10).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2)); //IMPORTANTE stringify
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
      device.advertising = new Uint8Array(device.advertising); //advertising data (arrayBuffer).
    })
  }

    
  
}
