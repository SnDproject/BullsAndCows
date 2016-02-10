(function(){
    'use strict';

    // Returns new random code
    // type can be
    function newCode(type){
        var shortList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            longList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
            code = '',
            i = 0,
            len = 0,
            randomPosition;

        switch (type) {
            case 0:
                for (i = 0, len = 3; i < len; i++) {
                    randomPosition = Math.floor(Math.random() * shortList.length);
                    code += shortList[randomPosition];
                    shortList.splice(randomPosition, 1);
                };
                break;
            case 1:
                for (i = 0, len = 4; i < len; i++) {
                    randomPosition = Math.floor(Math.random() * shortList.length);
                    code += shortList[randomPosition];
                    shortList.splice(randomPosition, 1);
                };
                break;
            case 2:
                for (i = 0, len = 4; i < len; i++) {
                    randomPosition = Math.floor(Math.random() * longList.length);
                    code += longList[randomPosition];
                    longList.splice(randomPosition, 1);
                };
                break;
            case 3:
                for (i = 0, len = 5; i < len; i++) {
                    randomPosition = Math.floor(Math.random() * longList.length);
                    code += longList[randomPosition];
                    longList.splice(randomPosition, 1);
                };
                break;
            default:
                //ERROR HANDLER HERE!
                break;
        }

        return code;
    }



    module.exports = {
        createGame: function(type){
            type = parseInt(type);

            return {
                type: type,
                code: newCode(type),
                startTime: new Date().getTime(),
                moveCount: 0
            }
        },
        compare: function(code1, code2){
            var bulls = 0,
                cows = 0;
            if(typeof(code1) !== 'string' ||
                 typeof(code2) !== 'string' ||
                 code1.length !== code2.length) {
                throw new Error('Invalid parameters!');
            }

            var arr1 = code1.split(''),
                arr2 = code2.split('');

            arr1.map(function(char1, index1){
                arr2.map(function(char2, index2){
                    if(char1 === char2){
                        if(index1 === index2){
                            bulls += 1;
                        } else {
                            cows +=1;
                        }
                    }
                });
            });


            return {
                bulls: bulls,
                cows: cows
            };
        }
    }
}());
