const input = document.querySelector('[data-input]');
const btnAdiciona = document.querySelector('[data-btnAdiciona]');
let botoesConcluidos = document.querySelectorAll('[data-btnConcluido]');
let botoesRemover = document.querySelectorAll('[data-btnRemover]');
const listaDOM = document.querySelector('[data-lista]');


class List {
   constructor(input) {
      this._texto = input;
   }

   limpaCampo() {
      input.value = '';
   }
   criaLista() {
      let lista = [this._texto];

      window.localStorage.setItem('lista', JSON.stringify(lista));
   }
   atualizaLista() {
      let lista = JSON.parse(window.localStorage.getItem('lista'));

      lista.push(this._texto);

      window.localStorage.setItem('lista', JSON.stringify(lista));
   }

   atualizaView() {
      let lista = JSON.parse(window.localStorage.getItem('lista'));
      listaDOM.innerHTML = '';

      for (let i = 0; i < lista.length; i++) {

         listaDOM.innerHTML += `<div class="lista__item">
            <p class="item__titulo">${lista[i]}</p>
            <div class="item__action">
               <button class="action__concluir" data-btnConcluido>Concluido</button>
               <button class="action__remover" data-btnRemover>Remover</button>
            </div>
         </div>`;
      }

      botoesConcluidos = document.querySelectorAll('[data-btnConcluido]');
      botoesRemover = document.querySelectorAll('[data-btnRemover]');

   }
   removeItemLista(item) {
      let lista = JSON.parse(window.localStorage.getItem('lista'));
      const posicao = lista.indexOf(item);
      lista.splice(posicao,1);
      window.localStorage.setItem('lista', JSON.stringify(lista));

      this.atualizaView();

   }
}

const atualizaTabela = new List();
atualizaTabela.atualizaView();


btnAdiciona.addEventListener('click', () => {
   const item = new List(input.value);
   if (input.value == "") {

      console.log('O campo não pode estar vazio');

   } else if (window.localStorage.getItem('lista') == null) {

      item.criaLista();
      item.limpaCampo();

   } else {
      
      item.atualizaLista();
      item.limpaCampo();
      
   }
   item.atualizaView();
   location.reload();
});

for (const btnConcluido of botoesConcluidos) {
   btnConcluido.addEventListener('click', () => {
      const divBotoes = btnConcluido.parentElement;
      const textoElemento = divBotoes.previousElementSibling;
      textoElemento.classList.toggle('feito');
   })
}

for (const btnRemover of botoesRemover) {
   btnRemover.addEventListener('click', () => {
      const divBotoes = btnRemover.parentElement;
      const textoElemento = divBotoes.previousElementSibling;
      const tituloItem = textoElemento.innerText;

      atualizaTabela.removeItemLista(tituloItem);
      location. reload();

   })
}