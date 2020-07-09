function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) // funçaõ anonima retornando 
    .then( states => {
        
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
        }
          
    })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json()) // funçaõ anonima retornando 
    .then( cities => {
        
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`  
        }

        citySelect.disabled = false
          
    })
}


//fetch é uma promessa //$ interpolar
document
    .querySelector("select[name=uf]")
    .addEventListener("change",  getCities)  // () => {} é o mesmo que function


// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript

    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id;

  //  console.log('ITEM ID: ', itemId)


    // verificar se existem items selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) { 
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
    //se não estiver seleionado, adicionar à selção
    
        selectedItems.push(itemId);
    
    }

    console.log(selectedItems);
// atualizar o campo escondido com os items selecionados
//console.log('')

    collectedItems.value = selectedItems;
}