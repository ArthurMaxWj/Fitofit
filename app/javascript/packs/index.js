function formatted(sec) {
  var min = sec / 60;
  var sec = sec % 60;
  var hours = min / 60;
  min = min % 60;

  min = Math.floor(min);
  sec = Math.floor(sec);
  hours = Math.floor(hours);

  var composed = min + "min " + sec  + "s";
  if (hours > 0)
    composed = hours + "h " + composed;
    
  return composed;
}

$(document).ready(function() {
  $('#fill-required').hide(); // not visible until validation fails

  // start counters:
  var counterSpan = $('.counter-stopper > span');
  var counter = counterSpan.parent();
  var start = new Date(counter.attr('data-start-timestamp') * 1000);
  setInterval(function() {
    counterSpan.text(formatted(Math.floor((Date.now() - start) / 1000)));
  }, 1000);
  
  // stop counter (save time)
  $('.counter-stopper > button').click(function () {
    var walkId = $(this).parent().attr('data-walk-id'); // TODO test this
    var currTime = Math.floor(Date.now() / 1000);
    link = "/finish-walk?id=" + walkId + "&time=" + currTime
    window.location.href = link;
  });

  // countinue walking:
  $('.walk > button').click(function () {
    var ts = $(this).parent().attr('data-start-timestamp');
    var date = (new Date(ts * 1000)).toISOString().substr(0, 16); // substring is needed to match HTML component format

    document.getElementById('sstart').value = date;
    $('form #origin').val($(this).parent().attr('data-origin'));
  });

  // form events:

  $('form').off('submit');
  
  $('form #add').click(function (e) {
    e.preventDefault();

    if (!requiredNonempty('input[type=time]')) {
      var fq = $('#fill-required');

      fq.fadeOut(250);
      setTimeout(function(){
        fq.text("Fill fields 'Origin', 'Date and start time', 'Destination' and 'Finish time'.").fadeIn();
      }, 250);

      return;
    }

    $('form').append('<input type="hidden" name="start" value="' + getStart() + '"/>');
    $('form').append('<input type="hidden" name="finish" value="' + getFinish() + '"/>');
    link = "/add-count-walk?origin=" + $('#origin').val() + "&destination=" + $('#destination').val() + "&start=" + getStart() + "&finish=" + getFinish();
    window.location.href = link;
  });

  // start counter (save witchout finish time)
  $('form #count').click(function (e) {
    e.preventDefault();

    if (!requiredNonempty()) {
      var fq = $('#fill-required');

      fq.fadeOut(250);
      setTimeout(function(){
        fq.text("Fill fields 'Origin', 'Date and start time' and 'Destination'.").fadeIn();
      }, 250);
      
      return;
    }
    
    $('form').append('<input type="hidden" name="start" value="' + getStart() + '"/>');
    link = "/add-count-walk?origin=" + $('#origin').val() + "&destination=" + $('#destination').val() + "&start=" + getStart();
    window.location.href = link;
  });
});

// get data from 'datetime-local' input element
window.getStart = function() {
  return Math.floor(new Date($('#sstart').val()) / 1000);
}

// get data from time and merge with non-time (day/date) data from 'datatime-local' input element
window.getFinish = function() {
  var time = $('#ffinish').val();
  var finalDate = new Date('2020-01-01' + "T" + time);
  
  var d = new Date($('#sstart').val());
  finalDate.setFullYear(d.getFullYear());
  finalDate.setMonth(d.getMonth());
  finalDate.setDate(d.getDate());

  return Math.floor(finalDate / 1000);
}

/* check elements selected with 'input[required]' (pass 'false' as second argument to switch this off)
*   and these from param 'additional' (first argument).
*  
*  Use commas in 'additional' instead of passing multiple parameters to function to
*  provide multiple selection queries, like this: 'input[text], input.important' etc.
*/
function requiredNonempty(additional, requiredFileds) {
  requiredFileds = (typeof requiredFileds !== 'undefined') ?  requiredFileds : true

  var all = [];
  $('input[required]').each(function(){
    all.push($(this).val());
  });

  $(additional).each(function(){
    all.push($(this).val());
  });

  if (all.includes(''))
    return false;

  return true;
}
