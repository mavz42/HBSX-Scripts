/*:
 * @plugindesc HBSX Core Script
 * @author Verheffen
 * 
 * @help
 * 
 * @param Start Gold
 * @desc Define starting gold of player
 * @default 100
 * 
 */

(function() {

    var parameters = PluginManager.parameters('HBSX_Core');
    var startGold = Number(parameters["Start Gold"] || 0);
    
    //-----------------------------------------------------------------------------
    // Start Gold
    //
    var _GameParty_Init = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _GameParty_Init.call(this);
        this._gold = startGold;
    };

})();