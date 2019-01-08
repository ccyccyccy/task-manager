$( document ).ready(function() {

  let toggle_links = $('td.toggle_link');
  let editables = $(".editable");

  toggle_links.click(toggle);

  editables.keydown(function(event) {
    if(event.which === 13) {
      event.preventDefault();
      submit_field($(this));
    } else {}
  });

  // Takes jquery object with form child and submit
  function submit_field(field) {
     let form = field.find('form');
     Rails.fire(form[0], 'submit');
  }

  // insert/remove new row with details on task
  function toggle(event) {
    let link = $(this).find('a'); // link is the <a> tag
    let parentRow = $(this).closest('tr');
    let id = parentRow.attr('id');
    console.log(id);

    if(link.html() === '[+]') {
      link.html('[-]');
      Rails.ajax({
        type: "GET",
        url: "/tasks/" + id,
        success: addRow,
        error: function(response){alert( 'ERROR! Task not found' );}
      });
    } else {
      link.html('[+]');
      parentRow.next().remove();
    }

    // format response into new row and append to parentRow
    function addRow(response) {
      let newrow = `
        <tr>
          <td></td>
          <td>` + response + `</td>
        </tr>`;
      parentRow.after(newrow);
    }
  }
});
