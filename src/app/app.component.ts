import { Component, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
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

  testIniciado = false;

  myModal: bootstrap.Modal | undefined;

  timer: any;
  timerSubscription: any = new Subscription();

  constructor(private speechService: SpeechService) {
    this.mapPalabras.set("1", ['Morder',
      'Teclado',
      'Brazos',
      'Elegante',
      'Cosechar',
      'Demonio',
      'Novela',
      'Digital',
      'Archivar',
      'Ejecutivo',
      'Motocicleta',
      'Dolor',
      'Tostadora',
      'Primera',
      'Gafas',
      'Botella',
      'Ardilla',
      'Ciudad',
      'Química',
      'Mes']);
    this.mapPalabras.set("2", ['Fuerte',
      'Hechizar',
      'Deportar',
      'Tesoro',
      'Israel',
      'Diente',
      'Cometa',
      'Ala',
      'Contestar',
      'Ley',
      'Chocolate',
      'Video',
      'Galleta',
      'Arte',
      'Hogar',
      'Rutas',
      'Profundo',
      'Librería',
      'Verso',
      'Amor']);
    this.mapPalabras.set("3", ['Suerte',
      'Turno',
      'Muela',
      'Pausa',
      'Silenciador',
      'Cartera',
      'Cuidar',
      'Desviar',
      'Discurso',
      'Persona',
      'Desastre',
      'Foto',
      'Cantante',
      'Personalidad',
      'Ciencia',
      'Bono',
      'Pizza',
      'Comunidad',
      'Fuente']);
    this.mapPalabras.set("4", ['Unir',
      'Invernadero',
      'Joroba',
      'Inglaterra',
      'Modelar',
      'Convento',
      'Bultos',
      'Revista',
      'Coche',
      'Cocina',
      'Mezclar',
      'Celda',
      'Categoría',
      'Región',
      'Nostalgia',
      'Drama',
      'Risa',
      'Castor',
      'Hijo',
      'Equipo']);
    this.mapPalabras.set("5", ['Supermercado',
      'Clase',
      'Aerosol',
      'Vientre',
      'Militar',
      'Calor',
      'Odio',
      'Inteligencia',
      'Sonido',
      'Otoño',
      'Terror',
      'Cariño',
      'Manta',
      'Koala',
      'Detective',
      'Jueves',
      'Abuela',
      'Ascensor',
      'Pelota',
      'Zapato']);
    this.mapPalabras.set("6", ['Mano',
      'Kiwi',
      'Sol',
      'Plátano',
      'Puente',
      'Piscina',
      'Limpio',
      'invierno',
      'Ave',
      'Montaña',
      'Paz',
      'Manzana',
      'Hoja',
      'Flor',
      'Agua',
      'Fuerza',
      'Sueño',
      'Energía',
      'Perdón',
      'Risa']);
    this.mapPalabras.set("7", ['Zanahoria',
      'Patear',
      'Vocal',
      'Tarde',
      'Congelar',
      'Felicidad',
      'Deseo',
      'Éxito',
      'Alma',
      'Ciencia',
      'Suerte',
      'Falda',
      'Rodilla',
      'Océano',
      'Hombre',
      'Cuchara',
      'Moneda',
      'Vaca',
      'Ratón',
      'Noche']);
    this.mapPalabras.set("8", ['Helicóptero',
      'Libro',
      'Rio',
      'Chimenea',
      'Antebrazo',
      'Pegamento',
      'Bañera',
      'Abrigo',
      'Coro',
      'Memoria',
      'Tiempo',
      'Temor',
      'Poder',
      'Naranja',
      'cárcel',
      'gema',
      'libre',
      'Pluto',
      'peinado',
      'naturaleza']);
    this.mapPalabras.set("9", ['Asignatura',
      'Equipaje',
      'Copia',
      'Pinza',
      'Pirata',
      'Pagina',
      'Locura',
      'Envidia',
      'Aventura',
      'Hambre',
      'Muñeca',
      'Escritorio',
      'Mujer',
      'Puerta',
      'Bebe',
      'Arcoíris',
      'Pulpo',
      'Tortuga',
      'Popular',
      'Gimnasia']);
    this.mapPalabras.set("10", ['Chino',
      'Lavar',
      'Caja',
      'Trineo',
      'Electricidad',
      'Basura',
      'Carro',
      'Huesos',
      'Actor',
      'Axila',
      'Dormir',
      'Familia',
      'Castillo',
      'Fe',
      'Otoño',
      'Mal',
      'Triangulo',
      'Moneda',
      'Perro',
      'Caos']);
  }

  recuperarOpcionesListas(): string[] {
    let claves: string[] = [];
    for (const [key] of this.mapPalabras) {
      claves.push(key);
    }
    return claves;
  }

  comenzarTest() {
    if (!this.testIniciado) {
      this.testIniciado = true;

      this.speechService.setVoices(speechSynthesis.getVoices().filter((voice) => voice.lang.includes('es')));

      this.speechService.updateVoice('Spanish (Latin America)+Jacky');

      this.speechService.updateSpeech({ name: 'rate', value: '1' });

      this.speechService.updateSpeech({ name: 'pitch', value: '1' });

      this.palabras = this.mapPalabras.get(this.indiceLista);

      this.speechService.updateSpeech({ name: 'text', value: this.palabra });

      this.timerSubscription.add((startOver: boolean | undefined) => this.speechService.toggle(startOver));

      const element = document.getElementById('exampleModalCenter') as HTMLElement;
      this.myModal = new bootstrap.Modal(element);
      this.myModal.show();

      this.timer = timer(3000, this.intervaloRecarga * 1000);
      this.timerSubscription = this.timer.subscribe((t: any) => {
        this.palabra = this.recuperarPalabra(t);

        if (this.testIniciado) {
          this.speechService.updateSpeech({ name: 'text', value: this.palabra });
        }

      });
    }
  }

  recuperarPalabra(t: any): string {
    if (t < 20) {
      if (this.palabras != undefined) {
        return this.palabras[t];
      }
    }
    this.timerSubscription.unsubscribe();
    this.testIniciado = false;
    this.myModal?.hide();
    return '';

  }

}
