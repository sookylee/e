pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Timecap {
    string company; //company name
    address payable companyAddr;
    mapping(string => timecap) employeeMap; //employeeNumber -- employeeData

    struct timecap {
        address payable walletAddr;
        bool isValid;
        uint hireDate;
        uint openDate;
        
        uint money;
        
        string ans1;
        string ans2;
        string ans3;
        string ans4;
        string ans5;
        string ans6;
    }
    
    
    constructor () public {
        companyAddr = msg.sender;
    }

    function setName(string memory _company) public {
        company = _company;
    }
    
    
    function newCap(string memory _empNumber, uint _hireDate, uint _openDate, uint _money, string memory _ans1, string memory _ans2, string memory _ans3, string memory _ans4, string memory _ans5, string memory _ans6) public payable{
        require(isEmpExist(_empNumber)==false, "[ERROR] Check the employee number.\nIt already exists!");
        
        employeeMap[_empNumber] = timecap(msg.sender, true, _hireDate, _openDate, _money, _ans1, _ans2, _ans3, _ans4, _ans5, _ans6);
       companyAddr.transfer(msg.value);
    }
    
    
    function openCap(string memory _empNumber) public payable returns (string memory){
        require(isEmpExist(_empNumber)==true, "[ERROR] There's no capsule data of employee number.\nPlease check!");
        require(msg.sender == employeeMap[_empNumber].walletAddr, "[ERROR] Wrong wallet address!\nYou are not the owner.");
        require(block.timestamp >= employeeMap[_empNumber].openDate, "[ERROR] You can't open yet!");
        
        employeeMap[_empNumber].walletAddr.transfer(employeeMap[_empNumber].money);
        
        return employeeMap[_empNumber].ans1;
    }
    
    
    function isEmpExist(string memory _empNumber) public view returns (bool){
        if(employeeMap[_empNumber].isValid){
            return true;
        }
        else return false;
    }
}