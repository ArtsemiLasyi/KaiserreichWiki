import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { GreetingComponent } from './greeting/greeting.component';
import { AccountRegistrationComponent } from './accountregistration/accountregistration.component';
import { PhotoComponent } from './photo/photo.component';
import { AdminComponent } from './admin/admin.component';
import { ArticleComponent } from './article/article.component';
import { ArticleAddComponent } from './articleadd/articleadd.component';
import { ArticleListComponent } from './articlelist/articlelist.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ArticleInfoComponent } from './articleinfo/articleinfo.component';
import { PhotoListComponent } from './photolist/photolist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountLoginComponent } from './accountlogin/accountlogin.component';


const photoRoutes: Routes = [
  { path: ':id', component: PhotoComponent },
  { path: '', component: PhotoListComponent }
];

const articleRoutes: Routes = [
  { path: 'add', component: ArticleAddComponent},
  { path: '', component: ArticleListComponent},
  { path: ':id', component: ArticleInfoComponent}
];

const accountRoutes: Routes = [
  { path: '', component: ArticleAddComponent},
  { path: ':id', component: ArticleListComponent}
];

const appRoutes: Routes =[
  { path: '', component : GreetingComponent },
  { path: 'account/registration', component : AccountRegistrationComponent },
  { path: 'account/login', component: AccountLoginComponent},
  { path: 'article', component : ArticleComponent, children: articleRoutes },
  { path: 'photo', component: PhotoComponent, children: photoRoutes },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    AccountRegistrationComponent,
    AccountLoginComponent,
    ArticleComponent,
    ArticleAddComponent,
    PhotoComponent,
    AdminComponent,
    PhotoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
