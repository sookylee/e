App = {
    web3Provider: null,
    contracts: {},
  
    init: async function() {
      return await App.initWeb3();
    },
  
    initWeb3: async function() {
      // Initialize web3 and set the provider to the testRPC.
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
        console.log(App.web3Provider);
        web3 = new Web3(web3.currentProvider);
         
      } else {
        // set the provider you want from Web3.providers
        
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8080');
        web3 = new Web3(App.web3Provider);
      }
  
      return App.initContract();
    },
  
    initContract: function() {
      
      $.getJSON('/json/Timecap.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        var TimeCapArtifact = data;
        
        App.contracts.Timecap = TruffleContract(TimeCapArtifact);
      
         console.log(App.contracts.Timecap);
        // Set the provider for our contract.
        App.contracts.Timecap.setProvider(App.web3Provider);
  
        // Use our contract to retieve and mark the adopted pets.
        return App.getBalances();
      });
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#opencap', App.handleTransfer);
    },
  
    handleTransfer: function(event) {
      event.preventDefault();
  
      
      var ReadLetterInstance;
        App.contracts.Timecap.deployed().then(function(instance) {
          
          //get datas of user
         var empnum = $("#hidd").text();
         ReadLetterInstance = instance;
         
         var arr11 = [];
         return ReadLetterInstance.showCap(empnum).then(()=>{
           
          instance.OpenAllEvent().watch((err1, res1) => {
            //var temp = [res1.args.ind.toNumber(), res1.args.title, getFormatDate(new Date(res1.args.writeDate.toNumber() * 1000)), getFormatDate(new Date(res1.args.openDate.toNumber() * 1000))];
          arr11.push([res1.args.ind.toNumber(), res1.args.title, getFormatDate(new Date(res1.args.writeDate.toNumber() * 1000)), getFormatDate(new Date(res1.args.openDate.toNumber() * 1000))]);
          //console.log(JSON.stringify(arr11));
           //console.log($.cookie('ans6'));
           //$(window).attr('location','http://localhost:8080/capsule/read/view');
           //console.log(temp);
           //console.log(JSON.stringify(temp));
           //var tmp = JSON.stringify(temp);
            $.ajax({
              url: "http://localhost:8080/capsule/read",
              method: "POST",
              async: true,
              data: {boxes: arr11},
              success: function(){
                $(window).attr('location','http://localhost:8080/capsule/read/choice');
              }
            });
            //console.log(arr);
          });
         });


        }).then(function(result) {
          //console.log("result : "+result);
          
          //console.log(Object.values(result));
  
          //$(window).attr('location','http://localhost:8080/capsule/read/view');
          return App.getBalances();
        }).catch(function(err) {
        
          console.log(err.message);
        });
     
            
    },
  
    getBalances: function() {
      
      console.log('Getting balances...');
  
    }
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });

  function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}