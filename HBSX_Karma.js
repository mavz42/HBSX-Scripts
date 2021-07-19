/*:
 * @plugindesc HBSX Karma System
 * @author Verheffen
 * 
 * @help
 * HBSX Implementation of the karma system
 * 
 * Can be used as plugin command:
 * To increase Karma: KarmaAdd <amount>
 * To decrease Karma: KarmaDec <amount>
 * To explicitly set Karma: KarmaVal <amount>
 * 
 * Plugin still in development
 * 
 * @param Karma
 * @desc Define starting Karma
 * @default 0
 * 
 * @param Enable Window
 * @desc Enable Karma window | 1 = on / 0 = off
 * @default 1
 * 
 */

(function() {

    var parameters = PluginManager.parameters('HBSX_Karma');
    var enableKarmaWin = Number(parameters["Enable Window"] || 1);
    var karma = Number(parameters["Karma"] || 0);
    
    //-----------------------------------------------------------------------------
    // Karma Implementation
    //
    var _GameParty_Init = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _GameParty_Init.call(this);
        this._karma = karma;
    };

    Game_Party.prototype.karmaValue = function() {
        return this._karma;
    };

    Game_Party.prototype.karmaInc = function(amt) {
        this._karma = this._karma + amt;
        return this._karma;
    };

    Game_Party.prototype.karmaDec = function(amt) {
        this._karma = this._karma - amt;
        return this._karma;
    };

    //-----------------------------------------------------------------------------
    // Karma Window
    //

    if (enableKarmaWin === 1) {
        function Window_Karma() {
            this.initialize.apply(this, arguments);
        };
        
        Window_Karma.prototype = Object.create(Window_Base.prototype);
        Window_Karma.prototype.constructor = Window_Karma;
        
        Window_Karma.prototype.initialize = function(x, y) {
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Base.prototype.initialize.call(this, x, y, width, height);
            this.refresh();
        };
        
        Window_Karma.prototype.windowWidth = function() {
            return 240;
        };
        
        Window_Karma.prototype.windowHeight = function() {
            return this.fittingHeight(1);
        };

        Window_Karma.prototype.value  = function() {
            return $gameParty.karmaValue();
        };
        
        Window_Karma.prototype.refresh = function() {
            var x = this.textPadding();
            var width = this.contents.width - this.textPadding() * 2;
            this.contents.clear();
            this.drawText("Karma: " + this.value(), 0, 0, this.contentsWidth(), this.lineHeight());
        };
        
        Window_Karma.prototype.open = function() {
            this.refresh();
            Window_Base.prototype.open.call(this);
        };

        var SceneMenu_Create = Scene_Menu.prototype.create;
        Scene_Menu.prototype.create = function() {
            SceneMenu_Create.call(this);
            this.createKarmaWindow();
        };

        var SceneMenu_Start = Scene_Menu.prototype.start;
        Scene_Menu.prototype.start = function() {
            SceneMenu_Start.call(this);
            this._karmaWindow.refresh();
        };

        Scene_Menu.prototype.createKarmaWindow = function() {
            this._karmaWindow = new Window_Karma(0, 0, 200, 200);
            this._karmaWindow.y = Graphics.boxHeight - 150;
            this.addWindow(this._karmaWindow);
        };
    };   

    //-----------------------------------------------------------------------------
    // Karma Plugin Command
    //
    var GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        GameInterpreter_pluginCommand.call(this, command, args);
        // Add Karma - KarmaAdd <amount>
        if (command.toLowerCase() === "karmaadd") {
            var amt = parseInt(args[0]);
            $gameParty.karmaInc(amt);
        };
        // Decrease Karma - KarmaDec <amount>
        if (command.toLowerCase() === "karmadec") {
            var amt = parseInt(args[0]);
            $gameParty.karmaDec(amt);
        };
        // Change Karma Amount
        if (command.toLowerCase() === "karmaval") {
            var amt = parseInt(args[0]);
            $gameParty._karma = amt;
        }
    };
})();