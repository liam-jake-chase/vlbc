// Menu functionality

(function () {
  'use strict';

  class Menu {
    constructor(settings) {
      this.menuRootNode = settings.menuRootNode;
      this.isOpened = false;
    }

    changeMenuState(menuState) {
      return this.isOpened = !menuState;
    }

    changeToggleHint(toggleHint, toggleNode) {
      toggleNode.textContent = toggleHint;
      return toggleHint;
    }
  }

  const menuClassesNames = {
    rootClass: 'menu',
    activeClass: 'menu_activated',
    toggleClass: 'menu__toggle',
    toggleHintClass: 'menu__toggle-hint'
  }

  const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
  const demoMenu = new Menu({
    menuRootNode: jsMenuNode
  });

  function getCurrentToggleHint(currentMenuState) {
    return (currentMenuState !== true) ? 'Open menu' : 'Close menu';
  }

  function toggleMenu(event) {

    let currentMenuState = demoMenu.changeMenuState(demoMenu.isOpened);
    let toggleHint = getCurrentToggleHint(currentMenuState);

    demoMenu.changeToggleHint(
      toggleHint,
      demoMenu.menuRootNode.querySelector(`.${menuClassesNames.toggleHintClass}`)
    );
    demoMenu.menuRootNode.classList.toggle(`${menuClassesNames.activeClass}`);

    return currentMenuState;
  }

  jsMenuNode.querySelector(`.${menuClassesNames.toggleClass}`).addEventListener('click', toggleMenu);
})();

//validation for form so nothing can submit without all fields filled in

const post = document.querySelector('form');
post.oninput = () => {
  post.querySelector('#submitbutton').disabled = [...post.querySelectorAll(':scope > [name]')]
    .some(input => !input.value.trim())
};



// modal for sending contact
let contactSend = () => {
  $("#contactModal").modal("show");
  setTimeout(() => $("#contactModal").modal("hide"), 2500)
}

//send form to email

window.onload = () => {
  document
    .querySelector('.contact__form')
    .addEventListener("submit", sendEmail = (event) => {
      event.preventDefault();

      let data = {

        'name': event.target.name.value,
        'email': event.target.email.value,
        'phone': event.target.phone.value,
        'message': event.target.message.value,
        _template: "table",


      };

      $.ajax('https://formsubmit.co/ajax/josh.fusillo@gmail.com', {
        type: 'POST',

        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(function () {
        contactSend();
        event.target.reset();
        location.reload();
      }).fail(function (error) {
        console.log('Oops... ' + JSON.stringify(error));
      });
    })
}