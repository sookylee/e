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
         //
         
         return ReadLetterInstance.openCap(empnum).then((result)=>{
           instance.OpenEvent().watch((err1, res1) => {
            $.cookie('ans1', res1.args.ans1);
            $.cookie('ans2', res1.args.ans2); 
            $.cookie('ans3', res1.args.ans3);
            $.cookie('ans4', res1.args.ans4);
            $.cookie('ans5', res1.args.ans5);
            $.cookie('ans6', res1.args.ans6);
           })
         });
         
        }).then(function(result) {
          //console.log("result : "+result);
          
          //console.log(Object.values(result));

          $(window).attr('location','http://localhost:8080/capsule/read/view');
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