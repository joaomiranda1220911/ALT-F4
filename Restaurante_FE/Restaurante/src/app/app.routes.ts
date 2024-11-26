import { Routes } from '@angular/router';
import { PratoCreateComponent } from './prato-create/prato-create.component';
import { PratoListComponent } from './prato-list/prato-list.component';
import { PratosManagementComponent } from './pratos-management/pratos-management.component';  
import { CreateEncomendaComponent } from './encomenda-create/encomenda-create.component';
import { ListEncomendasComponent } from './list-encomendas/list-encomendas.component';
import { CozinhaComponent } from './cozinha/cozinha.component';  // Novo componente Cozinha
import { SalaComponent } from './sala/sala.component';  // Novo componente Sala
import { AppComponent } from './app.component';

export const routes: Routes = [
    // Rota para a cozinha
    { path: 'cozinha', component: CozinhaComponent },
    { path: 'cozinha/pratos-management', component: PratosManagementComponent },  // Nova rota para Pratos Management
    { path: 'cozinha/pratos-management/pratos', component: PratoListComponent },
    { path: 'cozinha/pratos-management/create-prato', component: PratoCreateComponent },

    // Rota para a sala
    { path: 'sala', component: SalaComponent },  // Rota para Sala
    { path: 'sala/encomendas', component: ListEncomendasComponent },
    { path: 'sala/create-encomenda', component: CreateEncomendaComponent }
];
