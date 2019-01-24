// some notes
// d-flex and d-none cannot coexist
// need to remove d-flex during add d-none and vice versa when toggling
// initial class is either d-flex or d-none, not both

$( document ).on("turbolinks:load", function() {

  function toggle_remark(event) {
    let hiddenrow = $(this).closest("tbody").find(".remarks");

    $(this).html() === "[+]" ? $(this).html("[-]") : $(this).html("[+]");
    
    hiddenrow.toggleClass("d-flex");
    hiddenrow.toggleClass("d-none");
  }

  // toggle edit, hide remarks if expanded
  function toggle_edit(event) {
    let task_edit_form = $(this).closest(".task_overview");
    task_edit_form.toggleClass("d-none");
    task_edit_form.toggleClass("d-flex");

    let body = $(this).closest("tbody");
    let toggle_expand = body.find(".toggle_expand");
    if(toggle_expand.html() === "[-]") {
      toggle_expand.click();
    }

    let form_container = body.find(".task_form_container");
    // form_container do not have d-flex
    form_container.toggleClass("d-none");
  }

  // hide form, unhide overview, vice versa
  function cancel_update_form(event) {
    event.preventDefault(); // cancel button will trigger submit form for some reason. prevent this

    $(this).closest(".task_form_container").toggleClass("d-none");
    $(this).closest("tbody").find(".task_overview").toggleClass("d-none");
    $(this).closest("tbody").find(".task_overview").toggleClass("d-flex");
  }

  function toggle_new_task_form(event) {
    $(".new_task_container").find(".task_form_container").toggleClass("d-none");
  }

  function toggle_new_tag_form(event) {
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

  let toggle_new_button = $("#toggle_new_task_form");
  toggle_new_button.click(toggle_new_task_form);

  let toggle_new_tag_button = $("#toggle_new_tag");
  toggle_new_tag_button.click(toggle_new_tag_form);

  let cancel_new_tag_form_link = $("#new_tag_container").find(".cancel_tag_form_link");
  cancel_new_tag_form_link.click(toggle_new_tag_form);

  let toggle_edit_tag_button = $(".edit_tag");
  toggle_edit_tag_button.click(toggle_edit_tag);

  let cancel_edit_tag_form_link = $("#tag_list").find(".cancel_tag_form_link");
  cancel_edit_tag_form_link.click(toggle_edit_tag);
});
