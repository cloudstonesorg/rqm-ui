import { Component, OnInit } from '@angular/core';
import { LoadConfigService } from './services/load-config.service';
import { DemoService } from './services/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Demo";
  profile?: any;
  firstName: string | undefined;
  email!: string;

  constructor(private config: LoadConfigService, private demo: DemoService){}
  
  ngOnInit(): void {
    console.log("I am")
    this.getProfile()
    console.log(this.config.getSettings())
    this.getProfile()
    this.fetch_banner()
  }

  getProfile() {
    this.demo.getProfile().subscribe((profileInfo: any) => {
      console.log(profileInfo)
      this.profile = profileInfo;
      this.firstName = profileInfo.displayName
      this.email = profileInfo.mail 
      localStorage.setItem('email', this.email)
      localStorage.setItem('displayName', profileInfo.displayName)
    })
  }

  show_banner: boolean = false;
  message: string = ""
  fetch_banner() { 
    this.show_banner = true;
    this.demo.getBanner().subscribe((banner: any) => {
      console.log(banner)
      this.message = banner.response
    })
  }
}