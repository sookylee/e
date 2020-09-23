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
    $(document).on('click', '#submit', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    

    var WritingInstance;
      App.contracts.Timecap.deployed().then(function(instance) {
        var title = $("#title").val();
        var answer = $("#txt").val();
        var opend = $("#opend").val();
        var writed = $("#nowDate").text();
        var empnum = $("#hardcoding").text();

        //fix javascript date to solidity date
        var openDate = ((new Date(opend)).getTime()) /1000;
        var writeDate = ((new Date(writed)).getTime()) /1000;
        //console.log(openDate);
        //console.log(writeDate);
        /*
        $("input[name=answer]").each(function(i){
          answers.push($("input[name=answer]").eq(i).val());
        });
        answers.push($("#txt").val());
        */
        
        //get datas of user
        
       WritingInstance = instance;
       //
       return WritingInstance.newCap(empnum, writeDate, openDate, title, answer);
       
      }).then(function(result) {
        console.log("result : "+result);
        //
        alert("You can open this page after "+$("#opend").val());
        //$(window).attr('location','http://localhost:8080');

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