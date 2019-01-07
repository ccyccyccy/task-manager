document.addEventListener("DOMContentLoaded", function() {
  let expand_links = document.querySelectorAll('td.expand_link');
  let table_body = document.querySelector('#table > tbody');

  expand_links.forEach(
    function(expand_link) {
      expand_link.addEventListener('click', expand, false);
    });

  function expand(event) {
    this.childNodes[0].innerHTML = '[-]';
    let id = this.parentNode.getAttribute('data-task-id');
    Rails.ajax({
      type: "GET",
      url: "/tasks/" + id,
      success: (response) => {
        let newrow = document.createElement('tr');
        let emptycell = document.createElement('td');
        let cell = document.createElement('td');
        cell.setAttribute('colspan', '6');
        newrow.appendChild(emptycell);
        newrow.appendChild(cell);
        cell.innerHTML = response;
        table_body.insertBefore(newrow, this.parentNode.nextElementSibling);
      },
      error: function(response){return 'ERROR! Task not found';}
    });
    this.removeEventListener('click', expand, false);
    this.addEventListener('click', hide, false);
  }

  function hide(event) {
    this.childNodes[0].innerHTML = '[+]';
    table_body.removeChild(this.parentNode.nextElementSibling);
    this.removeEventListener('click', hide, false);
    this.addEventListener('click', expand, false);
  }
});
