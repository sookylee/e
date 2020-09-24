pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Timecap {
    string company; //company name
    address companyAddr;
    mapping(string => timecap[]) employeeMap; //employeeNumber -- employeeData
    
    struct timecap {
        address walletAddr;
        bool isValid;
        uint writeDate;
        uint openDate;
        
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
    function newCap(string memory _empNumber, uint _writeDate, uint _openDate, string memory _title, string memory _ans) public {
        timecap memory t = timecap(msg.sender, true, _writeDate, _openDate,  _title, _ans);
        employeeMap[_empNumber].push(t);
        //companyAddr.transfer(msg.value);
    }
    
    event OpenAllEvent(string title, uint writeDate, uint openDate, uint ind);
    event OpenEvent(string title, string ans);
    //open capsule after opendate, and send money to the owner
    
    function openCap(string memory _empNumber, uint ind) public {
        require(msg.sender == employeeMap[_empNumber][ind].walletAddr, "[ERROR] Wrong wallet address!\nYou are not the owner.");
        require(block.timestamp >= employeeMap[_empNumber][ind].openDate, "[ERROR] You can't open yet!");

        emit OpenEvent(employeeMap[_empNumber][ind].title, employeeMap[_empNumber][ind].ans);
    }
    
    
    function showCap(string memory _empNumber) public {
        require(isEmpExist(_empNumber)==true, "[ERROR] There's no capsule data of employee number.\nPlease check!");
        
        for(uint i=0;i<employeeMap[_empNumber].length;i++){
            emit OpenAllEvent(employeeMap[_empNumber][i].title, employeeMap[_empNumber][i].openDate, employeeMap[_empNumber][i].writeDate, i);
        }
    }
    
    //check if the employee already made the capsule
    function isEmpExist(string memory _empNumber) public view returns (bool){
        if(employeeMap[_empNumber][0].isValid){
            return true;
        }
        else return false;
    }
    
}