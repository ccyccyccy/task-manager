document.addEventListener("DOMContentLoaded", function() {
  let toggle_links = document.querySelectorAll('td.toggle_link');
  let table_body = document.querySelector('#table > tbody');

  toggle_links.forEach(
    function(toggle_link) {
      toggle_link.addEventListener('click', toggle, false);
    });

  // insert/remove new row with details on task
  function toggle(event) {
    let link = this.childNodes[0]; // link is the <a> tag
    let id = this.parentNode.getAttribute('data-task-id');
    let parentRow = this.parentNode;

    if(link.innerHTML === '[+]') {
      link.innerHTML = '[-]';
      Rails.ajax({
        type: "GET",
        url: "/tasks/" + id,
        success: addRow,
        error: function(response){alert( 'ERROR! Task not found' );}
      });
    } else {
      link.innerHTML = '[+]';
      table_body.removeChild(parentRow.nextElementSibling);
    }

    function addRow(response) {
      let newrow = document.createElement('tr');
      let emptycell = document.createElement('td');
      let cell = document.createElement('td');
      newrow.appendChild(emptycell);
      newrow.appendChild(cell);
      cell.innerHTML = response;
      table_body.insertBefore(newrow, parentRow.nextElementSibling);
    }

  }
});
