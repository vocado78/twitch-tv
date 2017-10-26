$(document).ready(function() {
  var users = [
    "esl_sc2",
    "freecodecamp",
    "noobs2ninjas",
    "leagueofgirlsla",
    "nintendino"
  ];
  // What to display if user is online
  function userOnline(user) {
    var urlOnline = "https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?";
    $.getJSON(urlOnline,
      function(data) {
        if (data.stream !== null) {
          $(".streamer-display").append(
            "<div class='status online'><img src=" +
              data.stream.channel.logo +
              " width='50' height='50'/>" +
              "<a href=" +
              data.stream.channel.url +
              ">" +
              data.stream.channel.display_name +
              "</a></div<div class='details online'><p>" +
              data.stream.channel.game +
              " " +
              data.stream.channel.status +
              "</p></div>"
          );
        } else {
          userOffline(user);
        }
      }
    );
  }
  // What to display if user is offline or account closed
  function userOffline(user) {
    var urlOffline = "https://wind-bow.gomix.me/twitch-api/channels/" + user + "?callback=?";
    $.getJSON(urlOffline,
      function(data) {
        if (data.status !== 404) {
          $(".streamer-display").append(
            "<div class='status offline'><img src=" +
              data.logo +
              " width='50' height='50'/>" +
              "<a href=" +
              data.url +
              ">" +
              data.display_name +
              "</a></div><div class='details offline'><p>Offline</p></div>"
          );
        } else {
          $(".streamer-display").append(
            "<div class='status not-found'><img src='http://via.placeholder.com/50x50'/>" +
              "<a href='https://www.twitch.tv/" +
              user +
              "'>" +
              user +
              "</a><p>Sorry, this account does not exist anymore</p></div>"
          );
        }
      }
    );
  }
  // To display the data
  for (var i = 0; i < users.length; i++) {
   userOnline(users[i]);
  }
  
  // Button functions to change which users to display depending on status
  $("#online").on("click", function() {
    $(".online").show();
    $(".offline").hide();
    $(".not-found").hide();
  });

  $("#offline").on("click", function() {
    $(".offline").show();
    $(".online").hide();
    $(".not-found").hide();
  });

  $("#all").on("click", function() {
    $(".online").show();
    $(".offline").show();
    $(".not-found").show();
  });
});