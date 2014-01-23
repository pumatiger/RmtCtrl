'use strict';

/* player specs in jasmine */

describe('player app', function() {

    var player;

    beforeEach(function() {
        player = new RMTCTRL.Player();
    });

    it('should initialize player', function() {
        expect(player.getStatus()).toBe('initialized');
    });

    it('should hold an empty playlist upon intialization', function() {
        expect(player.playlist.getItems().length).toEqual(0);
    });

    it('should instantiate a FileBrowser object', function() {
        expect(player.fileBrowser).toBeDefined();
    });

    describe('when track is loaded', function() {

        beforeEach(function() {
            player.load('file:///somePath/myTrack.mp3');
        });

        it('should be ready', function() {
            expect(player.getStatus()).toBe('ready');
        });

        describe('when player is playing', function() {

            beforeEach(function() {
                player.play();
            });

            it('returns status "playing"', function() {
                expect(player.getStatus()).toBe('playback');
            });

            it('should pause track when pause method is called', function() {
                player.pause();
                expect(player.getStatus()).toBe('pause');
            });

            it('should stop track when stop method is called', function() {
                player.stop();
                expect(player.getStatus()).toBe('ready');
            });

            it('should throw an error if play method is called when player is already playing', function() {
                expect(function() {
                    player.play();
                }).toThrow("Player is already playing");
            });

        });

    });

    it('should set volume to 0 when mute method is called', function() {
        player.mute();
        expect(player.getVolume()).toEqual(0);
    });

    it('should toggle shuffle option when toggleShuffle method is called', function() {
        var shuffleOpt = player.getOption('shuffle');
        player.toggleShuffle();
        expect(player.getOption('shuffle')).not.toBe(shuffleOpt);
    });

    it('should toggle repeat option when toggleRepeat method is called', function() {
        var repeatOpt = player.getOption('repeat');
        player.toggleRepeat();
        expect(player.getOption('repeat')).not.toBe(repeatOpt);
    });

    describe('when 3 tracks are added to playlist', function() {

        beforeEach(function() {
            player.playlist.add('file:///somePath/track01.mp');
            player.playlist.add('file:///somePath/track02.mp');
            player.playlist.add('file:///somePath/track03.mp');
        });

        it('is expected to return a tracklist array of the length 3 when method playlist.getItems is called', function() {
            expect(player.playlist.getItems().length).toEqual(3);
        });

        it('should empty playlist when playlist.empty method is invoked', function() {
            player.playlist.empty();
            expect(player.playlist.getItems().length).toEqual(0);
        });

    });

    describe('when a file list is loaded into FileBrowser', function() {

        beforeEach(function() {
            player.fileBrowser.load();
        });

        it('should display all 6 files from JSON mock file', function() {
            expect(player.fileBrowser.getItems().length).toEqual(6);
        });

        it('is supposed to add a file to the playlist when the enqueue method is invoked on an item in the fileBrowser', function() {
            player.fileBrowser.getItem(2).enqueue();
            expect(_.last(player.playlist.getItems())).toBe(player.fileBrowser.getItemFileRef(2));
        });

        it('is supposed to add a file to the playlist and start playback when the enqueueAndPlay method is invoked on an item in the fileBrowser',
            function() {
                player.fileBrowser.getItem(3).enqueueAndPlay();
                expect(_.last(player.playlist.getItems())).toBe(player.fileBrowser.getItemFileRef(3));
                expect(player.getStatus()).toBe('playback');
            }
        );

    });

});
