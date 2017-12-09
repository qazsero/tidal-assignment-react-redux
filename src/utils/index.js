import fetchJsonp from 'fetch-jsonp'


//Function to make an ajax call to the deezer api that returns JSONP to avoid the CORS limitagtion
export const fetchData = qstring => {
  return fetchJsonp(`${qstring}&output=jsonp&callback=JSONP_CALL`, {
    timeout: 50000,
  })
  .then(o => o.json())
}

//Function to convert seconds in a fancy format like 0:00 or 0:00:00
export const fancyTimeFormat = time =>
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
