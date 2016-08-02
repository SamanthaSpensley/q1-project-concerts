$(document).ready(function(){

  //"http://cors-anywhere.herokuapp.com/http://api.bandsintown.com/artists/houndmouth/events/recommended?location=Denver,Colorado&app_id=concertgen&api_version=2.0&format=json";

  $('.card-horizontal').hide();
  $('.new-search').hide();

  $('.new-search').on('click', function() {
    location.reload('slow');
  })

  $('form').submit(function(event){
    event.preventDefault();

    var artist = $("#artist").val();
    var location = $("#location").val();
    var url = 'http://cors-anywhere.herokuapp.com/http://api.bandsintown.com/artists/' + artist + '/events/recommended?location=' + location + '&radius=150&app_id=concertgen&api_version=2.0&format=json';

    $.get(url)
      .then(function (data){

        $('.intro h1').hide('slow');
        $('.intro h3').hide('slow');
        $('#userInput').hide('slow');

        var $results = $('<h2>').text('Concerts related to ' + artist + ' near ' + location + ':');
        $('.intro').attr('val', 'results').append($results)
        var $repeatSearch = $('<button>')

        console.log(data);
        for (var i =0; i < data.length; i++) {
          $('.new-search').show();

          $('#dataContainer').append(
              $('<div/>', {'class': 'card-horizontal'}).append(
                $('<div/>', {'class': 'card-image'}).append(
                  $('<img/>', {src: data[i].artists[0].thumb_url, 'class':'artist-image'})
                )
              )
              .append(
                $('<div/>', {'class': 'title'}).append(
                  $('<h3/>', {text: data[i].title})
                )
              )
              .append(
                $('<div/>', {'class': 'supporting'}).append(
                  $('<p/>', {text: data[i].formatted_datetime})
                )
              )
            );

        }

      })
      .catch(function (error) {
        console.log(error);
      });
    })



//message when nothing is returned
//error message when inputs are left empty
//album art per artist, not event
//single material cards per artist

//OLD
// var $newOption = $("<h3>");
// var $dateDetails = $("<p>");
// var $image = $('<img>');
// var $btn = $()
// $newOption = $newOption.text(data[i].title);
// $newOption = $newOption.attr("val", data[i].title);
// $dateDetails = $dateDetails.text(data[i].formatted_datetime);
// $dateDetails = $dateDetails.attr("val", data[i].formatted_datetime);
// $image = $image.attr('src', data[i].artists[0].thumb_url);
// $image = $image.attr('val', 'artistImage');
// $('.card-content').append($image);
// $('.card-content').append($newOption);
// $('.card-content').append($dateDetails);
// $('.card-horizontal').show();




//EXAMPLE CALLS
//http://api.bandsintown.com/artists/Nas/events/recommended?format=json&app_id=YOUR_APP_ID&api_version=2.0&location=London,United+Kingdom&callback=showEvents

//http://api.bandsintown.com/artists/Common/events/recommended?location=use_geoip&radius=50&app_id=YOUR_APP_ID&api_version=2.0&format=json




//API ATTEMPT 2
//   var artist = 'Beyonce'
//   var location = 'London,United+Kingdom'
//   var app_id = 'concertgen'
//
//
//   var url = 'http://cors-anywhere.herokuapp.com/api.bandsintown.com/artists/' + artist + 'recommended?format=json&app_id' + app_id + '&api_version=2.0&location=' + location + 'callback=showEvents'
//

//WORKS!!!!
  // $.ajax({
  //   url: 'http://cors-anywhere.herokuapp.com/api.bandsintown.com/artists/Skrillex/events.json?api_version=2.0&appra=randomapp',
  //   success: function (data) {
  //     console.log(data);
  //   }
  // })




  // $('form').submit(function(event){
  //   event.preventDefault();

  // $('#getButton').on('click', function(){
  //   var url = "http://cors-anywhere.herokuapp.com/api.bandsintown.com/artists/houndmouth/events/recommended?location=use_geoip&radius=150&app_id=YOUR_APP_ID&api_version=2.0&format=json";

// "http://cors-anywhere.herokuapp.com/api.bandsintown.com/artists/houndmouth/events/recommended?location=use_geoip&radius=150&app_id=YOUR_APP_ID&api_version=2.0&format=json";
//
//     $.ajax({
//       url: url,
//       method: 'GET',
//       //data: {limit: 50},
//     }).done(function(result) {
//       console.log(result);
//     }).fail(function(err) {
//       throw err;
//     });
//   })




//FROM GITHUB
// bandsintownFactory.getRecommendedEventsFromArtistByLocation({
//     artist:"Beyonce", // ? and / characters must be double escaped. Artists such as "AC/DC" will end up as "AC%252FDC"
//     artist_id:"<ARTIST_ID>", // (optional) fallback: mbid_<id> (MusicBrainz ID), fbid_<id> (Facebook Page ID)
//     date:"<DATE>", // (optional) (default: upcoming) yyyy-mm-dd || yyyy-mm-dd,yyyy-mm-dd (inclusive range) || upcoming || all
//     location:"74.221.211.12", // city,state (US or CA) || city,country || lat,lon || ip address
//     //radius:"<RADIUS">, // (optional) (default: 25) in miles. valid values: 0-150
//     only_recs:"<ONLY_RECS>", // (optional) (default: false) if true, the response will only include matching events for artists similar to the specified artist. if false, the response may also include matching events for the specified artist.
//     app_id:"concertfac", //The application ID can be anything, but should be a word that describes your application or company.
// }).then(function (_data) {
//     //on success
// }).catch(function (_data) {
//     //on error
// });




});
