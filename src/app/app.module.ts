import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { GreetingComponent } from './greeting/greeting.component';
import { AccountComponent } from './account/account.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoAddComponent } from './photoadd/photoadd.component';
import { ArticleComponent } from './article/article.component';
import { ArticleAddComponent } from './articleadd/articleadd.component';
import { ArticleListComponent } from './articlelist/articlelist.component';
import { NotFoundComponent } from './notfound/notfound.component';


const photoRoutes: Routes = [
  { path: 'add', component: PhotoAddComponent}
];

const articleRoutes: Routes = [
  { path: 'add', component: ArticleAddComponent},
  { path: '', component: ArticleListComponent}
];

const appRoutes: Routes =[
  { path: '', component : GreetingComponent },
  { path: 'account', component : AccountComponent },
  { path: 'article', component : ArticleComponent, children: articleRoutes },
  { path: 'photo', component: PhotoComponent, children: photoRoutes },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    ArticleComponent,
    ArticleAddComponent,
    PhotoComponent,
    PhotoAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
