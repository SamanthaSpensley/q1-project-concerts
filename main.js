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

        $('#name').hide('slow');
        $('.intro h3').hide('slow');
        $('#userInput').hide('slow');
        $('.new-search').show();

        var $results = $('<h2>').text('Concerts related to ' + artist + ' near ' + location + ':');
        $('.intro').attr('val', 'results').append($results)

        if (data === undefined || data.length === 0) {
          $('.intro').append($('<p>', {'class': 'lead', text: "Unfortunately there are no upcoming shows related to " + artist + " near " + location}));
        }
        else {

          for (var i =0; i < data.length; i++) {
            console.log(data[i].ticket_url);

            $('#dataContainer').append(
                $('<div/>', {'class': 'card-horizontal col-lg-4 col-xs-12'}).append(
                  $('<div/>', {'class': 'card-image'}).append(
                    $('<img/>', {src: data[i].artists[0].thumb_url, 'class':'artist-image'})
                  )
                )
                .append(
                  $('<div/>', {'class': 'title'}).append(
                    $('<h4/>', {text: data[i].title})
                  )
                )
                .append(
                  $('<div/>', {'class': 'supporting'}).append(
                    $('<p/>', {text: data[i].formatted_datetime})
                  )
                )
                .append(
                  $('<div/>', {'class': 'ticket-link'}).append(
                    $('<a />', {text: 'Tickets', href: 'data[i].ticket_url'})
                      //$('<input/>', {'type': 'button', 'val': 'Tickets', 'class': 'btn-default', onclick: location.href='data[i].ticket_url'})
                  )
                )
            );
          }
        }


      })
      .catch(function (error) {
        console.log('THIS IS AN ERROR');
        var $locErrMsg = $('<p>');
        $locErrMsg = $locErrMsg.text('We\'re sorry, Bebop doesn\'t recognize that location. Please try another location (ex. Denver, CO).');
        $locErrMsg = $locErrMsg.attr('class', 'lead');
        $('.errMsg').append($locErrMsg)
      });
    })




//TO DO
//message when nothing is returned
//album art per artist, not event




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

});
