const socket = io.connect('http://localhost:8686/alertfeed')
const defaultText = "Normal service, No Alerts"
const alert = 
$(document).ready(function() {
    date_time('date_time');
    // $('#blueItems').append(defaultText)
    // $('#redItems').append(defaultText)
    // $('#greenItems').append(defaultText)
    // $('#goldItems').append(defaultText)
    // $('#purpleItems').append(defaultText)
    // $('#expoItems').append(defaultText)
    socket.on('data', function(data){
        let currentTime = new Date();
        emptyAlerts()
        data.data.forEach(item => {
            item.effect_periods.forEach(period => {
                let startEffectTime = new Date(period.effect_start*1000)
                let endEffectTime = period.effect_end !== '' ? new Date(period.effect_end*1000) : null
                if (currentTime.getTime() > startEffectTime.getTime() && endEffectTime === null) {
                    console.log(`current time= ${currentTime.getTime()} start time= ${startEffectTime.getTime()} end time= ${endEffectTime}`)
                    displayAlerts(item, 'ongoing')
                } else if(currentTime.getTime() > startEffectTime.getTime() && currentTime.getTime() < endEffectTime.getTime()) {
                    console.log(`current time= ${currentTime.toLocaleString()} start time= ${startEffectTime.toLocaleString()} end time= ${endEffectTime.toLocaleString()}`)
                    displayAlerts(item, 'current')
                } 
            })
        })
        addNormalService()
    })
    
    scroll();
    window.setInterval(function() {
        date_time('date_time');
    }, 1000);
    
});

function scroll() {
    var dd = $('.vticker').easyTicker({
        direction: 'up',
        easing: 'easeInOutCirc',
        speed: 'medium',
        interval: 5000,
        height: '1920px',
        visible: 0,
        mousePause: 0
    }).data('easyTicker');
}
function addNormalService() {
    let arrayBox = ['#blueItems','#redItems','#greenItems','#goldItems','#purpleItems','#expoItems']
    arrayBox.forEach(ab => {
        let iDiv = document.createElement('li');
        iDiv.className = 'block';
        iDiv.innerHTML = defaultText
        if ($(ab+' li').length === 0) {
            $(ab).append(iDiv)
        }
    })
}
function date_time(id) {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    result = `Status as of: ${days[day]}  ${months[month]} ${d} ${year} ${date.toLocaleTimeString()}`;
    document.getElementById(id).innerHTML = result;
    return true;
}
function emptyAlerts() {
    $('#blueItems').empty();
    $('#redItems').empty();
    $('#greenItems').empty();
    $('#goldItems').empty();
    $('#purpleItems').empty();
    $('#expoItems').empty();
}
function displayAlerts(item, type) {
    item.affected_services.services.forEach(service => {
        let iDiv = document.createElement('li');
        if(service.route_id === '801') {
            if(type === 'current') {
                iDiv.className = 'blueblock';
                iDiv.innerHTML = item.header_text
                $('#blueItems').prepend(iDiv)
            } else {
                iDiv.className = 'blueblock';
                iDiv.innerHTML = item.header_text
                $('#blueItems').append(iDiv)
            }
        } else if (service.route_id === '802') {
            if(type === 'current') {
                iDiv.className = 'redblock';
                iDiv.innerHTML = item.header_text
                $('#redItems').prepend(iDiv)
            } else {
                iDiv.className = 'redblock';
                iDiv.innerHTML = item.header_text
                $('#redItems').append(iDiv)
            }
        } else if (service.route_id === '803') {
            if(type === 'current') {
                iDiv.className = 'greenblock';
                iDiv.innerHTML = item.header_text
                $('#greenItems').prepend(iDiv)
            } else {
                iDiv.className = 'greenblock';
                iDiv.innerHTML = item.header_text
                $('#greenItems').append(iDiv)
            }
        } else if (service.route_id === '804') {
            if(type === 'current') {
                iDiv.className = 'goldblock';
                iDiv.innerHTML = item.header_text
                $('#goldItems').prepend(iDiv)
            } else {
                iDiv.className = 'goldblock';
                iDiv.innerHTML = item.header_text
                $('#goldItems').append(iDiv)
            }
        } else if (service.route_id === '805') {
            if(type === 'current') {
                iDiv.className = 'purpleblock';
                iDiv.innerHTML = item.header_text
                $('#purpleItems').prepend(iDiv)
            } else {
                iDiv.className = 'purpleblock';
                iDiv.innerHTML = item.header_text
                $('#purpleItems').append(iDiv)
            }
        } else if (service.route_id === '806') {
            if(type === 'current') {
                iDiv.className = 'expoblock';
                iDiv.innerHTML = item.header_text
                $('#expoItems').prepend(iDiv)
            } else {
                iDiv.className = 'expoblock';
                iDiv.innerHTML = item.header_text
                $('#expoItems').append(iDiv)
            }
        } 
    })
}

 



