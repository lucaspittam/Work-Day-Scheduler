
// Main variables
var events = []

// current date 
var today = moment().format("MMM Do YYYY")
//console.log(today)
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
        loadSection.siblings(".textSection").children(".eventPInfo").text(events[i].text)
    }


    $('.hour').each(function() {
        checkEvents(this)
       // console.log(checkEvents)
    });
}
// function for saving events to the local storage
var saveEvents = () => {
localStorage.setItem("events", JSON.stringify(events));
}

// create p element that can be editied into textArea
$(".timeSection").on("click", ".textSection", function() {
    var text = $(this).text().trim()
    console.log(this)

    var textAdd = $("<textArea>").addClass("boxy").val(text)
    var changeP = $("p", this);
    changeP.replaceWith(textAdd)
    textAdd.trigger("focus")
//check if input is past present or future and add styling
    if ($(this).hasClass("past")) {
        textAdd.addClass("pastTextArea")
    }
    else if ($(this).hasClass("present")) {
        textAdd.addClass("presentTextArea")
    }
    else if ($(this).hasClass("future")) {
        textAdd.addClass("futureTextArea")
    }
});
//save button
$(".saveButton").on("click", function() {
    var eventInfo = $(this).siblings(".textSection").children("textarea").val();
   
    if(eventInfo === undefined) {
        return;
    }
    var eventTime = $(this).siblings(".hour").text();
    var newInfo = true;
    
    for (var i = 0; i < events.length; i++) {   
        if (events[i].time === eventTime) {  
            newInfo = false;
            events[i].text = eventInfo;

            if (eventInfo === ""){
                events.splice(i, 1);
                break;
            }
        }
    }
    if (newInfo === true) {
        events.push({time: eventTime, text: eventInfo});
    }
    
    var changeP = $("<p>").addClass("eventPInfo").text(eventInfo);
    $(this).siblings(".textSection").children("textarea").replaceWith(changeP);

    saveEvents()
});

checkEvents = (eventElement) => {

    var sectionTime = $(eventElement).text();
    sectionTime = sectionTime.split(" ");
   
    if (sectionTime[1] === "pm" && sectionTime[0] !== "12"){
        sectionTime[0] = parseInt(sectionTime[0]);
       
        sectionTime[0] += 12;
    }
    var colorBox = $(eventElement).siblings(".textSection");
    colorBox.removeClass("past present future");
    if (moment().isAfter(moment().hour(sectionTime[0]))) {
       // console.log("past");
       colorBox.addClass("past");
    } else if (moment().isSame(moment().hour(sectionTime[0]))) {
        //console.log("present");
        colorBox.addClass("present");
    }   else if (moment().isBefore(moment().hour(sectionTime[0]))) {
        //console.log("future");
        colorBox.addClass("future");
    }
};

getEvents();

//set timeClock to check events 
var timeClock = setInterval(function() {
    $(".hour").each(function() {
        checkEvents(this);
        //clearInterval(timer);
    })
}, 300000);