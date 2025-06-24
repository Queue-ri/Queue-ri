/* not gonna use the weather api right now */
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY

import fs from 'fs'
import got from 'got'
import Qty from 'js-quantities/esm'
import { formatDistance } from 'date-fns'

let WEATHER_DOMAIN = 'http://dataservice.accuweather.com'

const emojis = {
  1: '☀️',
  2: '☀️',
  3: '🌤',
  4: '🌤',
  5: '🌤',
  6: '🌥',
  7: '☁️',
  8: '☁️',
  11: '🌫',
  12: '🌧',
  13: '🌦',
  14: '🌦',
  15: '⛈',
  16: '⛈',
  17: '🌦',
  18: '🌧',
  19: '🌨',
  20: '🌨',
  21: '🌨',
  22: '❄️',
  23: '❄️',
  24: '🌧',
  25: '🌧',
  26: '🌧',
  29: '🌧',
  30: '🥵',
  31: '🥶',
  32: '💨',
}

// Cheap, janky way to have variable bubble width
const dayBubbleWidths = {
  Monday: 237,
  Tuesday: 237,
  Wednesday: 262,
  Thursday: 247,
  Friday: 222,
  Saturday: 247,
  Sunday: 232,
}

// My local time
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
const today = convertTZ(new Date(), "Asia/Seoul");
const todayDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Seoul' }).format(today);

// Set data
fs.readFile('template.svg', 'utf-8', (error, data) => {
  if (error) {
    return
  }

  data = data.replace('{todayDay}', todayDay)
  data = data.replace('{dayBubbleWidth}', dayBubbleWidths[todayDay])

  data = fs.writeFile('chat.svg', data, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
})


/* below is the original script */

// Today's weather
// const locationKey = '18363_PC'
// let url = `forecasts/v1/daily/1day/${locationKey}?apikey=${WEATHER_API_KEY}`

// got(url, { prefixUrl: WEATHER_DOMAIN })
//   .then((response) => {
//     let json = JSON.parse(response.body)

//     const degF = Math.round(json.DailyForecasts[0].Temperature.Maximum.Value)
//     const degC = Math.round(Qty(`${degF} tempF`).to('tempC').scalar)
//     const icon = json.DailyForecasts[0].Day.Icon

//     fs.readFile('template.svg', 'utf-8', (error, data) => {
//       if (error) {
//         return
//       }

//       data = data.replace('{degF}', degF)
//       data = data.replace('{degC}', degC)
//       data = data.replace('{weatherEmoji}', emojis[icon])
//       data = data.replace('{psTime}', psTime)
//       data = data.replace('{todayDay}', todayDay)
//       data = data.replace('{dayBubbleWidth}', dayBubbleWidths[todayDay])

//       data = fs.writeFile('chat.svg', data, (err) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//       })
//     })
//   })
//   .catch((err) => {
//     // TODO: something better
//     console.log(err)
//   })