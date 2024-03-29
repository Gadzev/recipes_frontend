export default {
        arr_diff (a1, a2) {

            var a = [], diff = [];
        
            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }
        
            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }
        
            for (var k in a) {
                diff.push(k);
            }
        
            return diff;
        },
        
        preparationTime (preparation) {
            var prepStr = preparation.split(':')

            if (parseInt(prepStr[0]) <= 0) {
                return prepStr[1] + " Minutes"
            }

            return prepStr[0] + " Hours " + prepStr[1] + " Minutes"
        }
    }