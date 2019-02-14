const axios = require('axios')
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8686;
const url = 'https://alerts.metroservices.io/developer/api/v2/alerts?api_key=4oJedLBt80WP-d7E6Ekf5w&format=json'
const io = require('socket.io')(http);
const _ = require('lodash');
const alertData = require('./alertdata')
var time = 0
app.use(express.static('public'))


var vloc = io
.of('/alertfeed')
.on('connection', function(socket){
    axios.get(url)
    .then(response => {
        socket.emit('data', {data:infoArr(response.data.alerts)});
        //socket.emit('data', {data:alertData});
        time = 30000
    })
    // .then(response => {
    //     setInterval(()=> {
    //         axios.get(url)
    //         .then(response => {
    //             socket.emit('data', {data:alertData});
    //         })
    //     }, time)
    // })
    
    .then(() => {
        setInterval(()=> {
            axios.get(url)
            .then(response => {
                socket.emit('data', {data:infoArr(response.data.alerts)});
            })
        }, time)
    })
     
})
function infoArr (alert_data){
    let result= []
    let mapAlert = alert_data.map(alert =>{
       let temp =[]
       alert.affected_services.services.forEach(service => {
           if (service.mode_name === 'Subway') {
               temp.push(alert)
           }
       })
       return temp
    })
    let filterAlert = mapAlert.filter(mapAlertItem => {
        return mapAlertItem.length !== 0;
    })
    
    result = filterAlert.reduce((acc,curr) => {
        return acc.concat(curr)
    })
    let bucket = _.uniq(result)
    return bucket

}
http.listen(port, function(){
    console.log('listening on *:' + port);
});
