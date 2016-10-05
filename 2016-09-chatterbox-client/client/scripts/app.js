var app = {
  server: 'http://127.0.0.1:3000/classes/messages/',
    friendsList: {},
  createRoom : function() {
    event.preventDefault();
    var roomField = $('.roomField').val();
    var roomSelect = document.getElementById('roomSelect');
    var option = document.createElement('option');
    option.text = roomField;
    option.attr = ('onclick', window.open('index.html', '_blank'))
    console.log(option);
    roomSelect.add(option);
    $('#roomform')[0].reset();
    this.clearMessages();
    this.fetch({where: {roomname: roomField}});
    return [roomField, this.username];
  },
  init : function () {
  },


  send : function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'jsonp',
      success: function (data) {
        console.log('sending message', data);
        app.clearMessages();
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', message, data);
        // console.log('attempting transmission', message, data);

      }
    });
  },
  fetch : function(dataOption = {order: '-createdAt'}) {
    var chatData;
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'jsonp',
      // data: dataOption,
      success: function (data) {
        console.log(data);
        data = JSON.parse(data).results
        data.forEach(function (data) {
          app.renderMessage(data);
        });
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
    return chatData;
  },
  clearMessages : function() {
    $('.chats').children().remove();
  },
  renderMessage : function(message, internal) {
    var $msg = $('<div class=' + message.objectId + '></div>');
    $('.chats').append($msg);
    $($msg).addClass('messages')
    .append('<button class=usernameInMessage>' + '@' + '</button>')
    .append('<span class=textInMessage>' + '</span>')
    .append('<div class=timeInMessage>' + moment(message.createdAt).format('MMM Do, h:mm: a') + '</div>');
    $('.' + message.objectId + ' button').text('' + message.username);
    $('.' + message.objectId + ' span').text(': ' + message.text);
  },
  renderRoom : function(roomName) {
    $('.roomSelect').append('<option>' + roomName + '</option>');
  },
  username: window.location.search.split('').slice(10).join(''),

};
  $(document).ready(function() {
    var submitMessage = $('.submit').on('click', function(event) {
      var message = {
        username: app.username,
        text: $('.message').val(),
        roomname: 'lobby'
      };
      app.send(message);
      event.preventDefault();
    });
    var clearMessage = $('.clear').on('click', function() { app.clearMessages() });
    var refreshPage = $('.refresh').on('click', function() { location.reload() });
    var createRoom = $('.createRoom').on('click', function(event) { 
      var getRoom = app.createRoom() 
    });
    var selectRoomFromList = $('#roomSelect').change(function() { 
      app.clearMessages();
      app.fetch({where: {roomname: $(this).val()}});
    });
    $('body').delegate('.usernameInMessage', 'click', function() {
      var user = $(this).text();
      var username = user.split('').slice(1).join('');
      app.friendsList[username] = username;
      $('.messages:contains(' + user + ')').attr('class', 'friend messages');
    });
  });
var parseRequest = app.fetch();
    //BETTER UNDERSTAND EVENT BINDING - ON VS DELEGATE
    // GO BETTER UNDERSTAND INPUT AND HOW IT RELATES TO FORMS / BUTTONS / SUBMISSION
      //Learn to understand and organize appended DOM elements