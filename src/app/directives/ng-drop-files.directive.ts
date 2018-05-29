import { Directive, EventEmitter,
         ElementRef, HostListener,
         Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos:FileItem[] = [];
  @Output() mouseSobre:EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event:any){
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event:any){
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any){
    const trasnferencia = this._getTransferencia(event);

    if(!trasnferencia){
      return;
    }

    this._getArchivos(trasnferencia.files);

    this._prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getArchivos(archivosLista:FileList){
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
        const archivoTemp = archivosLista[propiedad];
        if(this._archivoValido(archivoTemp)){
          const nuevoArchivo = new FileItem(archivoTemp);
          this.archivos.push(nuevoArchivo);
        }
    }
  }

  //Validaciones
  private _archivoValido(archivo:File):boolean{
    if(!this._archivoDuplicado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }else{
      return false;
    }
  }

  private _prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoDuplicado(nombreArvhico:string):boolean{
    for(const archivo of this.archivos){
      if(archivo.nombreArchivo == nombreArvhico){
        console.log("El archivo " + nombreArvhico + " ya existe");
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo:string):boolean{
    return (tipoArchivo === "" || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
