var moment;
var timer = {
    start: function () {
        this.startTime = moment();
    },
    stop: function () {
        this.duration = moment().diff(this.startTime);
    }
};

$(document).ready(function () {
    var secret;
    $('#start').click(function (e) {
        var $currentTarget = $(e.currentTarget);
        if ($currentTarget.hasClass('disabled')) {
            return;
        }
        $currentTarget.toggleClass('btn-info btn-default disabled');
        secret = updateDate();
    });

    $('.day').click(function (e) {
        timer.stop();
        showCorrect($(e.currentTarget).data('dow') == secret.format('e'), secret);
    });
});

function updateDate() {
    $('.new-date').removeClass('alert-danger alert-success');
    var secret = moment(Math.floor(Math.random() * moment().valueOf()));
    $('.new-date').html(secret.format('MMMM D, YYYY'));
    timer.start();
    return secret;
}

function showCorrect(correct, secret) {
    if (correct) {
        $('.new-date').addClass('alert-success');
        $('.new-date').html((timer.duration / 1000) + ' seconds!')
    } else {
        $('.new-date').addClass('alert-danger');
        $('.new-date').html('Nope, it was ' + secret.format('dddd'))
    }
    $('#start').toggleClass('btn-info btn-default disabled');
    $('#start').html('Continue?');
}

