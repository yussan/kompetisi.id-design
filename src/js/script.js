let showSearch = false;
let showNavTop = false;

document.addEventListener('DOMContentLoaded', () => {
  // on click full alert
  const fullalertEl = document.getElementById('fullalert');
  if(fullalertEl)
  {
    fullalertEl.addEventListener('click', (e) => {
      if(fullalertEl.firstChild) fullalertEl.removeChild(fullalertEl.firstChild);//clear child node
    });
  }
  //show/hide search box
  const btnSearchEl = document.getElementById('btn-search');
  if(btnSearchEl)
  {
    btnSearchEl.addEventListener('click', (e) => {
      toggleSearch();
    });
    document.getElementById('btn-closesearch').addEventListener('click', (e) => {
      toggleSearch();
    });
    //togle nav menu
    document.getElementById('btn-show-nav').addEventListener('click', (e) => {
        toggleNavTop();
    });
    document.getElementById('btn-hide-nav').addEventListener('click', (e) => {
        toggleNavTop();
    });
  }

  // global handle click
  window.onclick = (e) => {
      // show hide modal
      if(e.target.matches('.btn.btn-white.btn-close-modal.btn-sm.fa.fa-close'))
      {
        let {id} = e.target.parentNode.parentNode;
        if(!id) id = e.target.parentNode.parentNode.parentNode.id;
        modal('close', id);
      }

      //hide or show dropdown
      if(!e.target.matches('.dropdown-button'))
      {
          const dropdowns = document.getElementsByClassName("dropdown-items");
          for (let i = 0; i < dropdowns.length; i++) {
              let openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
              }
          }
      }else 
      {
          const target = e.target.getAttribute('data-target');
          console.log(target)
          document.getElementById(target).classList.toggle('show');
      }
  }
})

// toggle header search
function toggleSearch()
{
    showSearch = !showSearch;
    const headerEl = document.getElementsByClassName('nav-header')[0];
    const searchEl = document.getElementsByClassName('nav-search')[0];
    headerEl.style.top=(showSearch? '-50px' : '0px');
    if(showSearch) searchEl.childNodes[1].focus();
}

// togle nav top
function toggleNavTop()
{
  showNavTop = !showNavTop;
  const el = document.getElementById('top-menu');
  el.style.left=(showNavTop ? '0' : '-50%');
}

// check is el has class
function hasClass(el, className) 
{
  if (el.classList)
  {
    return el.classList.contains(className);
  }
  else
  {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
}

// add class to el
window.addClass = function(el, className) 
{
  if (el.classList) 
  {
    el.classList.add(className);
  }
  else if (!hasClass(el, className)) 
  {
    el.className += " " + className;
  }
}

// remove class from el
window.removeClass = function(el, className) {
  if (el.classList)
  {
    el.classList.remove(className);
  }
  else if (hasClass(el, className)) 
  {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}

// modal
window.modal = function(act, target)
{
  const el = document.getElementById(target);
  if(act=='open') addClass(el, 'open');
  if(act=='close') removeClass(el, 'open');
}

// fullalert
window.fullalert = function(type, text, alwayshow){
  // auto close alert
  let timeout
  const fullalertEl = document.getElementById('fullalert');
  if(fullalertEl.firstChild) fullalertEl.removeChild(fullalertEl.firstChild);//clear child node
  clearTimeout(timeout)
  
  if(!alwayshow && type != 'close')
  {
    setTimeout(function(){
      if(fullalertEl.firstChild) fullalertEl.removeChild(fullalertEl.firstChild);//clear child node
    }, 3000)
  }

  if(type == 'close') return true;
  // extends alert child
  const divEl = document.createElement('div');
  divEl.className = `fullalert fullalert-${type}`;
  const textNode = document.createTextNode(text);
  divEl.appendChild(textNode);
  return fullalertEl.appendChild(divEl);
}