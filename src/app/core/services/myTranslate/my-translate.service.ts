import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private renderer2:Renderer2
  constructor(private translateService:TranslateService,
    @Inject(PLATFORM_ID) private id:object,
  private render:RendererFactory2) { 
    this.renderer2=this.render.createRenderer(null,null)
    if(isPlatformBrowser(this.id)){
      //1-set default language
      this.translateService.setDefaultLang('eng')
      //2-get language from localstorage
      const savedLang= localStorage.getItem('lang')
      //3-use lang Local
      if(savedLang){
        this.translateService.use(savedLang !)
      }
      this.changeLang()
    }
  }


  changeLang(){
    if(localStorage.getItem('lang')==='en'){
      this.renderer2.setAttribute(document.documentElement,'dir','ltr')
      this.renderer2.setAttribute(document.documentElement,'lang','en')
    }
    else if(localStorage.getItem('lang')==='ar'){
      this.renderer2.setAttribute(document.documentElement,'dir','ltr')
      this.renderer2.setAttribute(document.documentElement,'lang','ar')
    }
  }
}
