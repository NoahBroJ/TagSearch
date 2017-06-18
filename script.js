$(document).ready(function() {
    
    /*Event for detecting tag inserts*/
    var event = new Event("insert");
    
    /*Function for inserting tags from tag-input*/
    function insertInput() {
        
        /*Declare variables for form data*/
        var input = $("#tag-list").find(".focus").data("name");
        var tags = $("#selected-tags");
        var tagsContent = tags.html();
        var query = $("#tag-search");
        var queryContent = query.val();
        var preparedTags = queryContent.split(";");
        var match = false;
        console.log("Input: " + input);

        /*If tag search does not already contain input*/
        for (i = 0; i < preparedTags.length; i++) {
            if (preparedTags[i] == input) {
                match = true;
            }
        }
        
        if (!match) {

            /*Add focused tag name as span to selected tags list*/
            tags.html(tagsContent + "<div class='tag' data-name='" + input + "'><span>" + input + "</span><button>X</button></div>");

            /*Add focused tag name to hidden input*/
            if (queryContent == "") {
                query.val(";" + input + ";");
            } else {
                query.val(queryContent + input + ";");
            }

            /*Reset input field*/
            $("#tag-input").val(null);
            
            /*Trigger event so that delete button can function*/
            window.dispatchEvent(event);
        }
        
        console.log("Query: " + query.val());
    }
    
    /*On key press in tag input*/
    $("#tag-input").on("keyup", function(e) {
        var self = $(this);
        
        /*If key was enter, insert input and hide list*/
        if (e.which == 13) {
            insertInput();
            $("#tag-input").blur();
            $("#tag-list").slideUp(200, function() {
                $("#tag-list").find(".focus").removeClass("focus");
            });
        
        /*If key was down arrow*/
        } else if (e.which == 40) {
            var focus = $("#tag-list").find(".focus");
            
            /*If current focus is not last in list, move focus to next*/
            if ($("#tag-list").find("li").last().data("name") != focus.data("name")) {
                focus.removeClass("focus");
                focus.next().addClass("focus");
            }
        
        /*If key was up arrow*/
        } else if (e.which == 38) {
            var focus = $("#tag-list").find(".focus");
            
            /*If current focus is not first in list, move focus to previous*/
            if ($("#tag-list").find("li").first().data("name") != focus.data("name")) {
                focus.removeClass("focus");
                focus.prev().addClass("focus");
            }
        }
    });
    
    /*On tag input focus, show list of tags and auto-focus first entry*/
    $("#tag-input").focusin(function() {
        $("#tag-list").slideDown(200);
        $("#tag-list").find("li").first().addClass("focus");
    });
    
    /*On click outside input element hide list of tags and unfocus first entry*/
    $(document).click(function(e) {
        if (!$(e.target).closest(".input-element").length) {
            if ($(".input-element").is(":visible")) {
                $("#tag-list").slideUp(200, function() {
                    $("#tag-list").find(".focus").removeClass("focus");
                });
            }
        }
    });
    
    /*On tag list item hover, switch focus class*/
    $("#tag-list").find("li").mouseenter(function() {
        var self = $(this);
        self.siblings(".focus").removeClass("focus");
        self.addClass("focus");
    });
    
    /*On focused item click, insert input and hide list*/
    $("#tag-list > li").click(function() {
        insertInput();
        $("#tag-input").blur();
        $("#tag-list").slideUp(200, function() {
            $("#tag-list").find(".focus").removeClass("focus");
        });
    });
    
    /*Delete button: Listen for updates to tags*/
    window.addEventListener('insert', function() {
        /*Delete button on tags*/
        $(".tag").find("button").click(function() {
            var self = $(this).closest(".tag");
            var name = self.data("name");
            var query = $("#tag-search").val();
            
            /*Remove deletion request from hidden input value*/
            var newQuery = query.replace(";" + name + ";", ";");
            $("#tag-search").val(newQuery);
            
            /*Clean up hidden input value if empty*/
            if ($("#tag-search").val() == ";") {
                $("#tag-search").val("");
            }
            
            /*Remove self from list of active tags*/
            self.remove();
            console.log("Deletion: " + name);
            console.log("Query: " + $("#tag-search").val());
        });
        
    });
});