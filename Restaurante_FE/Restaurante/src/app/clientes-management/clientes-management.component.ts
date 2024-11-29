export class ClientesManagementComponent {
  mostrarFormularioCarregar: boolean = false // Controla se o formulario de definir prato é exibida

  // Alterna a exibição do formulário de definir prato
  toggleFormularioCarregar(): void {
    this.mostrarFormularioCarregar = !this.mostrarFormularioCarregar;
  }
}
