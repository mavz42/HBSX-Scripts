/*:
 * @plugindesc HBSX HUD System
 * @author Verheffen
 * 
 * @help
 * 
 */

(function() {

    //-----------------------------------------------------------------------------
    // Initialize data
    //
    var _GameParty_Init = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _GameParty_Init.call(this);
        this._day = 1;
        this._intel = 0;
    };

    //-----------------------------------------------------------------------------
    // Implementation
    //
    Game_Party.prototype.dayValue = function() {
        return this._day;
    };

    Game_Party.prototype.dayInc = function(amt) {
        return this._day++;
    };

    Game_Party.prototype.intelValue = function() {
        return this._intel;
    };

    //-----------------------------------------------------------------------------
    // HUD Implementation
    //
    var _SceneMap_Update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SceneMap_Update.call(this);
    }

    //-----------------------------------------------------------------------------
    // HUD Window
    //

})();