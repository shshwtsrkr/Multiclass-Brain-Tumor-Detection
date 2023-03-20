import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {log} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  routeToServer(){
    axios.get("https://127.0.0.1:5000", {responseType:'document'}).then(data=>{
      console.log("gottem")
    })
  }
  ngOnInit() {
  }
}
