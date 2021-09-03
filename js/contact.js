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