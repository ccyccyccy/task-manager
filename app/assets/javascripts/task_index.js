$( document ).ready(function() {

  let toggle_links = $('td.toggle_link');
  let input_fields = $("input[name*='task[title]']");

  // insert/remove new row with details on task
  function toggle(event) {
    let link = $(this).find('a'); // link is the <a> tag
    let parentRow = $(this).closest('tr');
    let id = parentRow.attr('id');
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

  // given input_element, find parent form and submit it
  function submit_ajax(input_element) {
    let form = input_element.closest('form');
    Rails.fire(form[0], 'submit');
  }

  toggle_links.click(toggle);

  input_fields.keydown(function(event) {
    if(event.which === 13) {
      event.preventDefault();
      submit_ajax($(this));
    } else {}
  });

  $(document).on('blur', "input[name*='task[title]']", function(event) {
    submit_ajax($(this));
  });


});
