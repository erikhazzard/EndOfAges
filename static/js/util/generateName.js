// ===========================================================================
//
// generateName
//
//      -Generates a random name
//
// ===========================================================================
define( [], function funcGenerateName(){
    function generateName(){
        var vowels = "aeiouyaeiouaeioea";
        var cons = "bcdfghjklmnpqrstvwxzybcdgklmnprstvwbcdgkpstrkdtr";
        var rndname = []; // final name
        var paircons = "ngrkndstshthphsktrdrbrgrfrclcrst";
        var randomNum = Math.random() * 75 | 0;
        var orig = randomNum;
        var n=1;

        var dlc=false;
        var vwl=false;
        var dbl=false;

        if (randomNum>63) {
            // randomNum is 0 - 75 where 64-75 is cons pair, 
            // 17-63 is cons, 0-16 is vowel
            randomNum=(randomNum-61)*2;	// name can't start with "ng" "nd" or "rk"
            rndname[0]=paircons[randomNum];
            rndname[1]=paircons[randomNum+1];
            n=2;
        } else if (randomNum>16) {
            randomNum -= 17;
            rndname[0] = cons[randomNum];
        } else {
            rndname[0]=vowels[randomNum];
            vwl=true;
        }

        var namlen = 5 + (Math.random() * 5 | 0);

        for(var i=n;i<namlen;i++){
            dlc=false;
            if (vwl){
                //last char was a vowel		
                // so pick a cons or cons pair
                randomNum=Math.random() * 62 | 0;
                if (randomNum>46) {	
                    // pick a cons pair
                    if(i>namlen-3){
                        // last 2 chars in name?
                        // name can only end in cons pair "rk" "st" "sh" "th" "ph" "sk" "nd" or "ng"
                        randomNum=(Math.random() * 7 | 0)*2;
                    } else {	
                        // pick any from the set
                        randomNum=(randomNum-47)*2;
                    }
                    rndname[i]=paircons[randomNum];
                    rndname[i+1]=paircons[randomNum+1];
                    dlc=true;	// flag keeps second letter from being doubled below
                    i+=1;
                } else {	
                    // select a single cons
                    rndname[i]=cons[randomNum];
                }
            } else {		
                // select a vowel
                rndname[i]=vowels[Math.random() * 16 | 0];
            }
            vwl=!vwl;
            if (!dbl && !dlc) {	
                // one chance at double letters in name
                if(!(Math.random() * (i+9) | 0)){
                    // chances decrease towards end of name
                    rndname[i+1]=rndname[i];
                    dbl=true;
                    i+=1;
                }
            }
        }

        // capitalize name
        rndname[0] = rndname[0].toUpperCase();
        rndname = rndname.join('');
        // return it
        return rndname;
    }
    return generateName;
});
