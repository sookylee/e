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
         
         return instance.openCap(empnum);
         
          //return instance.cancelConcert(artist);
        }).then(function(result) {
          console.log("result : "+result);
          $.cookie('ans1', result[0]);
          $.cookie('ans2', result[1]);
          $.cookie('ans3', result[2]);
          $.cookie('ans4', result[3]);
          $.cookie('ans5', result[4]);
          $.cookie('ans6', result[5]);

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