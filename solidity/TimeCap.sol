pragma solidity >=0.4.22 <0.7.0;
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
        
        string[] answers;
    }
    
    
    constructor (string memory _company) public {
        company = _company;
        companyAddr = msg.sender;
    }
    
    
    function newCap(string memory _empNumber, uint _hireDate, uint _openDate, uint _money, string[] memory _answers) public {
        require(isEmpExist(_empNumber)==false, "[ERROR] Check the employee number.\nIt already exists!");
        
        employeeMap[_empNumber] = timecap(msg.sender, true, _hireDate, _openDate, _money, _answers);
    }
    
    
    function openCap(string memory _empNumber) public payable returns (string[] memory){
        require(isEmpExist(_empNumber)==true, "[ERROR] There's no capsule data of employee number.\nPlease check!");
        require(msg.sender == employeeMap[_empNumber].walletAddr, "[ERROR] Wrong wallet address!\nYou are not the owner.");
        require(now >= employeeMap[_empNumber].openDate, "[ERROR] You can't open yet!");
        
        employeeMap[_empNumber].walletAddr.transfer(employeeMap[_empNumber].money);
        
        return employeeMap[_empNumber].answers;
    }
    
    
    function isEmpExist(string memory _empNumber) public view returns (bool){
        if(employeeMap[_empNumber].isValid){
            return true;
        }
        else return false;
    }
}