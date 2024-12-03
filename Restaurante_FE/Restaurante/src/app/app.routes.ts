import { Routes } from '@angular/router';

import { PratoCreateComponent } from './prato-create/prato-create.component';
import { PratoListComponent } from './prato-list/prato-list.component';
import { PratoDefinirComponent } from './prato-definir/prato-definir.component';

import { PratosManagementComponent } from './pratos-management/pratos-management.component';

import { EncomendasManagementComponent } from './encomendas-management/encomendas-management.component';
import { EncomendaCreateComponent } from './encomenda-create/encomenda-create.component';
import { EncomendasListComponent } from './encomendas-list/encomendas-list.component';


import { CozinhaComponent } from './cozinha/cozinha.component';
import { SalaComponent } from './sala/sala.component';
import { ClientesManagementComponent } from './clientes-management/clientes-management.component';
import { CarregarClienteComponent } from './carregar-cliente/carregar-cliente.component';
import { EmentaManagementComponent } from './ementa-management/ementa-management.component';
import { ConsultarEmentaComponent } from './ementa-consultar/ementa-consultar.component';



export const routes: Routes = [
    // Rota para a cozinha
    { path: 'cozinha', component: CozinhaComponent },
    { path: 'cozinha/pratos-management', component: PratosManagementComponent },
    { path: 'cozinha/pratos-management/pratos', component: PratoListComponent },
    { path: 'cozinha/pratos-management/create-prato', component: PratoCreateComponent },
    { path: 'cozinha/pratos-management/definir-prato', component: PratoDefinirComponent },


    // Rota para a sala
    { path: 'sala', component: SalaComponent },
    { path: 'sala/clientes-management', component: ClientesManagementComponent },
    { path: 'sala/clientes-management', component: CarregarClienteComponent },

    { path: 'sala/encomendas-management', component: EncomendasManagementComponent },
    { path: 'sala/encomendas-management/encomendas', component: EncomendasListComponent },
    { path: 'sala/encomendas-management/create-encomenda', component: EncomendaCreateComponent },
    
    { path: 'sala/ementa-management', component: EmentaManagementComponent },
    { path: 'sala/ementa-management/ementa-consultar', component: ConsultarEmentaComponent}
];
