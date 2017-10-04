function tableCreate(startDate) {
    var rows = 12,
        cols = 8;
        date = startDate;
        week = 0;

    for(var i = 0; i < rows; i++) {
        calendar = $('#calendar tbody')
        calendar.append('<tr></tr>');
        calendar.find('tr').eq(i).append('<td>' + week + '<br>&nbsp</td>');
        for(var j = 1; j < cols; j++) {
            // afaik there's no date formating functions in the date object
            calendar.find('tr').eq(i).append('<td>' + getMonthDateString(date) + '<br>&nbsp</td>');
            date = getNextDay(date)
        }
        week += 1
    }
}

/** Returns the date + 24 hours */
function getNextDay(date){
    var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
    return tomorrow
}

/** Based on the week the date falls on, return that week's Sunday date */
function getSundayDate(date){
    if(date.getDay() == 7) {
        return date
    }
    return date
}

/** Returns date in string format mm/dd. Optional padding parameter (bool) to left pad with 0. */
function getMonthDateString(date, padding = false){
    var month = date.getMonth() + 1         // Jan = 0 for getMonth()
    var day = date.getDate()

    if(padding = true){
        while(String(month).length < 2)     // pad_len of 2 would be 09/30, 10/01, 10/02, ...
            month = "0" + month;
        while(String(day).length < 2)
            day = "0" + day
    }

    return month + '/' + day
}

$(document).ready(function(){
    var start_date = new Date("2017-09-24T12:00:00Z");
    tableCreate(start_date);

    // Event listeners
    $('#tablecopybtn').click(function() {
        var emailLink = document.querySelector('#calendar');        // Select the table
        var range = document.createRange();
        range.selectNode(emailLink);
        window.getSelection().addRange(range);

        try {                                                       // Copy command
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy command was ' + msg);
        } catch(err) {
            console.log('Oops, unable to copy');
        }

        window.getSelection().removeAllRanges();                    // Remove the selections
    });

    // alternatively don't use jquery for event listener...
    // var copyTableBtn = document.querySelector('#tablecopybtn');
    // copyTableBtn.addEventListener('click', function(event) {
    //    ...
    // }
})



