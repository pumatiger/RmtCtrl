'use strict';

/* player specs in jasmine */

describe('player app'), function() {

    var player;
    var track;

    beforeEach(function() {
        player = new Player();
    });

    it('should initialize player', function() {
        expect(player.getStatus()).toBe('initialized');
    });

    it('should hold an empty playlist upon intialization', function() {
        expect(player.playlist.getTracks().length).toEqual(0);
    });

    describe('when track is loaded', function() {

        beforeEach(function() {
            player.load('file:///somePath/myTrack.mp3'); //when adjusting URL, make sure to also adjust test below!
        });

        it('should be ready', function() {
            expect(player.getStatus()).toBe('ready');
        });

        it('should add track to playlist', function() {
            // as player object is freshly instantiated, there should be only this one song in the playlist
            expect(player.playlist.getTracks()[0].getUrl()).toBe('file:///somePath/myTrack.mp3');
        });

        describe('when player is playing', function() {

            beforeEach(function() {
                player.play();
            });

            it('returns status "playing"', function() {
                expect(player.getStatus()).toBe('playing');
            });

            it('should pause track when pause method is called', function() {
                player.pause();
                expect(player.getStatus()).toBe('paused');
            });

            it('should stop track when stop method is called', function() {
                player.stop();
                expect(player.getStatus()).toBe('ready');
            });

            it('should set volume to 0 when mute method is called', function() {
                player.mute();
                expect(player.getVolume()).toEqual(0);
            });

        });

    });

    it('should toggle shuffle option when toggleShuffle method is called', function() {
        var shuffleOpt = player.playlist.getOptions('shuffle');
        player.playlist.toggleShuffle();
        expect(player.playlist.getOptions('shuffle')).not.toBe(shuffleOpt);
    });

    it('should toggle repeat option when toggleRepeat method is called', function() {
        var repeatOpt = player.playlist.getOptions('repeat');
        player.playlist.toggleRepeat();
        expect(player.playlist.getOptions('repeat')).not.toBe(repeatOpt);
    });

    describe('when 3 tracks are added to playlist', function() {

        beforeEach(function() {
            player.playlist.add('file:///somePath/track01.mp');
            player.playlist.add('file:///somePath/track02.mp');
            player.playlist.add('file:///somePath/track03.mp');
        });

        it('is expected to return a tracklist array of the length 3 when method playlist.getTracks is called', function() {
            expect(player.playlist.getTracks().length).toEqual(3);
        });

        it('should empty playlist when playlist.empty method is invoked', function() {
            player.playlist.empty();
            expect(player.playlist.getTracks().length).toEqual(0);
        });

    });

}
