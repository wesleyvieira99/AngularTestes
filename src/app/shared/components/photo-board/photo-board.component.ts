import { Photo } from './interfaces/photo';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})

export class PhotoBoardComponent implements OnChanges {

  @Input() public photos: Photo[];
  //Array multidimensional (coluna e linha)
  public rows: any[][] = [];

  //Converter lista de fotos (photos) para estrutura de rows
  //Onde cada row (rows - array multidimensional) possua apenas
  // quatro fotos...

  //disparado onChanges toda vez que qualquer @Input disparar,
  //Ou seja: quando o @Input Photos colocar uma nova foto no array
  //faça o código do bloco abaixo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;

    for(let index = 0; index < photos.length; index += step) {
      //adicionando de 4 em 4 fotos de photos por linha
      newRows.push(photos.slice(index, index + step));
    }

    return newRows
  }
}
