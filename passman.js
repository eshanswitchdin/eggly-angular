app.
    controller('PassmanCtrl', function($scope){

        $scope.apps = [
            {
                "id":0,
                "name":"facebook",
                "password":genpass(25)

            },{
                "id":1,
                "name":"google",
                "password":genpass(25)

            }
        ]

        $scope.copyToClipboard = function( text ){
            var copyText = document.createElement("input")
            copyText.value=text
            copyText.select()

            document.execCommand("Copy")
            copyText.remove()
            console.log("copied to clipboard : " + copyText.value)
        }


        function genrandomnum( max, min ){
            return (Math.floor(Math.random()* 1000)) % (max - min + 1)  + min ;
        }
        function genpass( length, value=null ){
            if( !value )
                Math.seedrandom(new Date().getTime());

            const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
            const symbols = ['!','@','#','$','%','^','*','(',')','_','-','+','=','{','}','[',']',':',';',',','.','?','|','~']
            var output = ''

            for( var i=0; i<length; i++ ){
                var type = genrandomnum(3, 0)
                switch( type ){
                    case 0:
                        output+=alpha[ genrandomnum(alpha.length-1, 0) ]
                    break;
                    case 1:
                        output+=alpha[ genrandomnum(alpha.length-1, 0) ].toUpperCase()
                    break;
                    case 2:
                        output+=genrandomnum(10, 0)
                    break;
                    case 3:
                        output+=symbols[ genrandomnum(symbols.length-1, 0) ]
                    break;
                }
            }


            return output
        }
        $scope.generatePassword = function(val){
            return genpass(val)
        }

        // == manage state ==
        $scope.generatingNewApp = false
        $scope.generateNewApp = function(){
            $scope.generatingNewApp = true
        }
        $scope.addNewApp = function(napp){
            var app = {}
            app.id = $scope.apps[ $scope.apps.length - 1 ].id + 1
            app.password = napp.password
            app.name = napp.name
            $scope.apps.push(app)

            $scope.newapp = null


        }

    })
