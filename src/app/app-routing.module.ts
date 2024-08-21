import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [

    {
        path: '', redirectTo: 'signin', pathMatch: 'full'
    },
    {
        path: 'additems',
        loadChildren: () => import('./additems/additems.module').then(m => m.AdditemsPageModule)
    },
    {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
    },
    {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule)
    },
    {
        path: 'editcategory',
        loadChildren: () => import('./editcategory/editcategory.module').then(m => m.EditcategoryPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsPageModule)
    },
    {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
    },
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
    },
    {
        path: 'ordersinfo',
        loadChildren: () => import('./ordersinfo/ordersinfo.module').then(m => m.OrdersinfoPageModule)
    },
    {
        path: 'signin',
        loadChildren: () => import('./signin/signin.module').then(m => m.SigninPageModule)
    },
    {
        path: 'orderupdate',
        loadChildren: () => import('./orderupdate/orderupdate.module').then(m => m.OrderupdatePageModule)
    },
    {
        path: 'change-language',
        loadChildren: () => import('./change-language/change-language.module').then(m => m.ChangeLanguagePageModule)
    },
    {
        path: 'buyappalert',
        loadChildren: () => import('./buyappalert/buyappalert.module').then(m => m.BuyappalertPageModule)
    },
    {
        path: 'mapa',
        loadChildren: () => import('./mapa/mapa.module').then(m => m.MapaPageModule)
    },
    {
        path: 'pedidos',
        loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosPageModule)
    },
    {
        path: 'order-info',
        loadChildren: () => import('./order-info/order-info.module').then(m => m.OrderInfoPageModule)
    },
    {
        path: 'nuevo-producto',
        loadChildren: () => import('./nuevo-producto/nuevo-producto.module').then(m => m.NuevoProductoPageModule)
    },
    {
        path: 'nueva-sub-seccion',
        loadChildren: () => import('./nueva-sub-seccion/nueva-sub-seccion.module').then(m => m.NuevaSubSeccionPageModule)
    },
    {
        path: 'editar-producto',
        loadChildren: () => import('./editar-producto/editar-producto.module').then(m => m.EditarProductoPageModule)
    },
    {
        path: 'principal',
        loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
    },
    {
        path: 'solicitud-cancelaciones',
        loadChildren: () => import('./solicitud-cancelaciones/solicitud-cancelaciones.module').then(m => m.SolicitudCancelacionesPageModule)
    },
    {
        path: 'aviso-de-privacidad',
        loadChildren: () => import('./aviso-de-privacidad/aviso-de-privacidad.module').then(m => m.AvisoDePrivacidadPageModule)
    },  {
    path: 'terminos-ycondiciones',
    loadChildren: () => import('./terminos-ycondiciones/terminos-ycondiciones.module').then( m => m.TerminosYCondicionesPageModule)
  }


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
