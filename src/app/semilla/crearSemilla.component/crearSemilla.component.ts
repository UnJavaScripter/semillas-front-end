import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { semillaInfo } from '../../models/semillaInfo';
declare const navigator: any;
declare const MediaRecorder: any;

@Component({
    selector: 'app-crear-semilla',
    templateUrl: 'crearSemilla.component.html',
    styleUrls: ['crearSemilla.component.css']
})
export class CrearSemillaComponent implements OnInit{
    
    public semilla : semillaInfo;
    public isRecording: boolean = false;
    private chunks: any = [];
    private mediaRecorder: any;

    constructor(public router: Router, public semillasService : SemillasService){
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
              const audio = new Audio();
              const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
              this.chunks.length = 0;
              audio.src = window.URL.createObjectURL(blob);
              audio.load();
              audio.play();
            };
      
            this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
        };

        navigator.getUserMedia = (navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);
    
        navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
    
    }

    ngOnInit(){
        this.semilla=new semillaInfo();
    }

    crearSemilla(){
        console.log(1)
        this.semilla._id=this.semillasService.darFuncionHash(this.semilla.desc+'');
        this.semillasService.anadirSemilla(this.semilla).then(
            ()=>{
                console.log("Semilla creada");
            }
        )
    }

    public record() {
        this.isRecording = true;
        this.mediaRecorder.start();
      }
    
      public stop() {
        this.isRecording = false;
        this.mediaRecorder.stop();
      }
}