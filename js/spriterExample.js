
var SpriterExample;
(function (SpriterExample) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        // -------------------------------------------------------------------------
        function Boot() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
        };
        // -------------------------------------------------------------------------
        Boot.prototype.create = function () {
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    SpriterExample.Boot = Boot;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        // -------------------------------------------------------------------------
        function Preloader() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Preloader.prototype.preload = function () {
            // load assets
            var path = SpriterExample.Global.assetsPath;
            //this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");
            //this.load.xml("HeroDataXml", path + "Hero.xml");
            //this.load.json("HeroDataJSON", path + "Hero.json");
            //this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);
            // test
            this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("TESTXml", path + "TEST.xml");
            this.load.json("TESTJson", path + "TEST.json");
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.onBinaryLoaded = function (key, data) {
            return data;
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    })(Phaser.State);




    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Test = (function (_super) {
        __extends(Test, _super);
        // -------------------------------------------------------------------------
        function Test() {
            _super.call(this);
            this._text = "";
            // -------------------------------------------------------------------------
            // definitions if using minimized Spriter files
            this.minimizedDefinitions = {
                "name": "spriter_data",
                "minName": "s",
                "attributes": {
                    "scml_version": "v",
                    "generator": "g",
                    "generator_version": "gv"
                },
                "childElements": {
                    "folder": {
                        "name": "folder",
                        "minName": "d",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "file": {
                                "name": "file",
                                "minName": "f",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "width": "w",
                                    "height": "h",
                                    "pivot_x": "px",
                                    "pivot_y": "py"
                                }
                            }
                        }
                    },
                    "entity": {
                        "name": "entity",
                        "minName": "e",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "obj_info": {
                                "name": "obj_info",
                                "minName": "o",
                                "attributes": {
                                    "name": "n",
                                    "type": "t",
                                    "w": "w",
                                    "h": "h"
                                },
                                "childElements": {
                                    "frames": {
                                        "name": "frames",
                                        "minName": "f",
                                        "childElements": {
                                            "i": {
                                                "name": "i",
                                                "minName": "i",
                                                "attributes": {
                                                    "folder": "d",
                                                    "file": "f"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "animation": {
                                "name": "animation",
                                "minName": "a",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "length": "l",
                                    "interval": "t",
                                    "looping": "c"
                                },
                                "childElements": {
                                    "mainline": {
                                        "name": "mainline",
                                        "minName": "m",
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t"
                                                },
                                                "childElements": {
                                                    "bone_ref": {
                                                        "name": "bone_ref",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "id": "i",
                                                            "parent": "p",
                                                            "timeline": "t",
                                                            "key": "k"
                                                        }
                                                    },
                                                    "object_ref": {
                                                        "name": "object_ref",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "id": "i",
                                                            "name": "n",
                                                            "timeline": "t",
                                                            "parent": "p",
                                                            "key": "k",
                                                            "z_index": "z",
                                                            "folder": "d",
                                                            "file": "f",
                                                            "abs_x": "ax",
                                                            "abs_y": "ay",
                                                            "abs_pivot_x": "apx",
                                                            "abs_pivot_y": "apy",
                                                            "abs_scale_x": "asx",
                                                            "abs_scale_y": "asy",
                                                            "abs_angle": "r",
                                                            "abs_a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "timeline": {
                                        "name": "timeline",
                                        "minName": "t",
                                        "attributes": {
                                            "id": "i",
                                            "name": "n",
                                            "obj": "o",
                                            "object_type": "t"
                                        },
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t",
                                                    "spin": "s",
                                                    "curve_type": "ct",
                                                    "c1": "c1",
                                                    "c2": "c2"
                                                },
                                                "childElements": {
                                                    "bone": {
                                                        "name": "bone",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "x": "x",
                                                            "y": "y",
                                                            "angle": "r",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy"
                                                        }
                                                    },
                                                    "object": {
                                                        "name": "object",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "folder": "d",
                                                            "file": "f",
                                                            "x": "x",
                                                            "y": "y",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy",
                                                            "pivot_x": "px",
                                                            "pivot_y": "py",
                                                            "angle": "r",
                                                            "a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
        // -------------------------------------------------------------------------
        Test.prototype.create = function () {
            this.stage.backgroundColor = 0x527F68;
            //var spriterLoader = new Spriter.Loader();
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("HeroDataXml") /*, this.minimizedDefinitions*/);
            ////var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("HeroDataJSON"), this.minimizedDefinitions);
            ////var spriterFile = new Spriter.SpriterBin(this.cache.getBinary("HeroDataBin"));
            //var spriterData = spriterLoader.load(spriterFile);
            //this.spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "Hero", "Player", 0, 100);
            //this.spriterGroup.position.setTo(320, 350);
            var spriterLoader = new Spriter.Loader();
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
            var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"));
            var spriterData = spriterLoader.load(spriterFile);
            this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "Hero", 0, 100);
            this._spriterGroup.position.setTo(420, 400);
            this._spriterGroup.onVariableSet.add(function (spriter, variable) {
                this._text = variable.string;
            }, this);
            this.world.add(this._spriterGroup);
            // cycle animations
            var animation = 0;
            var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key.onDown.add(function () {
                animation = (animation + 1) % this._spriterGroup.animationsCount;
                this._spriterGroup.playAnimationById(animation);
            }, this);
            // change char maps
            var charMaps = ["Green", "Brush"];
            var charmapID = 0;
            key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            key.onDown.add(function () {
                if (charmapID >= this._spriterGroup.entity.charMapsLength) {
                    this._spriterGroup.clearCharMaps();
                    charmapID = 0;
                }
                else {
                    this._spriterGroup.pushCharMap(charMaps[charmapID]);
                    ++charmapID;
                }
            }, this);
        };
        // -------------------------------------------------------------------------
        Test.prototype.update = function () {
            this._spriterGroup.updateAnimation();
        };
        // -------------------------------------------------------------------------
        Test.prototype.render = function () {
            this.game.debug.text("Playing animation: " + this._spriterGroup.currentAnimationName + " (Press A to next...)", 50, 30, "rgb(255, 255, 255)");
            this.game.debug.text("Press C to cycle charmaps", 50, 46, "rgb(255, 255, 255)");
            this.game.debug.text(this._text, 180, 232, "rgb(255, 255, 255)");
        };
        return Test;
    })(Phaser.State);
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
        }
        // game derived from Phaser.Game
        Global.game = null;
        // game size
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 640;
        // assets path
        Global.assetsPath = "assets/";
        return Global;
    })();
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
// -------------------------------------------------------------------------
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
/// <reference path="../lib/phaser.d.ts" />
var SpriterExample;
(function (SpriterExample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            Game.game = this;
            // init game
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);
            // states
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            // start
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
//# sourceMappingURL=SpriterExample.js.map