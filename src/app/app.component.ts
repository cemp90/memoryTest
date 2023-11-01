import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SpeechService } from './speech/services/speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mapPalabras: Map<string, string[]> = new Map<string, string[]>();

  intervaloRecarga: number = 0;

  indiceLista: string = '';

  palabras: string[] | undefined = [];

  palabra: string = '';


  timer: any;
  timerSubscription: any = new Subscription();

  constructor(private speechService: SpeechService) {
    this.mapPalabras.set("1", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("2", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("3", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("4", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("5", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("6", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
    this.mapPalabras.set("7", ["Ahorcar", "Violencia", "Clave", "Escuela", "Sostener", "Naturaleza", "Chillar", "Galopar", "Grano", "Entumecido"]);
  }

  recuperarOpcionesListas(): string[] {
    let claves: string[] = [];
    for (const [key] of this.mapPalabras) {
      claves.push(key);
    }
    return claves;
  }

  comenzarTest() {

    this.speechService.setVoices(speechSynthesis.getVoices().filter((voice) => voice.lang.includes('es')));

    this.speechService.updateVoice('Spanish (Latin America)+Jacky');

    this.speechService.updateSpeech({ name: 'rate', value: '1' });

    this.speechService.updateSpeech({ name: 'pitch', value: '1' });

    this.palabras = this.mapPalabras.get(this.indiceLista);

    this.speechService.updateSpeech({ name: 'text', value: this.palabra });

    this.timerSubscription.add((startOver: boolean | undefined) => this.speechService.toggle(startOver));

    this.timer = timer(3000, this.intervaloRecarga);
    this.timerSubscription = this.timer.subscribe((t: any) => {
      this.palabra = this.recuperarPalabra(t);

      this.speechService.updateSpeech({ name: 'text', value: this.palabra });


    });
  }

  recuperarPalabra(t: any): string {
    if (t < 10) {
      if (this.palabras != undefined) {
        return this.palabras[t];
      } else {
        return '';
      }

    }
    this.timerSubscription.unsubscribe();
    return 'FIN!';

  }

}
