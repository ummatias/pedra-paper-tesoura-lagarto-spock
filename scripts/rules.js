const close = document.querySelector('.close')
const modal = document.querySelector('.rule-modal')

document.addEventListener('click', function(e){
    const el = e.target

    if(el.classList.contains('close')){
        modal.style.display = 'none'
    }

    if(el.classList.contains('rules')){
        modal.style.display = 'flex'
    }
})