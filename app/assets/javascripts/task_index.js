$( document ).on("turbolinks:load", function() {
  function toggle_remark(event) {
    let link = $(this); // link is the <a> tag
    let hiddenrow = link.closest("tbody").find(".remarks");
    if(link.html() === "[+]") {
      link.html("[-]");
      hiddenrow.removeClass("d-none");
      hiddenrow.addClass("d-flex");
    } else {
      link.html("[+]");
      hiddenrow.removeClass("d-flex");
      hiddenrow.addClass("d-none");
    }
  }

  function toggle_edit(event) {
    $(this).closest(".task_overview").addClass("d-none");
    $(this).closest(".task_overview").removeClass("d-flex");
    let body = $(this).closest("tbody");
    let toggle_expand = body.find(".toggle_expand");
    if(toggle_expand.html() === "[-]") {
      toggle_expand.click();
    }
    let form_container = body.find(".task_form_container");
    form_container.removeClass("d-none");
  }

  function cancel_update_form(event) {
    event.preventDefault();
    $(this).closest(".task_form_container").addClass("d-none");
    $(this).closest("tbody").find(".task_overview").toggleClass("d-none");
    $(this).closest("tbody").find(".task_overview").toggleClass("d-flex");
  }

  function toggle_new(event) {
    $(".new_task_container").find(".task_form_container").toggleClass("d-none");
  }

  function toggle_new_tag(event) {
    event.preventDefault();
    $("#new_tag_container").find(".tag_form_container").toggleClass("d-none");
  }

  function toggle_edit_tag(event) {
    event.preventDefault();
    $(this).closest(".tag_container").find(".tag_form_container").toggleClass("d-none");
  }

  let toggle_expands = $(".toggle_expand");
  toggle_expands.click(toggle_remark);

  let toggle_edits = $(".toggle_edit");
  toggle_edits.click(toggle_edit);

  let cancel_form_links = $(".cancel_form_link");
  cancel_form_links.click(cancel_update_form);

  let toggle_new_button = $("#toggle_new");
  toggle_new_button.click(toggle_new);

  let toggle_new_tag_button = $("#toggle_new_tag");
  toggle_new_tag_button.click(toggle_new_tag);

  let cancel_new_tag_form_link = $("#new_tag_container").find(".cancel_tag_form_link");
  cancel_new_tag_form_link.click(toggle_new_tag);

  let toggle_edit_tag_button = $(".edit_tag");
  toggle_edit_tag_button.click(toggle_edit_tag);

  let cancel_edit_tag_form_link = $("#tag_list").find(".cancel_tag_form_link");
  cancel_edit_tag_form_link.click(toggle_edit_tag);
});
