export class FileItem{
  public archivo:File;
  public nombreArchivo:string;
  public url:string;
  public subido:boolean;
  public progreso:number;

  constructor(archivo:File){
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.subido = false;
    this.progreso = 0;
  }
}
