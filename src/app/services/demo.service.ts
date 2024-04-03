import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadConfigService } from './load-config.service'

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor( private http: HttpClient, private config: LoadConfigService) { }
  getProfile(){
    return this.http.get('https://graph.microsoft.com/v1.0/me')
  }

  api_url = this.config.getSettings('baseUrl')

  getBanner(){
    return this.http.get(this.api_url + 'demo')
  }
  post_data(data: any){
    return this.http.post(this.api_url + '/add_profile', data)
  }
}
