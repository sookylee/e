pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Timecap {
    string company; //company name
    address payable companyAddr;
    mapping(string => timecap[]) employeeMap; //employeeNumber -- employeeData
    
    struct timecap {
        address payable walletAddr;
        bool isValid;
        uint writeDate;
        uint openDate;
        
        uint money;
        
        string title;
        string ans;
    }
    
    //constructor of this contract
    constructor () public {
        companyAddr = msg.sender;
    }

    //set name of this contract's company
    function setName(string memory _company) public {
        company = _company;
    }
    
    //make new capsule for new employee
    function newCap(string memory _empNumber, uint _writeDate, uint _openDate, uint _money, string memory _title, string memory _ans) public payable{
        timecap memory t = timecap(msg.sender, true, _writeDate, _openDate, _money, _title, _ans);
        employeeMap[_empNumber].push(t);
        //companyAddr.transfer(msg.value);
    }
    
    event OpenAllEvent(timecap[] answers);
    event OpenEvent(string title, string ans);
    //open capsule after opendate, and send money to the owner
    
    function openCap(string memory _empNumber, uint ind) public payable {
        require(msg.sender == employeeMap[_empNumber][ind].walletAddr, "[ERROR] Wrong wallet address!\nYou are not the owner.");
        require(block.timestamp >= employeeMap[_empNumber][ind].openDate, "[ERROR] You can't open yet!");
        
        employeeMap[_empNumber][ind].walletAddr.transfer(employeeMap[_empNumber][ind].money);


        emit OpenEvent(employeeMap[_empNumber][ind].title, employeeMap[_empNumber][ind].ans);
    }
    
    
    function showCap(string memory _empNumber)public {
        require(isEmpExist(_empNumber)==true, "[ERROR] There's no capsule data of employee number.\nPlease check!");
        
        emit OpenAllEvent(employeeMap[_empNumber]);
    }
    
    //check if the employee already made the capsule
    function isEmpExist(string memory _empNumber) public view returns (bool){
        if(employeeMap[_empNumber][0].isValid){
            return true;
        }
        else return false;
    }
    
}