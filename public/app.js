$(document).on("click", ".newNote", function(){
    
    console.log("e");

    var id = $(this).attr("data-value");

    $.ajax({
        method: "GET",
        url: "/new/" + id
    }).done(function(data){
        console.log(data);
        if (data.note) {
            $(".oldNotes").append(data.note.body);
        };
        $(".newForm").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary'>Add Note</button>");
    });
})


$(document).on("click", "#savenote", function(){

    var id = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url:"/new/" + id, 
        data: {
            body: $("#bodyInput").val()
        }
    }).done(function(data){
        console.log(data);
    })

})