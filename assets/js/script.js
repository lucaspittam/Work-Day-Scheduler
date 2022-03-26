
// Main variables
var events = []
var 
var
// current date 
var today = moment().format("mm, dd, yyyy")
console.log(today)
$("#currentDay").text(today);
// local storage functions
var getEvents = () => {
    //console.log(getEvents)
    events = JSON.parse(localStorage.getItem("events"))
    if (!events) {
        events = []
    } 
    for (let i = 0; i < events.length; i++) {
        var loadSection = $(".hour:contains('" + events[i].time + "')")
       // console.log(loadSection);
        loadSection.siblings(".textSection").children(".eventInfo").text(events[i].text)
    }


    $('.hour').each(function() {
        checkevents(this)
        //console.log(checkEvents)
    });
}
// function for saving events to the local storage
var saveEvents = () => {
localStorage.setItem("events", JSON.stringify(events));
}

// create p element that can be editied into textArea
$(".timeSection").on("click", ".textSection", function() {
    let getText = $(this).text().trim()
    //console.log(text)
    var input = $("<textArea>").addClass("kkk").val(text)
    var changeP = $("p", this);
    changeP.replaceWith(getText)
    getText.trigger("focus")
//check if input is past present or future and add styling
    if ($(this).hasClass("past")) {
        textInput.addClass("pastTextArea")
    }
    else if ($(this).hasClass("present")) {
        textInput.addClass("presentTextArea")
    }
    else if ($(this).hasClass("future")) {
        textInput.addClass("futureTextArea")
    }
});

