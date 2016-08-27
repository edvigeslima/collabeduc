function Timer(time, span_id) {
    this.span_element = document.getElementById(span_id);
    this.time = time;
    this.start = function() {
        this._current_time = 0;
        this._update();
        this._interval = setInterval(function(thiz) {
            thiz._update();
        }, 1000, this);
    };
    this._update = function() {
        var ctime = this.time - this._current_time;
        this.span_element.innerHTML = this.time - this._current_time;
        if (ctime == 0) {
            clearInterval(this._interval);
        } else {
            this._current_time++;
        }
    };
}
