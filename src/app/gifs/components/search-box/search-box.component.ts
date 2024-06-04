import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  template:`
<h5>Buscar</h5>
<input type="text"
class="form-control"
placeholder="Buscar gifs..."
(keyup.enter)="searchTag()"
#txtTagInput>
`
})

export class SearchBoxComponent  {

  constructor(private gifsService: GifsService) { }
//Refiere al #txtTagInput
@ViewChild('txtTagInput')
public tagInput!: ElementRef<HTMLInputElement>

searchTag(){
  const newTag = this.tagInput.nativeElement.value;
  //llamado al service
  this.gifsService.searchTag(newTag)
  this.tagInput.nativeElement.value = '';
  // console.log({newTag})
}
}
