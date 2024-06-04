import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//providedIn: 'root' para que este disponible globalmente
@Injectable({ providedIn: 'root' })
export class GifsService {

  constructor(private http: HttpClient) { }

  // Propiedades
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = []
  private apiKey: string = '3OEBR80DLcp0OXhgVfx4UiWVdg8kvZzV';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'


  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    if (this._tagsHistory.includes(tag)) {
      //borra tag anterior
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    // inserta nuevo tag al inicio
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this.tagsHistory.splice(0, 10)
  }

  // searchTag
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data
        console.log({ gifs: this.gifList })
      })
  }
}


