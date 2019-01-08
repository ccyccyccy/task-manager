$( document ).ready(function() {
  $(".editable").keydown(function(event) {
    if(event.which === 13) {
      event.preventDefault();
      let id = $(this).closest('tr')[0].id;
    } else {}
  });

  let toggle_links = $('td.toggle_link');
  let table_body = $('#table > tbody');

  toggle_links.click(toggle);

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
