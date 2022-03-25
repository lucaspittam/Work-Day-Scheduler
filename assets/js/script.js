
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
