/**
 * Dynamic Style injection
 * Source: https://medium.com/@piyalidas.it/angular-theme-integration-using-dynamically-load-css-1617147799bf
 */

import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as stylex from '@stylexjs/stylex';
// import { styles } from '../../js';
import { styles } from '../base_styles';
import { environment } from '../environments/environment';


const stylesOverride = stylex.create({
  h1: {
      color: 'red', // This will override the default style 'color' prop
      backgroundColor: 'green'
    },
});

enum CustomTheme {
  CUSTOM_STYLES = 'custom_styles'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-project';
  private style!: HTMLLinkElement;
  private cssFile!: string;
  private themeCSSID: string = 'themeCSS';
  
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    if(environment.production)
      console.log('PRODUCTION MODE');
    else
      console.log('DEVELOPMENT MODE');

    if(environment.production && !this.isStylesheetAlreadyLoaded(this.themeCSSID)) {      
      this.setTheme(CustomTheme.CUSTOM_STYLES, this.renderer)
    }
  }

  setTheme(theme: CustomTheme, renderer2: Renderer2) {
    this.cssFile = `${theme}.css`;
    this.removeExistingThemeStyle(renderer2, this.themeCSSID);
    
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    renderer2.setProperty(this.style, 'rel', 'stylesheet');
    renderer2.setProperty(this.style, 'href', this.cssFile);
    renderer2.setProperty(this.style, 'id', this.themeCSSID);

    // Add the style to the head section
    renderer2.appendChild(this.document.head, this.style);
  }

  isStylesheetAlreadyLoaded(themeCSSID: string) {
    const themeIDHTMlElem = this.document.getElementById(themeCSSID);
    
    if (themeIDHTMlElem) {
      return true;
    } else {
      return false;
    }
  }

  removeExistingThemeStyle(renderer2: Renderer2, themeCSSID: string) {
    const themeIDHTMlElem = this.document.getElementById(themeCSSID);
    if (themeIDHTMlElem) {
      renderer2.removeChild(this.document.head, themeIDHTMlElem);
    }
  }

  mainHeadingStyles() {
    return stylex.props(styles.h1, stylesOverride.h1).className
    //return stylex.props(stylesOverride.h1).className
  }
}
