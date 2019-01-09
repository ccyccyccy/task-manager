
$( document ).on('turbolinks:load', function() {
  let toggle_links = $('.toggle_link');
  // let input_fields = $(".in_place_changable");

  // insert/remove new row with details on task
  function toggle(event) {
    let link = $(this); // link is the <a> tag
    let parentRow = $(this).closest('tr');
    let id = parentRow.attr('id');
    let hiddenrow = $('#hidden_task_' + id);
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
      hiddenrow.html('');
    }

    // add content to hidden row
    function addRow(response) {
      hiddenrow.html('<td colspan="3"</td><td>' + response + '</td>');
    }
  }

  // given input_element, find parent form and submit it
  // function submit_ajax(input_element) {
  //   let form = input_element.closest('form');
  //   Rails.fire(form[0], 'submit');
  // }

  toggle_links.click(toggle);

  // input_fields.keydown(function(event) {
  //   if(event.which === 13) {
  //     event.preventDefault();
  //     submit_ajax($(this));
  //   } else {}
  // });

  // input_fields.blur(function(event) {
  //   submit_ajax($(this));
  // });
});
