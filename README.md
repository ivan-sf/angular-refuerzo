1-Crear proyecto
Primero crear un proyecto de angular mediante consola sin implementar rutas para realizarlo manualmente y con CSS

ng new app-angular
Luego iniciar el servidor de angular mediante consola

ng serve -o
Implementar estilos de Bootstrap en el head de la app

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
2. Crear componentes
Crear 3 componentes home about y contact por medio de angular cli y luego eliminar el diseño del app-component para llamar los componentes creados.

//Angular cli
ng g c pages/home
ng g c pages/about
ng g c pages/contact
//App-component.html
<app-home></app-home>
<app-about></app-about>
<app-contact></app-contact>

archivo app.component.html
3.Generar rutas
Para generar las rutas se debe crear un modulo por medio de angular cli utilizando la bandera --flat para evitar que cree mas directorios.

ng g appRouting --flat
En el nuevo modulo importar la clase Routes de angular para poder instanciar y crear una nueva clase con las rutas

import { Routes } from '@angular/router';
const routes:Routes=[
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];
Recordar importar todas las rutas que se están utilizando en la clase
Luego se debe exportar las rutas para que sean reconocidas por el ap..module principal para ello primero se importa el router module y se le debe configurar las rutas ya creadas en el NgModule

@NgModule({
   imports:[
     RouterModule.forRoot(routes);
   ],
   exports:[
     RouterModule
   ]
}) 
Importar el RouterModule
Y para finalizar se debe importar las rutas en el app.module.ts para que angular las reconozca.


archivo app-routing.module.ts

archivo app.module.ts
Una vez establecidas las rutas solo queda mostrarlas en el app.component.html por medio del router outlet

<router-outlet></router-outlet>

archivo app.component.html
4.Crear menu
Primero crear un componente llamado menu con angular cli

ng g c components/menu
Luego se debe crear un menu utilizando routerLink para redireccionar a cada ruta con su respectivo componente y llamar este menu en el app.component.html

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><b>Menu</b></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" routerLink="/home">Home</a>
        <a class="nav-item nav-link active" routerLink="/about">About</a>
        <a class="nav-item nav-link active" routerLink="/contact">Contact</a>
      </div>
    </div>
  </nav>
<div>
  <app-menu></app-menu>
  <router-outlet></router-outlet>
</div>

archivo menu.component.html

archivo app.component.html
Crear un array con las rutas en el menu.component.ts para mostrarlas por medio de un ngFor utilizando nuevamente el routerLink

rutas = [
    {
      name:'Home',
      path:'/home'
    },
    {
      name:'About',
      path:'/about'
    },
    {
      name:'Contact',
      path:'/contact'
    }
]


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><b>Menu</b></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" [routerLink]="ruta.path" *ngFor="let ruta of rutas">{{ruta.name}}</a>
      </div>
    </div>
  </nav>

archivo menu.component.ts

archivo menu.component.html
5.Separar rutas de la pagina
Se debe crear un modulo dentro de pages y dentro de ese modulo declaramos los componentes y luego los exportamos para finalizar eliminamos los componentes dentro del app.module.ts e importamos directamente el modulo de pages

ng g m pages/pages --flat
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent
  ],
  exports:[
    AboutComponent,
    ContactComponent,
    HomeComponent
  ]
 imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],

archivo pages.module.ts

archivo app.module.ts
6. Crear modulo de posts con lazy load
Lo primero es generar un modulo con la propiedad --routing esto va a crear un modulo con su ruta, dentro del modulo se debe declarar la propiedad .forChild al RouterModule para finalizar generar un postcomponent e instanciarlo dentro de la ruta hija

  {
    path:'',
    component:PostsComponent
  }
Luego se debe importar el enrutador dentro del app-routing pero mediante lazy load

loadChildren:()=>import('./pages/posts/posts.module').then(m=>m.PostsModule)
Para finalizar crear la ruta dentro del menu

    {
      name:'Posts',
      path:'/posts'
    }

archivo post-routing.module.ts

archivo app-routing.module.ts

menu.component.ts
7. Servicios y datos externos de API'S
Primero en el modulo principal importar el HttpClientModule luego crear un servicio llamado data dentro de una carpeta llamada services con la propiedad --spec=false para evitar archivos de prueba luego dentro del servicio importar nuevamente el HttpClient y hacer una llamada a la API por medio de una funcion y esta funcion se la debe llamar en el post.componente.ts para poder almacenar los datos en una variable.

import { HttpClientModule } from '@angular/common/http';
ng g s services/data --spec=false
import { HttpClient } from '@angular/common/http';
constructor(private http:HttpClient){}
getPosts(){
  this.http.get('https://jsonplaceholder.typicode.com/posts')
}
import { DataService } from '../../services/data.service';
constructor(private dataService:DataService){}
this.dataService.getPosts()
   .subscribe(posts=>{
    console.log(posts) 
   })

app.module.ts

data.service.ts

post.component.ts
8.Mostrar resultados de los datos de la API
primero agregar una variable dentro del post.component.ts para almacenar los post dentro de esta para evitar errores usar <any> en la variable y en los datos que se reciben del servicio luego de almacenar los datos solo se deben mostrar en el post.component.html por medio de una tarjeta haciendo uso de las llaves {{mensaje.dato}} y el | async para evitar perdida de recursos

mensajes: any;
this.mensajes=this.dataService.getPosts()


<h1>Posts</h1>
<div class="card" style="width: 48rem;" *ngFor="let mensaje of mensajes | async">
    <div class="card-body">
      <h5 class="card-title">{{mensaje.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{mensaje.id}}</h6>
      <p class="card-text">{{mensaje.body}}</p>
    </div>
  </div>



post.component.ts

archivo post.component.html
9.@input y @output
A continuación con @input guardaremos el componente post independientemente para que este pueda ser llamado desde diferentes lugares de posts o de donde sea necesario.

Primero generar un componente llamado post dentro del componente posts. Luego pasar todo el <li> del component de posts al componente de posts y en este ultimo instanciar el <app-root> y el *ngFor trasladarlo a este app-root. Luego agregar el @input mensaje() dentro de la clase del post.component.ts e instanciarlo dentro del app-root para importar los datos de mensaje

ng g c pages/posts/post
<app-post *ngFor="let mensaje of mensajes | async" [mensaje]='mensaje'></app-post>
 @Input() mensaje:any;

archivo post.component.html

archivo post.component.ts

archivo posts.component.html
Y para finalizar por medio del @output sacaremos los datos que necesitemos como el id por ejemplo para redireccionar o hacer cualquier accion que se necesite.

Primero en el post.component.ts crear una funcion la cual funcionara como un listener llamada onClick(){} y se debe llamar el elemento onClick dentro del <li> con (clic)='onClick()' para que envie datos cada vez que se haga clic o tap en el bloque <li>. Luego crear un evento @output llamado clickPost y pasarle un eventEmitter()<number> para decirle a angular el tipo de dato que deseo recibir Luego agrego el evento del output (clickPost) al elemento del posts.component.html para pedirle que llame una funcion a la cual se le pasara un evento del hijo (clickPost)="listen($event)" ya posteriormente se debe crear la funcion que se acaba de nombrar con la accion que se desea en este caso un console.log mostrando el id. Luego volvemos al post.component.ts donde se modifica la funcion onClick emitiendo el evento al padre

@Input mensaje:any;
@Output clickPost() = new EventEmitter<number>();
onClick(){
   this.clickPost.emit(this.mensaje.id)
}

archivo post.component.ts
<div class="card" style="width: 48rem;" (click)="onClick()">



(clickPost)="listen($event)

archivo posts.component.html
Luego de esto realizare una practica de ionic con una api de jsonEncode y una practica de angular con rick and morty api 