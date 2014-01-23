'use strict';


// create namespace
var RMTCTRL = window.RMTCTRL || {};


/***************************************************
 * Player
 */

RMTCTRL.init = {
    status: 'initialized',
    volume: 80,
    options: {
        shuffle: false,
        repeat: false
    }
};

/**
 * Constructor: create instance of Player
 *
 * @this {String} status
 * @this {Playlist} playlist
 */
RMTCTRL.Player = function() {
    console.log('Player :: Constructor called');
    this.status = RMTCTRL.init.status;
    this.volume = RMTCTRL.init.volume;
    this.options = RMTCTRL.init.options;
    this.playlist = new RMTCTRL.Playlist();
};

/**
 * return current status
 *
 * @return {String}
 */
RMTCTRL.Player.prototype.getStatus = function() {
    console.log('Player :: getStatus called');
    return this.status;
};

/**
 * get option
 *
 * @param {String} key
 * @return {*} value
 */
RMTCTRL.Player.prototype.getOption = function(key) {
    return this.options[key];
};

/**
 * load audio file into player
 *
 * @param {String} fileRef
 */
RMTCTRL.Player.prototype.load = function(fileRef) {
    // verify existence of file
    // prepare file for playback
    this.status = 'ready';
};

/**
 * play currently loaded track
 */
RMTCTRL.Player.prototype.play = function() {
    if (this.status != 'playback') {
        // start playback
        this.status = 'playback';
    } else {
        throw new Error('Player is already playing');
    }
};

/**
 * pause playback
 */
RMTCTRL.Player.prototype.pause = function() {
    // pause playback
    this.status = 'pause';
};

/**
 * stop playback
 */
RMTCTRL.Player.prototype.stop = function() {
    // stop playback
    this.status = 'ready';
};

/**
 * set volume
 *
 * @param {Number} vol
 */
RMTCTRL.Player.prototype.setVolume = function(vol) {
    this.volume = vol;
};

/**
 * get volume
 *
 * @return {Number}
 */
RMTCTRL.Player.prototype.getVolume = function() {
    return this.volume;
};

/**
 * mute volume
 */
RMTCTRL.Player.prototype.mute = function() {
    this.setVolume(0);
};

/**
 * toggle shuffle
 */
RMTCTRL.Player.prototype.toggleShuffle = function() {
    this.options.shuffle = !this.options.shuffle;
};

/**
 * toggle repeat
 */
RMTCTRL.Player.prototype.toggleRepeat = function() {
    this.options.repeat = !this.options.repeat;
};


/***************************************************
 * Playlist Constructor
 *
 * create instance of Playlist
 *
 * @this {Array} items
 */
RMTCTRL.Playlist = function() {
    this.items = [];
};

/**
 * return all items in playlist
 *
 * @param {function} success
 * @param {function} error
 */
RMTCTRL.Playlist.prototype.get = function(success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://rmtctrl.apiary.io/playlist/get');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            success(JSON.parse(this.responseText));
        } else {
            error('bla');
        }
    };
    xhr.send('{ "authKey": 93216429521 }');
};

/**
 * add item(s) to playlist
 *
 * @param {String|Array} items
 */
RMTCTRL.Playlist.prototype.add = function(items) {
    if (_.isString(items)) {
        this.items.push(items);
    } else {
        this.items = this.items.concat(items);
    }
};

/**
 * empty playlist
 */
RMTCTRL.Playlist.prototype.empty = function() {
    this.items.splice(0, this.items.length);
};


/***************************************************
 * FileBrowser Constructor
 *
 * create instance of FileBrowser
 *
 */
RMTCTRL.FileBrowser = function() {

};
